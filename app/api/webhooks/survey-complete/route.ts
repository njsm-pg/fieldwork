import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract respondent ID from various possible fields
    // Different survey platforms may send this differently
    const respondentId = body.rid || body.respondent_id || body.custom_variables?.rid
    const campaignId = body.cid || body.campaign_id || body.custom_variables?.cid
    const status = body.status || 'complete'

    if (!respondentId) {
      return NextResponse.json(
        { error: 'Missing respondent ID' },
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
    if (respondent.status !== 'completed') {
      // Update respondent status
      const { error: updateError } = await supabase
        .from('respondents')
        .update({
          status: status === 'complete' ? 'completed' : 'screener_failed',
          survey_completed_at: status === 'complete' ? new Date().toISOString() : null,
        })
        .eq('id', respondentId)

      if (updateError) {
        console.error('Error updating respondent:', updateError)
        return NextResponse.json(
          { error: 'Failed to update respondent' },
          { status: 500 }
        )
      }

      // Log activity
      await supabase.from('respondent_activity_log').insert({
        respondent_id: respondentId,
        event_type: status === 'complete' ? 'survey_webhook_complete' : 'survey_webhook_incomplete',
        event_data: body,
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

    return NextResponse.json({ success: true })
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
