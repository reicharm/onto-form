<template>
  <Teleport to="body" :disabled="!teleport">
    <div
      v-if="show"
      class="modal-overlay"
      @click.self="$emit('close')"
      @keydown.esc="$emit('close')"
    >
      <div
        class="modal-panel"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="headingId"
        :style="maxWidth ? { maxWidth } : undefined"
        ref="panelEl"
      >
        <div class="modal-header">
          <h2 :id="headingId"><slot name="title">{{ title }}</slot></h2>
          <button
            class="close-btn"
            :aria-label="closeLabel"
            @click="$emit('close')"
          >✕</button>
        </div>

        <slot name="notice" />

        <slot name="tabs" />

        <slot />

        <div class="modal-actions">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, toRef } from 'vue'
import { useFocusFirstOnShow } from '../composables/useFocusFirstOnShow.js'

const props = defineProps({
  show: { type: Boolean, default: true },
  teleport: { type: Boolean, default: false },
  title: { type: String, default: '' },
  headingId: { type: String, required: true },
  closeLabel: { type: String, default: 'Close' },
  maxWidth: { type: String, default: '' },
  focusSelectors: { type: Array, default: () => ['button'] },
  // Non-teleported modals (Export/Import) are mounted only while shown, so
  // focus should happen once on mount. Teleported modals (Distribution)
  // stay mounted and toggle `show`, so focus must re-trigger on each open.
  refocusOnShow: { type: Boolean, default: false }
})

defineEmits(['close'])

const panelEl = ref(null)

useFocusFirstOnShow(panelEl, {
  selectors: props.focusSelectors,
  show: props.refocusOnShow ? toRef(props, 'show') : undefined
})

defineExpose({ panelEl })
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}

.modal-panel {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  width: 90%;
  max-width: 700px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
}
.modal-header h2 { font-size: var(--font-size-heading); color: var(--color-primary); }

.close-btn {
  background: none; border: none; font-size: 1.2rem;
  cursor: pointer; color: var(--color-text-subtle); line-height: 1;
  padding: 0.2rem 0.4rem; border-radius: var(--radius-sm);
}
.close-btn:hover { color: var(--color-error); }
.close-btn:focus { outline: none; box-shadow: var(--focus-ring); }

.modal-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;
}
.modal-actions:empty { display: none; }
</style>
