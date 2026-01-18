import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract respondent ID from various possible fields
    // Different survey platforms may send this differently
    const respondentId = body.rid || body.respondent_id || body.custom_variables?.rid || body.embedded_data?.rid
    const campaignId = body.cid || body.campaign_id || body.custom_variables?.cid || body.embedded_data?.cid
    const status = body.status || 'complete'

    // Extract survey responses - support multiple formats
    // Qualtrics: body.response or body.values
    // SurveyMonkey: body.responses or body.answers
    // Typeform: body.form_response.answers
    // Generic: body.responses or body.answers or body.data
    const surveyResponses =
      body.responses ||
      body.answers ||
      body.response ||
      body.values ||
      body.data ||
      body.form_response?.answers ||
      body.form_response?.definition?.fields ||
      // If none of the above, store the entire payload (minus system fields)
      (() => {
        const { rid, respondent_id, cid, campaign_id, status, custom_variables, embedded_data, ...rest } = body
        return Object.keys(rest).length > 0 ? rest : null
      })()

    if (!respondentId) {
      return NextResponse.json(
        { error: 'Missing respondent ID. Include rid, respondent_id, or custom_variables.rid in your webhook payload.' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Verify respondent exists
    const { data: respondent, error: fetchError } = await supabase
      .from('respondents')
      .select('id, campaign_id, status')
      .eq('id', respondentId)
      .single()

    if (fetchError || !respondent) {
      return NextResponse.json(
        { error: 'Respondent not found' },
        { status: 404 }
      )
    }

    // Only update if not already completed
    if (respondent.status !== 'survey_completed') {
      // Update respondent status and store survey responses
      const { error: updateError } = await supabase
        .from('respondents')
        .update({
          status: status === 'complete' ? 'survey_completed' : 'screener_failed',
          survey_completed_at: status === 'complete' ? new Date().toISOString() : null,
          survey_responses: surveyResponses || {},
        })
        .eq('id', respondentId)

      if (updateError) {
        console.error('Error updating respondent:', updateError)
        return NextResponse.json(
          { error: 'Failed to update respondent' },
          { status: 500 }
        )
      }

      // Log activity with full payload for debugging
      await supabase.from('respondent_activity_log').insert({
        respondent_id: respondentId,
        event_type: status === 'complete' ? 'survey_completed' : 'survey_incomplete',
        event_data: {
          webhook_payload: body,
          parsed_responses: surveyResponses,
        },
      })

      // If completed, update quota tracking
      if (status === 'complete') {
        const { data: respondentData } = await supabase
          .from('respondents')
          .select('district_id')
          .eq('id', respondentId)
          .single()

        if (respondentData?.district_id) {
          await supabase.rpc('increment_quota_filled', {
            p_campaign_id: respondent.campaign_id,
            p_district_id: respondentData.district_id,
          })
        }
      }
    }

    return NextResponse.json({
      success: true,
      respondent_id: respondentId,
      responses_saved: !!surveyResponses,
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Also handle GET for testing/verification
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'survey-complete webhook',
  })
}
