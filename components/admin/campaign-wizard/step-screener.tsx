'use client'

import { useState } from 'react'
import { useCampaignWizardStore, ScreenerQuestion } from '@/lib/stores/campaign-wizard-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, ArrowRight, Plus, Trash2, GripVertical } from 'lucide-react'

export function StepScreener() {
  const {
    screenerQuestions,
    addScreenerQuestion,
    updateScreenerQuestion,
    removeScreenerQuestion,
    setCurrentStep,
    markStepComplete,
  } = useCampaignWizardStore()

  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAddQuestion = () => {
    const newQuestion: ScreenerQuestion = {
      id: crypto.randomUUID(),
      question_text: '',
      question_type: 'single_choice',
      options: [
        { id: crypto.randomUUID(), text: '', qualifies: true },
        { id: crypto.randomUUID(), text: '', qualifies: false },
      ],
    }
    addScreenerQuestion(newQuestion)
    setEditingId(newQuestion.id)
  }

  const handleUpdateQuestionText = (id: string, text: string) => {
    updateScreenerQuestion(id, { question_text: text })
  }

  const handleUpdateQuestionType = (id: string, type: 'single_choice' | 'multi_choice') => {
    updateScreenerQuestion(id, { question_type: type })
  }

  const handleAddOption = (questionId: string) => {
    const question = screenerQuestions.find((q) => q.id === questionId)
    if (question) {
      updateScreenerQuestion(questionId, {
        options: [
          ...question.options,
          { id: crypto.randomUUID(), text: '', qualifies: true },
        ],
      })
    }
  }

  const handleUpdateOption = (
    questionId: string,
    optionId: string,
    updates: Partial<{ text: string; qualifies: boolean }>
  ) => {
    const question = screenerQuestions.find((q) => q.id === questionId)
    if (question) {
      updateScreenerQuestion(questionId, {
        options: question.options.map((o) =>
          o.id === optionId ? { ...o, ...updates } : o
        ),
      })
    }
  }

  const handleRemoveOption = (questionId: string, optionId: string) => {
    const question = screenerQuestions.find((q) => q.id === questionId)
    if (question && question.options.length > 2) {
      updateScreenerQuestion(questionId, {
        options: question.options.filter((o) => o.id !== optionId),
      })
    }
  }

  const handleBack = () => {
    setCurrentStep(1)
  }

  const handleContinue = () => {
    markStepComplete(2)
    setCurrentStep(3)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Screener Questions</CardTitle>
        <CardDescription>
          Add qualification questions to filter respondents before the main survey.
          Mark which answers qualify respondents to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {screenerQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
            <p className="mb-4 text-muted-foreground">
              No screener questions yet. Add questions to filter respondents.
            </p>
            <Button onClick={handleAddQuestion}>
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {screenerQuestions.map((question, index) => (
              <div
                key={question.id}
                className="rounded-lg border p-4 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GripVertical className="h-4 w-4" />
                    <span className="text-sm font-medium">Q{index + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => removeScreenerQuestion(question.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Question Text</Label>
                  <Input
                    placeholder="Enter your question..."
                    value={question.question_text}
                    onChange={(e) =>
                      handleUpdateQuestionText(question.id, e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Question Type</Label>
                  <Select
                    value={question.question_type}
                    onValueChange={(value) =>
                      handleUpdateQuestionType(
                        question.id,
                        value as 'single_choice' | 'multi_choice'
                      )
                    }
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single_choice">Single Choice</SelectItem>
                      <SelectItem value="multi_choice">Multiple Choice</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Answer Options</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddOption(question.id)}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Add Option
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <Input
                          placeholder="Option text..."
                          value={option.text}
                          onChange={(e) =>
                            handleUpdateOption(question.id, option.id, {
                              text: e.target.value,
                            })
                          }
                          className="flex-1"
                        />
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <Checkbox
                            id={`qualify-${option.id}`}
                            checked={option.qualifies}
                            onCheckedChange={(checked) =>
                              handleUpdateOption(question.id, option.id, {
                                qualifies: checked as boolean,
                              })
                            }
                          />
                          <Label
                            htmlFor={`qualify-${option.id}`}
                            className="text-xs text-muted-foreground cursor-pointer"
                          >
                            Qualifies
                          </Label>
                        </div>
                        {question.options.length > 2 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleRemoveOption(question.id, option.id)
                            }
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full" onClick={handleAddQuestion}>
              <Plus className="mr-2 h-4 w-4" />
              Add Another Question
            </Button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleContinue}>
            {screenerQuestions.length === 0 ? 'Skip' : 'Continue'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
