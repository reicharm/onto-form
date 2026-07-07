<template>
  <div class="viewer-tabs">
    <div class="tabs-bar" role="tablist">
      <button
        v-for="tab in section.tabs"
        :key="tab.id"
        role="tab"
        :aria-selected="activeTab === tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label?.[lang] || tab.label?.de || tab.label?.en || tab.id }}
      </button>
    </div>
    <div class="tab-content" role="tabpanel">
      <template v-for="tab in section.tabs" :key="tab.id">
        <div v-show="activeTab === tab.id" class="tab-panel">
          <!-- Tab with multiple named sections -->
          <template v-if="tab.sections && tab.sections.length">
            <div
              v-for="(sec, i) in tab.sections"
              :key="sec.id || i"
              :class="['tab-section', { 'tab-section--first': i === 0 }]"
            >
              <div v-if="sec.label" class="tab-section-label">
                {{ sec.label?.[lang] || sec.label?.de || sec.label?.en || sec.id }}
              </div>
              <FieldGroupView
                :fieldIds="sec.fields || []"
                :fields="fields"
                :data="data"
                :lang="lang"
              />
            </div>
          </template>
          <!-- Tab with a flat field list (existing behaviour) -->
          <FieldGroupView
            v-else
            :fieldIds="tab.fields || []"
            :fields="fields"
            :data="data"
            :lang="lang"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FieldGroupView from './FieldGroupView.vue'

const props = defineProps({
  section: { type: Object, required: true },
  fields: { type: Object, required: true },
  data: { type: Object, default: () => ({}) },
  lang: { type: String, default: 'de' }
})

const activeTab = ref(props.section.tabs?.[0]?.id)
</script>

<style scoped>
.viewer-tabs {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.tabs-bar {
  display: flex;
  border-bottom: 2px solid var(--color-border);
  background: var(--color-surface);
  gap: 0;
  overflow-x: auto;
}

.tab-btn {
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  padding: 0.75rem 1.25rem;
  font-size: var(--font-size-base);
  color: var(--color-text-muted);
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s, border-color 0.15s;
  font-weight: 500;
}

.tab-btn:hover {
  color: var(--color-primary);
}

.tab-btn.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  font-weight: 600;
}

.tab-content {
  padding: 1.5rem;
}

.tab-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tab-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.tab-section--first {
  padding-top: 0;
  border-top: none;
}

.tab-section-label {
  font-size: var(--font-size-label);
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
</style>
