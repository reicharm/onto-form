<template>
  <div class="field">
    <label :for="`${field.id}-body`" :class="{ required: field.required }">{{ label }}</label>
    <div class="uri-row">
      <div class="uri-input" :class="{ focused }">
        <select
          class="protocol-select"
          :value="protocol"
          :aria-label="lang === 'de' ? 'URI-Protokoll' : 'URI protocol'"
          @change="onProtocolChange($event.target.value)"
          @focus="focused = true"
          @blur="focused = false"
        >
          <option v-for="p in protocols" :key="p" :value="p">{{ p }}</option>
        </select>
        <span class="protocol-sep" aria-hidden="true">://</span>
        <input
          :id="`${field.id}-body`"
          ref="inputEl"
          type="text"
          :value="body"
          :placeholder="bodyPlaceholder"
          :aria-label="`${protocol}://${lang === 'de' ? ' Adresspfad' : ' address path'}`"
          @input="onBodyInput($event.target.value)"
          @focus="focused = true"
          @blur="focused = false"
        />
      </div>
      <button
        v-if="field.generate"
        type="button"
        class="btn-generate"
        :aria-label="lang === 'de' ? `Neuen ${label} generieren` : `Generate new ${label}`"
        @click="generate"
      >↺</button>
    </div>
    <span v-if="field.hint?.[lang]" class="hint">{{ field.hint[lang] }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { generateId } from '../../config/idGenerators.js'

const props = defineProps({
  field: Object,
  lang: String,
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const protocols = ['https', 'http', 'mailto', 'ftp', 'urn']
const DEFAULT_PROTOCOL = 'https'

const focused = ref(false)
const inputEl = ref(null)

function splitURI(value) {
  if (!value) return { protocol: DEFAULT_PROTOCOL, body: '' }
  const sep = value.indexOf('://')
  if (sep !== -1) {
    const p = value.slice(0, sep)
    return protocols.includes(p)
      ? { protocol: p, body: value.slice(sep + 3) }
      : { protocol: DEFAULT_PROTOCOL, body: value }
  }
  if (value.startsWith('mailto:')) {
    return { protocol: 'mailto', body: value.slice(7) }
  }
  return { protocol: DEFAULT_PROTOCOL, body: value }
}

const protocol = ref(splitURI(props.modelValue).protocol)
const body = ref(splitURI(props.modelValue).body)

watch(() => props.modelValue, (val) => {
  const parts = splitURI(val)
  if (parts.protocol !== protocol.value) protocol.value = parts.protocol
  if (parts.body !== body.value) body.value = parts.body
})

function buildURI() {
  if (!body.value) return ''
  if (protocol.value === 'mailto') return `mailto:${body.value}`
  return `${protocol.value}://${body.value}`
}

function onProtocolChange(p) {
  protocol.value = p
  emit('update:modelValue', buildURI())
  inputEl.value?.focus()
}

function onBodyInput(val) {
  const sep = val.indexOf('://')
  if (sep !== -1) {
    const p = val.slice(0, sep)
    if (protocols.includes(p)) {
      protocol.value = p
      body.value = val.slice(sep + 3)
      emit('update:modelValue', buildURI())
      return
    }
  }
  body.value = val
  emit('update:modelValue', buildURI())
}

async function generate() {
  const value = await generateId(props.field.generate, props.field.generateOptions)
  if (value != null) emit('update:modelValue', value)
}

onMounted(() => {
  if (props.field.generate && !props.modelValue) generate()
})

const label = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)

const bodyPlaceholder = computed(() => {
  const ph = props.field.placeholder?.[props.lang] || props.field.placeholder?.en || ''
  const sep = ph.indexOf('://')
  if (sep !== -1) return ph.slice(sep + 3)
  return ph || (protocol.value === 'mailto' ? 'name@example.com' : 'example.com/path')
})
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }

label { font-size: var(--font-size-label); font-weight: 500; color: var(--color-text-muted); }
label.required::after { content: ' *'; color: var(--color-error); }

.uri-row {
  display: flex;
  gap: 0.4rem;
  align-items: stretch;
}

.uri-row .uri-input {
  flex: 1;
  min-width: 0;
}

.btn-generate {
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface-alt, #f5f7fa);
  color: var(--color-primary);
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  white-space: nowrap;
  flex-shrink: 0;
}
.btn-generate:hover { background: var(--color-primary-bg); border-color: var(--color-primary); }
.btn-generate:focus { outline: none; box-shadow: var(--focus-ring); border-color: var(--color-primary); }

.uri-input {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.uri-input.focused {
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

.protocol-select {
  padding: 0.5rem 0.4rem;
  border: none;
  border-right: 1px solid var(--color-border);
  background: var(--color-surface-alt);
  color: var(--color-primary);
  font-size: var(--font-size-label);
  font-weight: 600;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  text-align: center;
  min-width: 4rem;
}

.protocol-select:focus { outline: none; }

.protocol-sep {
  padding: 0 0.1rem 0 0.2rem;
  display: flex;
  align-items: center;
  font-size: var(--font-size-label);
  color: var(--color-text-subtle);
  background: var(--color-surface-alt);
  border-right: 1px solid var(--color-border);
  user-select: none;
}

input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: none;
  font-size: var(--font-size-base);
  min-width: 0;
}

input:focus { outline: none; }

.hint { font-size: var(--font-size-sm); color: var(--color-text-subtle); }
</style>
