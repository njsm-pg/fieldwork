'use client'

import { FocusGroupQuestion, FocusGroupResponseValue } from '@/lib/types/focus-group'
import { SingleChoiceQuestion } from './questions/single-choice-question'
import { MultiChoiceQuestion } from './questions/multi-choice-question'
import { ConsentQuestion } from './questions/consent-question'
import { ContactInfoQuestion } from './questions/contact-info-question'
import { TextQuestion } from './questions/text-question'
import { TextareaQuestion } from './questions/textarea-question'
import { NumberQuestion } from './questions/number-question'

interface QuestionRendererProps {
  question: FocusGroupQuestion
  value: FocusGroupResponseValue
  onChange: (value: FocusGroupResponseValue) => void
  disabled?: boolean
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  disabled,
}: QuestionRendererProps) {
  switch (question.type) {
    case 'single_choice':
      return (
        <SingleChoiceQuestion
          question={question}
          value={value as string}
          onChange={onChange}
          disabled={disabled}
        />
      )

    case 'multi_choice':
      return (
        <MultiChoiceQuestion
          question={question}
          value={value as string[]}
          onChange={onChange}
          disabled={disabled}
        />
      )

    case 'consent':
      return (
        <ConsentQuestion
          question={question}
          value={value as Record<string, boolean>}
          onChange={onChange}
          disabled={disabled}
        />
      )

    case 'contact_info':
      return (
        <ContactInfoQuestion
          question={question}
          value={value as { firstName?: string; lastName?: string; email?: string; phone?: string }}
          onChange={onChange}
          disabled={disabled}
        />
      )

    case 'text':
      return (
        <TextQuestion
          question={question}
          value={value as string}
          onChange={onChange}
          disabled={disabled}
        />
      )

    case 'textarea':
      return (
        <TextareaQuestion
          question={question}
          value={value as string}
          onChange={onChange}
          disabled={disabled}
        />
      )

    case 'number':
      return (
        <NumberQuestion
          question={question}
          value={value as number | string}
          onChange={onChange}
          disabled={disabled}
        />
      )

    default:
      return (
        <p className="text-muted-foreground">
          Unknown question type: {question.type}
        </p>
      )
  }
}
