<template>
  <div class="field">
    <label :class="{ required: field.required }">{{ label }}</label>
    <div class="uri-input" :class="{ focused }">
      <select
        class="protocol-select"
        :value="protocol"
        @change="onProtocolChange($event.target.value)"
        @focus="focused = true"
        @blur="focused = false"
      >
        <option v-for="p in protocols" :key="p" :value="p">{{ p }}</option>
      </select>
      <span class="protocol-sep">://</span>
      <input
        ref="inputEl"
        type="text"
        :value="body"
        :placeholder="bodyPlaceholder"
        @input="onBodyInput($event.target.value)"
        @focus="focused = true"
        @blur="focused = false"
      />
    </div>
    <span v-if="field.hint?.[lang]" class="hint">{{ field.hint[lang] }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

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

// Split stored value into protocol + body
function splitURI(value) {
  if (!value) return { protocol: DEFAULT_PROTOCOL, body: '' }
  const sep = value.indexOf('://')
  if (sep !== -1) {
    const p = value.slice(0, sep)
    return protocols.includes(p)
      ? { protocol: p, body: value.slice(sep + 3) }
      : { protocol: DEFAULT_PROTOCOL, body: value }
  }
  // mailto without ://
  if (value.startsWith('mailto:')) {
    return { protocol: 'mailto', body: value.slice(7) }
  }
  return { protocol: DEFAULT_PROTOCOL, body: value }
}

const protocol = ref(splitURI(props.modelValue).protocol)
const body = ref(splitURI(props.modelValue).body)

// Keep local state in sync when the stored value changes externally (e.g. import)
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
  // If the user pastes a full URI into the body field, split it
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

const label = computed(() => props.field.label?.[props.lang] || props.field.label?.en || props.field.id)

const bodyPlaceholder = computed(() => {
  const ph = props.field.placeholder?.[props.lang] || props.field.placeholder?.en || ''
  // Strip any protocol prefix from the placeholder so it fits the body field
  const sep = ph.indexOf('://')
  if (sep !== -1) return ph.slice(sep + 3)
  return ph || (protocol.value === 'mailto' ? 'name@example.com' : 'example.com/path')
})
</script>

<style scoped>
.field { display: flex; flex-direction: column; gap: 0.3rem; }

label { font-size: 0.85rem; font-weight: 500; color: #555; }
label.required::after { content: ' *'; color: #c0392b; }

.uri-input {
  display: flex;
  align-items: stretch;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.uri-input.focused {
  border-color: #2c5f8a;
  box-shadow: 0 0 0 2px rgba(44,95,138,0.15);
}

.protocol-select {
  padding: 0.5rem 0.4rem;
  border: none;
  border-right: 1px solid #ddd;
  background: #f0f4f8;
  color: #2c5f8a;
  font-size: 0.85rem;
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
  font-size: 0.85rem;
  color: #999;
  background: #f0f4f8;
  border-right: 1px solid #ddd;
  user-select: none;
}

input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: none;
  font-size: 0.95rem;
  min-width: 0;
}

input:focus { outline: none; }

.hint { font-size: 0.78rem; color: #888; }
</style>
