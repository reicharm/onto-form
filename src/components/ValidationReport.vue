<template>
  <div class="validation-report">
    <!-- Header -->
    <div class="report-header">
      <span class="report-title">
        {{ lang === 'de' ? 'SHACL-Validierungsbericht' : 'SHACL Validation Report' }}
      </span>
      <div class="report-summary">
        <span class="badge badge-violation" :class="{ zero: counts.violation === 0 }">
          <span aria-hidden="true">✗ </span>{{ counts.violation }}
          {{ lang === 'de' ? ' Verstoß' + (counts.violation !== 1 ? 'e' : '') : ' Violation' + (counts.violation !== 1 ? 's' : '') }}
        </span>
        <span class="badge badge-warning" :class="{ zero: counts.warning === 0 }">
          <span aria-hidden="true">⚠ </span>{{ counts.warning }}
          {{ lang === 'de' ? ' Warnung' + (counts.warning !== 1 ? 'en' : '') : ' Warning' + (counts.warning !== 1 ? 's' : '') }}
        </span>
        <span v-if="counts.info > 0" class="badge badge-info">
          <span aria-hidden="true">ℹ </span>{{ counts.info }}
        </span>
      </div>
      <button
        class="btn-close"
        type="button"
        :aria-label="lang === 'de' ? 'Bericht schließen' : 'Close report'"
        @click="$emit('close')"
      >×</button>
    </div>

    <!-- Valid state -->
    <div v-if="violations.length === 0" class="report-valid" role="status" aria-live="polite">
      <span class="valid-icon" aria-hidden="true">✓</span>
      <span>{{ lang === 'de' ? 'Keine Verstöße gefunden.' : 'No violations found.' }}</span>
    </div>

    <!-- Violation groups -->
    <template v-for="sev in ['violation', 'warning', 'info']" :key="sev">
      <div v-if="bySeverity[sev]?.length" class="sev-section">
        <div class="sev-heading" :class="'sev-' + sev">
          <span>{{ sevLabel(sev) }}</span>
          <span class="sev-count">({{ bySeverity[sev].length }})</span>
        </div>
        <div
          v-for="v in bySeverity[sev]"
          :key="v.fieldId + '|' + v.constraint"
          class="violation-row"
          :class="'row-' + v.severity"
        >
          <div class="violation-field">
            <span class="field-label">{{ fieldLabel(v) }}</span>
            <code class="field-id">{{ v.fieldId }}</code>
          </div>
          <div class="violation-constraint">
            <span class="constraint-tag">{{ v.constraint }}</span>
            <span class="constraint-msg">{{ lang === 'de' ? v.messageDe : v.messageEn }}</span>
          </div>
          <button
            v-if="v.groupId"
            type="button"
            class="btn-navigate"
            :aria-label="(lang === 'de' ? 'Zum Feld navigieren: ' : 'Navigate to field: ') + fieldLabel(v)"
            @click="$emit('navigate', { fieldId: v.fieldId, groupId: v.groupId })"
          >{{ lang === 'de' ? 'Zum Feld' : 'Go to field' }}</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  violations: { type: Array, default: () => [] },
  lang:       { type: String, default: 'de' }
})

defineEmits(['close', 'navigate'])

const bySeverity = computed(() => {
  const map = { violation: [], warning: [], info: [] }
  for (const v of props.violations) {
    map[v.severity]?.push(v)
  }
  return map
})

const counts = computed(() => ({
  violation: bySeverity.value.violation.length,
  warning:   bySeverity.value.warning.length,
  info:      bySeverity.value.info.length,
}))

function fieldLabel(v) {
  return v.fieldLabel?.[props.lang] || v.fieldLabel?.en || v.fieldId
}

function sevLabel(sev) {
  const labels = {
    violation: { de: 'Verstöße',  en: 'Violations' },
    warning:   { de: 'Warnungen', en: 'Warnings' },
    info:      { de: 'Hinweise',  en: 'Info' },
  }
  return labels[sev]?.[props.lang] || labels[sev]?.en || sev
}
</script>

<style scoped>
.validation-report {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  overflow: hidden;
  margin-top: 1.5rem;
}

/* ── Header ── */
.report-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  background: var(--color-surface-alt);
  border-bottom: 1px solid var(--color-border);
  flex-wrap: wrap;
}

.report-title {
  font-weight: 600;
  font-size: var(--font-size-base);
  flex: 1;
}

.report-summary {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge {
  font-size: var(--font-size-sm);
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-weight: 600;
}

.badge-violation           { background: #fee2e2; color: #b91c1c; }
.badge-violation.zero      { background: #dcfce7; color: #15803d; }
.badge-warning             { background: #fef9c3; color: #92400e; }
.badge-warning.zero        { background: var(--color-surface-alt); color: var(--color-text-subtle); font-weight: 400; }
.badge-info                { background: #dbeafe; color: #1e40af; }

.btn-close {
  background: none;
  border: none;
  font-size: 1.3rem;
  line-height: 1;
  cursor: pointer;
  color: var(--color-text-subtle);
  padding: 0 0.2rem;
  margin-left: auto;
}
.btn-close:hover { color: var(--color-error); }
.btn-close:focus { outline: none; box-shadow: var(--focus-ring); }

/* ── Valid state ── */
.report-valid {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  color: #15803d;
  font-weight: 500;
}
.valid-icon { font-size: 1.2rem; }

/* ── Severity sections ── */
.sev-section { padding: 0.5rem 0; }

.sev-heading {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  font-size: var(--font-size-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.sev-violation { color: #b91c1c; }
.sev-warning   { color: #92400e; }
.sev-info      { color: #1e40af; }
.sev-count     { font-weight: 400; }

/* ── Individual violation row ── */
.violation-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem;
  border-top: 1px solid var(--color-border);
  transition: background 0.15s;
}
.violation-row:hover { background: var(--color-surface-alt); }

.row-violation { border-left: 3px solid #ef4444; }
.row-warning   { border-left: 3px solid #f59e0b; }
.row-info      { border-left: 3px solid #3b82f6; }

.violation-field {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.field-label {
  font-weight: 500;
  font-size: var(--font-size-base);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.field-id {
  font-size: 0.7rem;
  color: var(--color-text-subtle);
  background: none;
}

.violation-constraint {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.constraint-tag {
  font-size: 0.7rem;
  font-weight: 700;
  font-family: monospace;
  color: var(--color-text-muted);
  background: var(--color-surface-alt);
  padding: 0.1rem 0.35rem;
  border-radius: var(--radius-sm);
  align-self: flex-start;
}

.constraint-msg {
  font-size: var(--font-size-sm);
  color: var(--color-text);
}

.btn-navigate {
  background: var(--color-primary-bg);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  padding: 0.25rem 0.65rem;
  font-size: var(--font-size-sm);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}
.btn-navigate:hover { background: var(--color-primary); color: white; }
.btn-navigate:focus { outline: none; box-shadow: var(--focus-ring); }
</style>
