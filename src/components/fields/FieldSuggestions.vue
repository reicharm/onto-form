<template>
  <div v-if="suggestions.length" class="field-suggestions">
    <span class="suggestions-label">
      {{ lang === 'de' ? 'Frühere Eingaben:' : 'Previous entries:' }}
    </span>
    <div class="suggestions-list">
      <span
        v-for="(item, i) in suggestions"
        :key="i"
        class="suggestion-chip"
      >
        <button
          type="button"
          class="chip-label"
          :title="lang === 'de' ? 'Diesen Wert übernehmen' : 'Use this value'"
          @click="$emit('select', item)"
        >{{ suggestionsStore.label(item) }}</button>
        <button
          type="button"
          class="chip-remove"
          :title="lang === 'de' ? 'Vorschlag entfernen' : 'Remove suggestion'"
          @click="remove(item)"
        >×</button>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { suggestionsStore } from '../../services/SuggestionsStore.js'

const props = defineProps({
  field: { type: Object, required: true },
  lang: { type: String, default: 'de' }
})

defineEmits(['select'])

// Local reactive copy — refreshed whenever the field changes.
// Needed because localStorage reads are not natively reactive.
const suggestions = ref([])

watchEffect(() => {
  suggestions.value = suggestionsStore.getFor(props.field)
})

function remove(item) {
  suggestionsStore.removeFor(props.field, item)
  suggestions.value = suggestionsStore.getFor(props.field)
}
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
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface-alt);
  overflow: hidden;
  transition: border-color 0.15s, background 0.15s;
}

.suggestion-chip:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-bg);
}

.chip-label {
  font-size: var(--font-size-sm);
  padding: 0.15rem 0.4rem 0.15rem 0.55rem;
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  max-width: 20ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.suggestion-chip:hover .chip-label {
  color: var(--color-primary);
}

.chip-remove {
  font-size: 0.9rem;
  line-height: 1;
  padding: 0.15rem 0.5rem 0.15rem 0.2rem;
  background: none;
  border: none;
  color: var(--color-text-subtle);
  cursor: pointer;
}

.chip-remove:hover {
  color: var(--color-error);
}
</style>
