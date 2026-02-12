'use client'

import { Textarea } from '@/components/ui/textarea'
import { FocusGroupQuestion } from '@/lib/types/focus-group'

interface TextareaQuestionProps {
  question: FocusGroupQuestion
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function TextareaQuestion({
  question,
  value,
  onChange,
  disabled,
}: TextareaQuestionProps) {
  const currentLength = (value || '').length
  const maxLength = question.maxLength || 500

  return (
    <div className="space-y-2">
      {question.description && (
        <p className="text-sm text-muted-foreground">
          {question.description}
        </p>
      )}
      <Textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder || 'Enter your response...'}
        disabled={disabled}
        maxLength={maxLength}
        rows={4}
        className="resize-none"
      />
      <div className="flex justify-end">
        <span className={`text-xs ${currentLength >= maxLength ? 'text-destructive' : 'text-muted-foreground'}`}>
          {currentLength} / {maxLength}
        </span>
      </div>
    </div>
  )
}
