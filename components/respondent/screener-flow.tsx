'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ScreenerQuestion {
  id: string
  question_text: string
  question_type: 'single_choice' | 'multi_choice'
  options: {
    id: string
    text: string
    qualifies: boolean
  }[]
  order_index: number
}

interface ScreenerFlowProps {
  campaignId: string
  questions: ScreenerQuestion[]
}

export function ScreenerFlow({ campaignId, questions }: ScreenerFlowProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string | string[]>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const isLastQuestion = currentIndex === questions.length - 1
  const hasAnswer = currentQuestion ?
    (currentQuestion.question_type === 'multi_choice'
      ? (responses[currentQuestion.id] as string[] || []).length > 0
      : !!responses[currentQuestion.id])
    : false

  const handleSingleChoice = (questionId: string, optionId: string) => {
    setResponses(prev => ({ ...prev, [questionId]: optionId }))
  }

  const handleMultiChoice = (questionId: string, optionId: string, checked: boolean) => {
    setResponses(prev => {
      const current = (prev[questionId] as string[]) || []
      if (checked) {
        return { ...prev, [questionId]: [...current, optionId] }
      }
      return { ...prev, [questionId]: current.filter(id => id !== optionId) }
    })
  }

  const handleNext = async () => {
    if (!hasAnswer) return

    if (isLastQuestion) {
      await submitScreener()
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const submitScreener = async () => {
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      // Get respondent from localStorage
      const stored = localStorage.getItem(`respondent_${campaignId}`)
      if (!stored) {
        throw new Error('Session not found. Please start again.')
      }
      const { id: respondentId } = JSON.parse(stored)

      // Determine qualification based on responses
      let isQualified = true
      for (const question of questions) {
        const response = responses[question.id]
        if (question.question_type === 'single_choice') {
          const selectedOption = question.options.find(o => o.id === response)
          if (selectedOption && !selectedOption.qualifies) {
            isQualified = false
            break
          }
        } else if (question.question_type === 'multi_choice') {
          const selectedIds = response as string[]
          // For multi-choice, qualify if at least one qualifying option is selected
          const hasQualifyingOption = selectedIds?.some(id => {
            const option = question.options.find(o => o.id === id)
            return option?.qualifies
          })
          if (selectedIds?.length > 0 && !hasQualifyingOption) {
            isQualified = false
            break
          }
        }
      }

      // Update respondent with screener results
      const { error: updateError } = await supabase
        .from('respondents')
        .update({
          status: isQualified ? 'screener_passed' : 'screener_failed',
          screener_responses: responses,
          is_qualified: isQualified,
        })
        .eq('id', respondentId)

      if (updateError) throw updateError

      // Log activity
      await supabase.from('respondent_activity_log').insert({
        respondent_id: respondentId,
        event_type: isQualified ? 'screener_passed' : 'screener_failed',
        event_data: { responses },
      })

      // Redirect based on qualification
      if (isQualified) {
        router.push(`/s/${campaignId}/qualified`)
      } else {
        router.push(`/s/${campaignId}/disqualified`)
      }
    } catch (err: any) {
      console.error('Error submitting screener:', err)
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!currentQuestion) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p className="text-muted-foreground">No screener questions configured.</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with progress */}
      <header className="border-b bg-background px-4 py-4">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </header>

      {/* Question content */}
      <main className="flex-1 p-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-semibold leading-relaxed">
            {currentQuestion.question_text}
          </h2>
        </div>

        {currentQuestion.question_type === 'single_choice' && (
          <RadioGroup
            value={responses[currentQuestion.id] as string || ''}
            onValueChange={(value) => handleSingleChoice(currentQuestion.id, value)}
            className="space-y-3"
            disabled={loading}
          >
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label
                  htmlFor={option.id}
                  className="flex-1 cursor-pointer text-base font-normal"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {currentQuestion.question_type === 'multi_choice' && (
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isChecked = ((responses[currentQuestion.id] as string[]) || []).includes(option.id)
              return (
                <div
                  key={option.id}
                  className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                    isChecked ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <Checkbox
                    id={option.id}
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      handleMultiChoice(currentQuestion.id, option.id, checked as boolean)
                    }
                    disabled={loading}
                  />
                  <Label
                    htmlFor={option.id}
                    className="flex-1 cursor-pointer text-base font-normal"
                  >
                    {option.text}
                  </Label>
                </div>
              )
            })}
            <p className="text-sm text-muted-foreground">Select all that apply</p>
          </div>
        )}
      </main>

      {/* Navigation footer */}
      <footer className="border-t bg-background p-4">
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrev}
            disabled={currentIndex === 0 || loading}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            disabled={!hasAnswer || loading}
            className="flex-1"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLastQuestion ? 'Submit' : 'Next'}
            {!isLastQuestion && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </footer>
    </div>
  )
}
