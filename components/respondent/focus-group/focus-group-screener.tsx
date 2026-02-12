'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { FocusGroupScreenerConfig, FocusGroupQuestion, FocusGroupResponses, FocusGroupResponseValue } from '@/lib/types/focus-group'
import { QuestionRenderer } from './question-renderer'

interface FocusGroupScreenerProps {
  campaignId: string
  screener: FocusGroupScreenerConfig
  privacyPolicyUrl?: string | null
  termsUrl?: string | null
}

export function FocusGroupScreener({
  campaignId,
  screener,
  privacyPolicyUrl,
  termsUrl,
}: FocusGroupScreenerProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState<FocusGroupResponses>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const questions = screener.questions
  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const isLastQuestion = currentIndex === questions.length - 1

  // Validate current answer
  const validateAnswer = (question: FocusGroupQuestion, value: FocusGroupResponseValue): boolean => {
    if (!value) return false

    switch (question.type) {
      case 'consent':
        // All required consents must be checked
        const consentValues = value as Record<string, boolean>
        return question.consents?.every(c => !c.required || consentValues[c.id]) ?? false

      case 'contact_info':
        // Required fields must be filled
        const contactValue = value as { firstName?: string; lastName?: string; email?: string; phone?: string }
        const fields = question.fields || {}
        if (fields.firstName && !contactValue.firstName?.trim()) return false
        if (fields.lastName && !contactValue.lastName?.trim()) return false
        if (fields.email && !contactValue.email?.trim()) return false
        // Phone is optional
        // Validate email format
        if (fields.email && contactValue.email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(contactValue.email)) return false
        }
        return true

      case 'single_choice':
        return typeof value === 'string' && value.length > 0

      case 'multi_choice':
        return Array.isArray(value) && value.length > 0

      case 'text':
        if (typeof value !== 'string') return false
        if (question.minLength && value.length < question.minLength) return false
        if (question.pattern) {
          const regex = new RegExp(question.pattern)
          if (!regex.test(value)) return false
        }
        return value.length > 0

      case 'textarea':
        return typeof value === 'string' && value.trim().length > 0

      case 'number':
        if (value === '' || value === undefined) return false
        const numValue = typeof value === 'number' ? value : parseInt(value as string, 10)
        if (isNaN(numValue)) return false
        if (question.min !== undefined && numValue < question.min) return false
        if (question.max !== undefined && numValue > question.max) return false
        return true

      default:
        return true
    }
  }

  const hasValidAnswer = currentQuestion ? validateAnswer(currentQuestion, responses[currentQuestion.id]) : false

  const handleResponseChange = (value: FocusGroupResponseValue) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleNext = async () => {
    if (!hasValidAnswer) return

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

      // Extract contact info for direct columns
      const contactInfo = responses.contact_info as { firstName?: string; lastName?: string; email?: string; phone?: string } | undefined
      const zipCode = responses.zip_code as string | undefined

      // Update respondent with screener results
      const { error: updateError } = await supabase
        .from('respondents')
        .update({
          status: 'screener_passed', // Focus groups don't auto-disqualify
          screener_responses: responses,
          first_name: contactInfo?.firstName || null,
          last_name: contactInfo?.lastName || null,
          email: contactInfo?.email || null,
          phone: contactInfo?.phone || null,
          zip_code: zipCode || null,
          consented_at: new Date().toISOString(),
        })
        .eq('id', respondentId)

      if (updateError) throw updateError

      // Log activity
      await supabase.from('respondent_activity_log').insert({
        respondent_id: respondentId,
        event_type: 'focus_group_screener_completed',
        event_data: {
          screenerId: screener.id,
          questionCount: questions.length,
        },
      })

      // Redirect to thank you page
      router.push(`/s/${campaignId}/focus-group/thank-you`)
    } catch (err) {
      console.error('Error submitting screener:', err)
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
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
          <span>{Math.round(progress)}% Complete</span>
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
            {currentQuestion.title}
          </h2>
          {currentQuestion.description && currentQuestion.type !== 'multi_choice' && currentQuestion.type !== 'textarea' && (
            <p className="mt-1 text-sm text-muted-foreground">
              {currentQuestion.description}
            </p>
          )}
        </div>

        <QuestionRenderer
          question={currentQuestion}
          value={responses[currentQuestion.id]}
          onChange={handleResponseChange}
          disabled={loading}
        />
      </main>

      {/* Disclosure footer */}
      <div className="border-t bg-muted/30 px-4 py-3">
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          <strong>Disclosure:</strong> Participation in this research does not guarantee eligibility for an incentive. Only individuals who meet our client&apos;s criteria will be invited to participate.
          {(termsUrl || privacyPolicyUrl) && (
            <>
              {' '}See{' '}
              {termsUrl && (
                <a href={termsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Terms
                </a>
              )}
              {termsUrl && privacyPolicyUrl && ' and '}
              {privacyPolicyUrl && (
                <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              )}
              .
            </>
          )}
        </p>
      </div>

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
            disabled={!hasValidAnswer || loading}
            className="flex-1"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLastQuestion ? 'Submit' : 'Continue'}
            {!isLastQuestion && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </footer>
    </div>
  )
}
