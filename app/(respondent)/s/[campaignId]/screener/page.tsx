import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { ScreenerFlow } from '@/components/respondent/screener-flow'

interface Props {
  params: Promise<{ campaignId: string }>
}

export default async function ScreenerPage({ params }: Props) {
  const { campaignId } = await params
  const supabase = await createClient()

  // Fetch campaign with screener questions
  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select(`
      id,
      name,
      status,
      screener_questions(
        id,
        question_text,
        question_type,
        options,
        order_index
      )
    `)
    .eq('id', campaignId)
    .eq('status', 'active')
    .single()

  if (error || !campaign) {
    notFound()
  }

  const questions = (campaign.screener_questions || [])
    .sort((a: any, b: any) => a.order_index - b.order_index)
    .map((q: any) => ({
      id: q.id,
      question_text: q.question_text,
      question_type: q.question_type,
      options: q.options || [],
      order_index: q.order_index,
    }))

  // If no screener questions, redirect directly to qualified
  if (questions.length === 0) {
    redirect(`/s/${campaignId}/qualified`)
  }

  return <ScreenerFlow campaignId={campaignId} questions={questions} />
}
