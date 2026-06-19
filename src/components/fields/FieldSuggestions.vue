<template>
  <div v-if="suggestions.length" class="field-suggestions">
    <span class="suggestions-label">
      {{ lang === 'de' ? 'Frühere Eingaben:' : 'Previous entries:' }}
    </span>
    <div class="suggestions-list">
      <button
        v-for="(item, i) in suggestions"
        :key="i"
        type="button"
        class="suggestion-chip"
        :title="lang === 'de' ? 'Diesen Wert übernehmen' : 'Use this value'"
        @click="$emit('select', item)"
      >
        {{ suggestionsStore.label(item) }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { suggestionsStore } from '../../services/SuggestionsStore.js'

const props = defineProps({
  fieldId: { type: String, required: true },
  lang: { type: String, default: 'de' }
})

defineEmits(['select'])

const suggestions = computed(() => suggestionsStore.get(props.fieldId))
</script>

<style scoped>
.field-suggestions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.25rem;
}

.suggestions-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-subtle);
  white-space: nowrap;
  flex-shrink: 0;
}

.suggestions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.suggestion-chip {
  font-size: var(--font-size-sm);
  padding: 0.15rem 0.55rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface-alt);
  color: var(--color-text);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  max-width: 22ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.suggestion-chip:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-bg);
  color: var(--color-primary);
}
</style>
