import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { HelpCircle, ListChecks, Sparkles } from 'lucide-react'
import { EmptyHint, Field, LIMIT, ListRow, SectionCard } from './ProductFormParts'

type PairField<T extends Record<string, string>> = {
  items: T[]
  canAdd: boolean
  canRemove: boolean
  add: () => void
  remove: (index: number) => void
  update: (index: number, key: keyof T & string, value: string) => void
}

type Props = {
  highlightsField: PairField<{ title: string; description: string }>
  specsField: PairField<{ label: string; value: string }>
  faqsField: PairField<{ question: string; answer: string }>
  savingKey: string | null
  onSaveHighlights: () => void
  onSaveSpecs: () => void
  onSaveFaqs: () => void
}

export default function ProductMetaSections({
  highlightsField,
  specsField,
  faqsField,
  savingKey,
  onSaveHighlights,
  onSaveSpecs,
  onSaveFaqs,
}: Props) {
  return (
    <>
      <SectionCard
        icon={Sparkles}
        tone="sky"
        title="Product Highlights"
        description="Short selling points that tell buyers why this product is worth choosing."
        count={highlightsField.items.length}
        max={LIMIT.highlights}
        canAdd={highlightsField.canAdd}
        onAdd={highlightsField.add}
        addLabel="Add Highlight"
        onSave={onSaveHighlights}
        saving={savingKey === 'highlights'}
      >
        {highlightsField.items.length === 0 ? (
          <EmptyHint>No highlights yet. Click “Add Highlight” to create one.</EmptyHint>
        ) : (
          <div className="flex flex-col gap-4">
            {highlightsField.items.map((h, index) => (
              <ListRow
                key={index}
                index={index}
                canRemove={highlightsField.canRemove}
                onRemove={() => highlightsField.remove(index)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label={`Highlight ${index + 1} Title`} required>
                    <Input
                      value={h.title}
                      maxLength={60}
                      onChange={(e) => highlightsField.update(index, 'title', e.target.value)}
                      placeholder="e.g. Works offline"
                    />
                  </Field>
                  <Field label="Description (optional)">
                    <Input
                      value={h.description}
                      maxLength={140}
                      onChange={(e) =>
                        highlightsField.update(index, 'description', e.target.value)
                      }
                      placeholder="One sentence that explains it"
                    />
                  </Field>
                </div>
              </ListRow>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        icon={ListChecks}
        tone="emerald"
        title="Product Specifications"
        description="Factual details, such as version, license, or compatibility, shown as a label-and-value table."
        count={specsField.items.length}
        max={LIMIT.specs}
        canAdd={specsField.canAdd}
        onAdd={specsField.add}
        addLabel="Add Spec"
        onSave={onSaveSpecs}
        saving={savingKey === 'specs'}
      >
        {specsField.items.length === 0 ? (
          <EmptyHint>No specifications yet. Click “Add Spec” to create one.</EmptyHint>
        ) : (
          <div className="flex flex-col gap-4">
            {specsField.items.map((spec, index) => (
              <ListRow
                key={index}
                index={index}
                canRemove={specsField.canRemove}
                onRemove={() => specsField.remove(index)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label={`Spec ${index + 1} Name`} required>
                    <Input
                      value={spec.label}
                      maxLength={40}
                      onChange={(e) => specsField.update(index, 'label', e.target.value)}
                      placeholder={`e.g. ${['Platforms', 'License', 'Supported chains'][index] || 'Spec'}`}
                    />
                  </Field>
                  <Field label="Value" required>
                    <Input
                      value={spec.value}
                      maxLength={120}
                      onChange={(e) => specsField.update(index, 'value', e.target.value)}
                      placeholder="e.g. Web, iOS, Android"
                    />
                  </Field>
                </div>
              </ListRow>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard
        icon={HelpCircle}
        tone="rose"
        title="Product FAQs"
        description="Answers to the questions buyers most often ask before purchasing."
        count={faqsField.items.length}
        max={LIMIT.faqs}
        canAdd={faqsField.canAdd}
        onAdd={faqsField.add}
        addLabel="Add FAQ"
        onSave={onSaveFaqs}
        saving={savingKey === 'faqs'}
      >
        {faqsField.items.length === 0 ? (
          <EmptyHint>No FAQs yet. Click “Add FAQ” to create one.</EmptyHint>
        ) : (
          <div className="flex flex-col gap-4">
            {faqsField.items.map((faq, index) => (
              <ListRow
                key={index}
                index={index}
                canRemove={faqsField.canRemove}
                onRemove={() => faqsField.remove(index)}
              >
                <div className="flex flex-col gap-3">
                  <Field label={`Question ${index + 1}`} required>
                    <Input
                      value={faq.question}
                      maxLength={120}
                      onChange={(e) => faqsField.update(index, 'question', e.target.value)}
                      placeholder="e.g. Can I cancel anytime?"
                    />
                  </Field>
                  <Field label="Answer" required>
                    <Textarea
                      value={faq.answer}
                      maxLength={600}
                      rows={3}
                      className="resize-y"
                      onChange={(e) => faqsField.update(index, 'answer', e.target.value)}
                      placeholder="Write a clear, short answer"
                    />
                  </Field>
                </div>
              </ListRow>
            ))}
          </div>
        )}
      </SectionCard>
    </>
  )
}
