<template>
  <div class="dist-form">
    <div class="field">
      <label class="required">{{ lang === 'de' ? 'Zugangs-URL' : 'Access URL' }}</label>
      <input type="url" :value="modelValue['dcat:accessURL'] || ''" placeholder="https://…"
        @input="update('dcat:accessURL', $event.target.value)" />
    </div>

    <div class="field">
      <label>{{ lang === 'de' ? 'Download-URL' : 'Download URL' }}</label>
      <input type="url" :value="modelValue['dcat:downloadURL'] || ''" placeholder="https://…"
        @input="update('dcat:downloadURL', $event.target.value)" />
    </div>

    <div class="field span2">
      <label>{{ lang === 'de' ? 'Titel' : 'Title' }}</label>
      <input type="text" :value="modelValue['dct:title'] || ''"
        :placeholder="lang === 'de' ? 'Titel der Distribution' : 'Distribution title'"
        @input="update('dct:title', $event.target.value)" />
    </div>

    <div class="field span2">
      <label>{{ lang === 'de' ? 'Beschreibung' : 'Description' }}</label>
      <textarea :value="modelValue['dct:description'] || ''"
        :placeholder="lang === 'de' ? 'Beschreibung …' : 'Description …'"
        @input="update('dct:description', $event.target.value)" rows="3" />
    </div>

    <div class="field">
      <label>{{ lang === 'de' ? 'Dateiformat' : 'File Format' }}</label>
      <select :value="modelValue['dct:format'] || ''" @change="update('dct:format', $event.target.value)">
        <option value="">{{ lang === 'de' ? '— Bitte wählen —' : '— Please select —' }}</option>
        <option v-for="opt in formatOptions" :key="opt.value" :value="opt.value">
          {{ opt.label?.[lang] || opt.label?.en || opt.value }}
        </option>
      </select>
    </div>

    <div class="field">
      <label>{{ lang === 'de' ? 'Medientyp' : 'Media Type' }}</label>
      <input type="text" :value="modelValue['dcat:mediaType'] || ''" placeholder="text/csv"
        @input="update('dcat:mediaType', $event.target.value)" />
    </div>

    <div class="field span2">
      <label>{{ lang === 'de' ? 'Lizenz' : 'License' }}</label>
      <input type="url" :value="modelValue['dct:license'] || ''"
        placeholder="https://creativecommons.org/licenses/by/4.0/"
        @input="update('dct:license', $event.target.value)" />
    </div>

    <div class="field">
      <label>{{ lang === 'de' ? 'Verfügbarkeit' : 'Availability' }}</label>
      <select :value="modelValue['dcatap:availability'] || ''"
        @change="update('dcatap:availability', $event.target.value)">
        <option value="">{{ lang === 'de' ? '— Bitte wählen —' : '— Please select —' }}</option>
        <option v-for="opt in availabilityOptions" :key="opt.value" :value="opt.value">
          {{ opt.label?.[lang] || opt.label?.en || opt.value }}
        </option>
      </select>
    </div>

    <div class="field">
      <label>{{ lang === 'de' ? 'Veröffentlichungsdatum' : 'Issued' }}</label>
      <input type="date" :value="modelValue['dct:issued'] || ''"
        @input="update('dct:issued', $event.target.value)" />
    </div>

    <div class="field">
      <label>{{ lang === 'de' ? 'Zuletzt geändert' : 'Modified' }}</label>
      <input type="date" :value="modelValue['dct:modified'] || ''"
        @input="update('dct:modified', $event.target.value)" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  lang: String,
  formatOptions: { type: Array, default: () => [] },
  availabilityOptions: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue'])

function update(key, value) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>

<style scoped>
.dist-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

.field { display: flex; flex-direction: column; gap: 0.25rem; }
.field.span2 { grid-column: span 2; }

label {
  font-size: var(--font-size-label);
  font-weight: 500;
  color: var(--color-text-muted);
}
label.required::after { content: ' *'; color: var(--color-error); }

input[type="text"],
input[type="url"],
input[type="date"],
textarea,
select {
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  background: var(--color-surface);
  color: var(--color-text);
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.2s;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

textarea { resize: vertical; }
select { cursor: pointer; }

@media (max-width: 600px) {
  .dist-form { grid-template-columns: 1fr; }
  .field.span2 { grid-column: span 1; }
}
</style>
