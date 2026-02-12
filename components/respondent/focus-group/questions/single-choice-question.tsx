'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { FocusGroupQuestion } from '@/lib/types/focus-group'

interface SingleChoiceQuestionProps {
  question: FocusGroupQuestion
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function SingleChoiceQuestion({
  question,
  value,
  onChange,
  disabled,
}: SingleChoiceQuestionProps) {
  return (
    <RadioGroup
      value={value || ''}
      onValueChange={onChange}
      className="space-y-3"
      disabled={disabled}
    >
      {question.options?.map((option) => (
        <div
          key={option.id}
          className="flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
        >
          <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
          <Label
            htmlFor={`${question.id}-${option.id}`}
            className="flex-1 cursor-pointer text-base font-normal"
          >
            {option.text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
