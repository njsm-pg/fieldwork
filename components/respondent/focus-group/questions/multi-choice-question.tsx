'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FocusGroupQuestion } from '@/lib/types/focus-group'

interface MultiChoiceQuestionProps {
  question: FocusGroupQuestion
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
}

export function MultiChoiceQuestion({
  question,
  value,
  onChange,
  disabled,
}: MultiChoiceQuestionProps) {
  const selectedValues = value || []

  const handleChange = (optionId: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, optionId])
    } else {
      onChange(selectedValues.filter((id) => id !== optionId))
    }
  }

  return (
    <div className="space-y-3">
      {question.options?.map((option) => {
        const isChecked = selectedValues.includes(option.id)
        return (
          <div
            key={option.id}
            className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
              isChecked ? 'border-primary bg-primary/5' : ''
            }`}
          >
            <Checkbox
              id={`${question.id}-${option.id}`}
              checked={isChecked}
              onCheckedChange={(checked) => handleChange(option.id, checked as boolean)}
              disabled={disabled}
            />
            <Label
              htmlFor={`${question.id}-${option.id}`}
              className="flex-1 cursor-pointer text-base font-normal"
            >
              {option.text}
            </Label>
          </div>
        )
      })}
      {question.description && (
        <p className="text-sm text-muted-foreground">{question.description}</p>
      )}
    </div>
  )
}
