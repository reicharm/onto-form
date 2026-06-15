<template>
  <div class="metadata-form">
    <div v-for="group in config.groups" :key="group.id" class="form-group">
      <h2 class="group-title">{{ group.label[lang] || group.label.en }}</h2>
      <div class="group-fields">
        <component
          v-for="field in groupFields(group)"
          :key="field.id"
          :is="fieldComponent(field)"
          :field="field"
          :lang="lang"
          :modelValue="modelValue[field.id]"
          @update:modelValue="updateField(field.id, $event)"
        />
      </div>
    </div>

    <div class="form-actions">
      <button class="btn-export" @click="$emit('export')">Export JSON-LD / Turtle</button>
    </div>
  </div>
</template>

<script setup>
import TextField from './fields/TextField.vue'
import TextareaField from './fields/TextareaField.vue'
import SelectField from './fields/SelectField.vue'
import DateField from './fields/DateField.vue'
import URIField from './fields/URIField.vue'
import LangStringField from './fields/LangStringField.vue'

const props = defineProps({
  config: Object,
  lang: String,
  modelValue: Object
})

const emit = defineEmits(['update:modelValue', 'export'])

const componentMap = {
  textarea: TextareaField,
  select: SelectField,
  date: DateField,
  uri: URIField,
  langstring: LangStringField,
  text: TextField
}

function fieldComponent(field) {
  return componentMap[field.type] || TextField
}

function groupFields(group) {
  return (group.fields || [])
    .map(id => props.config.fields[id])
    .filter(f => f && f.visible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
}

function updateField(id, value) {
  emit('update:modelValue', { ...props.modelValue, [id]: value })
}
</script>

<style scoped>
.metadata-form { display: flex; flex-direction: column; gap: 2rem; }

.form-group {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 1.5rem;
}

.group-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c5f8a;
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e8f0f7;
}

.group-fields { display: flex; flex-direction: column; gap: 1rem; }

.form-actions { display: flex; justify-content: flex-end; padding: 0.5rem 0; }

.btn-export {
  background: #2c5f8a;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 500;
}
.btn-export:hover { background: #1e4468; }
</style>
