'use client'

import { useState } from 'react'
import { useCampaignWizardStore } from '@/lib/stores/campaign-wizard-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Plus, Trash2 } from 'lucide-react'

export function StepConsent() {
  const {
    consentText,
    privacyPolicyUrl,
    contactEmail,
    acknowledgments,
    setConsent,
    setCurrentStep,
    markStepComplete,
  } = useCampaignWizardStore()

  const [localConsentText, setLocalConsentText] = useState(consentText)
  const [localPrivacyUrl, setLocalPrivacyUrl] = useState(privacyPolicyUrl)
  const [localContactEmail, setLocalContactEmail] = useState(contactEmail)
  const [localAcknowledgments, setLocalAcknowledgments] = useState<string[]>(
    acknowledgments.length > 0 ? acknowledgments : ['']
  )

  const handleAddAcknowledgment = () => {
    setLocalAcknowledgments([...localAcknowledgments, ''])
  }

  const handleUpdateAcknowledgment = (index: number, value: string) => {
    const updated = [...localAcknowledgments]
    updated[index] = value
    setLocalAcknowledgments(updated)
  }

  const handleRemoveAcknowledgment = (index: number) => {
    if (localAcknowledgments.length > 1) {
      setLocalAcknowledgments(localAcknowledgments.filter((_, i) => i !== index))
    }
  }

  const handleBack = () => {
    saveState()
    setCurrentStep(2)
  }

  const handleContinue = () => {
    saveState()
    markStepComplete(3)
    setCurrentStep(4)
  }

  const saveState = () => {
    setConsent({
      consentText: localConsentText,
      privacyPolicyUrl: localPrivacyUrl,
      contactEmail: localContactEmail,
      acknowledgments: localAcknowledgments.filter((a) => a.trim() !== ''),
    })
  }

  const defaultConsentTemplate = `By participating in this research study, you agree to the following:

• Your responses will be used for research purposes only
• Your personal information will be kept confidential
• You can withdraw from the study at any time
• Your participation is voluntary

If you have any questions about this study, please contact us.`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consent & Legal</CardTitle>
        <CardDescription>
          Configure the consent text and legal acknowledgments respondents must agree to
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Consent text */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="consentText">Consent Text</Label>
            {!localConsentText && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocalConsentText(defaultConsentTemplate)}
              >
                Use Template
              </Button>
            )}
          </div>
          <Textarea
            id="consentText"
            placeholder="Enter the consent text that respondents must agree to..."
            value={localConsentText}
            onChange={(e) => setLocalConsentText(e.target.value)}
            rows={8}
          />
          <p className="text-xs text-muted-foreground">
            This text will be displayed on the landing page before respondents can proceed
          </p>
        </div>

        {/* Acknowledgments */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Checkbox Acknowledgments</Label>
            <Button variant="ghost" size="sm" onClick={handleAddAcknowledgment}>
              <Plus className="mr-1 h-3 w-3" />
              Add
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Each item will appear as a checkbox that respondents must check to proceed
          </p>
          <div className="space-y-2">
            {localAcknowledgments.map((ack, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="e.g., I am 18 years of age or older"
                  value={ack}
                  onChange={(e) => handleUpdateAcknowledgment(index, e.target.value)}
                />
                {localAcknowledgments.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0"
                    onClick={() => handleRemoveAcknowledgment(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Privacy policy URL */}
        <div className="space-y-2">
          <Label htmlFor="privacyUrl">Privacy Policy URL (Optional)</Label>
          <Input
            id="privacyUrl"
            type="url"
            placeholder="https://yourcompany.com/privacy"
            value={localPrivacyUrl}
            onChange={(e) => setLocalPrivacyUrl(e.target.value)}
          />
        </div>

        {/* Contact email */}
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email (Optional)</Label>
          <Input
            id="contactEmail"
            type="email"
            placeholder="research@yourcompany.com"
            value={localContactEmail}
            onChange={(e) => setLocalContactEmail(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Displayed on disqualification page for respondent questions
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleContinue}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
