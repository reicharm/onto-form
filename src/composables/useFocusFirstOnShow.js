import { nextTick, onMounted, watch } from 'vue'

// Focuses the first element matching `selectors` (tried in order) inside
// panelEl. With `show`, refocuses each time it becomes truthy (for modals
// that stay mounted and toggle visibility); without it, focuses once on mount.
export function useFocusFirstOnShow(panelEl, { selectors = ['button'], show } = {}) {
  async function focusFirst() {
    await nextTick()
    const el = panelEl.value
    if (!el) return
    for (const selector of selectors) {
      const target = el.querySelector(selector)
      if (target) { target.focus(); return }
    }
  }

  if (show) {
    watch(show, open => { if (open) focusFirst() })
  } else {
    onMounted(focusFirst)
  }
}
