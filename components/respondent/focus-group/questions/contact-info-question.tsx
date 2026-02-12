'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FocusGroupQuestion } from '@/lib/types/focus-group'

interface ContactInfoValue {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

interface ContactInfoQuestionProps {
  question: FocusGroupQuestion
  value: ContactInfoValue
  onChange: (value: ContactInfoValue) => void
  disabled?: boolean
}

export function ContactInfoQuestion({
  question,
  value,
  onChange,
  disabled,
}: ContactInfoQuestionProps) {
  const contactValue = value || {}
  const fields = question.fields || {}

  const handleFieldChange = (field: keyof ContactInfoValue, fieldValue: string) => {
    onChange({
      ...contactValue,
      [field]: fieldValue,
    })
  }

  return (
    <div className="space-y-4">
      {fields.firstName && (
        <div className="space-y-2">
          <Label htmlFor={`${question.id}-firstName`}>
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`${question.id}-firstName`}
            type="text"
            value={contactValue.firstName || ''}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            placeholder="First name"
            disabled={disabled}
            autoComplete="given-name"
          />
        </div>
      )}

      {fields.lastName && (
        <div className="space-y-2">
          <Label htmlFor={`${question.id}-lastName`}>
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`${question.id}-lastName`}
            type="text"
            value={contactValue.lastName || ''}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
            placeholder="Last name"
            disabled={disabled}
            autoComplete="family-name"
          />
        </div>
      )}

      {fields.email && (
        <div className="space-y-2">
          <Label htmlFor={`${question.id}-email`}>
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id={`${question.id}-email`}
            type="email"
            value={contactValue.email || ''}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="email@example.com"
            disabled={disabled}
            autoComplete="email"
          />
        </div>
      )}

      {fields.phone && (
        <div className="space-y-2">
          <Label htmlFor={`${question.id}-phone`}>
            Phone Number <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id={`${question.id}-phone`}
            type="tel"
            value={contactValue.phone || ''}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            placeholder="(555) 555-5555"
            disabled={disabled}
            autoComplete="tel"
          />
        </div>
      )}
    </div>
  )
}
