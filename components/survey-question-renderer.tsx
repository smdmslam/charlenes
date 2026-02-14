"use client"

import { Question } from "@/lib/survey-questions"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SurveyQuestionRendererProps {
  question: Question
  value: any
  onChange: (value: any) => void
}

export function SurveyQuestionRenderer({
  question,
  value,
  onChange,
}: SurveyQuestionRendererProps) {
  switch (question.type) {
    case "multiple_choice":
      return (
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="space-y-4"
        >
          {question.options?.map((option) => (
            <div
              key={option.id}
              className="flex items-center space-x-3 p-4 border border-gold/20 rounded hover:border-gold/40 transition-colors cursor-pointer"
            >
              <RadioGroupItem
                value={option.value as string}
                id={option.id}
                className="border-gold text-gold"
              />
              <Label
                htmlFor={option.id}
                className="flex-1 text-cream font-light cursor-pointer text-base"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )

    case "multiple_choice_multi":
      const selectedValues = Array.isArray(value) ? value : []
      
      return (
        <div className="space-y-4">
          {question.options?.map((option) => {
            const isSelected = selectedValues.includes(option.value)
            const canSelect = selectedValues.length < 3 || isSelected

            return (
              <div
                key={option.id}
                className={`flex items-center space-x-3 p-4 border rounded transition-colors ${
                  isSelected
                    ? "border-gold bg-gold/10"
                    : canSelect
                    ? "border-gold/20 hover:border-gold/40 cursor-pointer"
                    : "border-gold/10 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (!canSelect) return
                  
                  if (isSelected) {
                    onChange(selectedValues.filter((v) => v !== option.value))
                  } else {
                    onChange([...selectedValues, option.value])
                  }
                }}
              >
                <Checkbox
                  checked={isSelected}
                  disabled={!canSelect}
                  className="border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                />
                <Label
                  htmlFor={option.id}
                  className="flex-1 text-cream font-light cursor-pointer text-base"
                >
                  {option.label}
                </Label>
              </div>
            )
          })}
          {question.description && (
            <p className="text-sm text-cream/60 mt-2">
              {question.description}
            </p>
          )}
        </div>
      )

    case "opinion_scale":
      const scaleValue = value !== undefined ? [Number(value)] : [question.scaleMin || 1]
      
      return (
        <div className="space-y-6">
          <div className="px-2">
            <Slider
              value={scaleValue}
              onValueChange={(vals) => onChange(vals[0])}
              min={question.scaleMin || 1}
              max={question.scaleMax || 10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between mt-4 text-sm text-cream/70">
              <span>{question.scaleLabels?.min || "1"}</span>
              <span className="text-gold text-lg font-light">
                {scaleValue[0]}
              </span>
              <span>{question.scaleLabels?.max || "10"}</span>
            </div>
          </div>
        </div>
      )

    case "short_text":
      return (
        <Input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          maxLength={question.maxLength}
          className="bg-background border-gold/20 text-cream placeholder:text-cream/40 h-12 text-base focus-visible:border-gold focus-visible:ring-gold/20"
        />
      )

    case "long_text":
      return (
        <Textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          maxLength={question.maxLength}
          rows={6}
          className="bg-background border-gold/20 text-cream placeholder:text-cream/40 text-base leading-relaxed focus-visible:border-gold focus-visible:ring-gold/20 resize-y"
        />
      )

    default:
      return (
        <div className="text-cream/60">
          Question type "{question.type}" not yet implemented
        </div>
      )
  }
}
