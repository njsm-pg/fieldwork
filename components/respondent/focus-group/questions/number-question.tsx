'use client'

import { Input } from '@/components/ui/input'
import { FocusGroupQuestion } from '@/lib/types/focus-group'

interface NumberQuestionProps {
  question: FocusGroupQuestion
  value: number | string
  onChange: (value: number | string) => void
  disabled?: boolean
}

export function NumberQuestion({
  question,
  value,
  onChange,
  disabled,
}: NumberQuestionProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // Allow empty string for clearing
    if (inputValue === '') {
      onChange('')
      return
    }

    // Only allow numeric input, store as string to preserve user input
    // Validation happens in the screener's validateAnswer function
    if (/^\d*$/.test(inputValue)) {
      onChange(inputValue)
    }
  }

  return (
    <div className="space-y-2">
      <Input
        type="number"
        inputMode="numeric"
        value={value ?? ''}
        onChange={handleChange}
        placeholder={question.placeholder}
        disabled={disabled}
        min={question.min}
        max={question.max}
        className="text-center text-lg"
      />
      {question.description && (
        <p className="text-sm text-muted-foreground text-center">
          {question.description}
        </p>
      )}
    </div>
  )
}
