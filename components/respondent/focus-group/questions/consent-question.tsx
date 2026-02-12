'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FocusGroupQuestion } from '@/lib/types/focus-group'

interface ConsentQuestionProps {
  question: FocusGroupQuestion
  value: Record<string, boolean>
  onChange: (value: Record<string, boolean>) => void
  disabled?: boolean
}

export function ConsentQuestion({
  question,
  value,
  onChange,
  disabled,
}: ConsentQuestionProps) {
  const consentValues = value || {}

  const handleChange = (consentId: string, checked: boolean) => {
    onChange({
      ...consentValues,
      [consentId]: checked,
    })
  }

  return (
    <div className="space-y-4">
      {question.consents?.map((consent) => (
        <div key={consent.id} className="flex items-start gap-3">
          <Checkbox
            id={`${question.id}-${consent.id}`}
            checked={consentValues[consent.id] || false}
            onCheckedChange={(checked) => handleChange(consent.id, checked as boolean)}
            disabled={disabled}
            className="mt-0.5"
          />
          <Label
            htmlFor={`${question.id}-${consent.id}`}
            className="text-sm font-normal leading-relaxed cursor-pointer"
          >
            {consent.text}
            {consent.required && <span className="text-destructive ml-1">*</span>}
          </Label>
        </div>
      ))}
    </div>
  )
}
