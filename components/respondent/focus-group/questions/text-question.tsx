'use client'

import { Input } from '@/components/ui/input'
import { FocusGroupQuestion } from '@/lib/types/focus-group'

interface TextQuestionProps {
  question: FocusGroupQuestion
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function TextQuestion({
  question,
  value,
  onChange,
  disabled,
}: TextQuestionProps) {
  // Handle ZIP code specific formatting
  const isZipCode = question.id === 'zip_code' || question.pattern === '^[0-9]{5}$'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value

    // For ZIP codes, strip non-numeric characters
    if (isZipCode) {
      newValue = newValue.replace(/\D/g, '')
    }

    // Apply maxLength if specified
    if (question.maxLength && newValue.length > question.maxLength) {
      newValue = newValue.slice(0, question.maxLength)
    }

    onChange(newValue)
  }

  return (
    <div className="space-y-2">
      <Input
        type="text"
        inputMode={isZipCode ? 'numeric' : 'text'}
        value={value || ''}
        onChange={handleChange}
        placeholder={question.placeholder}
        disabled={disabled}
        maxLength={question.maxLength}
        className={isZipCode ? 'text-center text-lg' : ''}
      />
      {question.description && (
        <p className="text-sm text-muted-foreground text-center">
          {question.description}
        </p>
      )}
    </div>
  )
}
