// Plain data module (no Vue/CSS) so that importing BUILTIN_STANDARDS from
// the library entry point (src/index.js) never pulls App.vue — and its
// global (unscoped) <style> block — into the packaged library bundle.
// App.vue is the standalone demo app; it re-exports this for its own use.
export const BUILTIN_STANDARDS = [
  { id: 'dcat-ap-at',             label: 'DCAT-AP.at' },
  { id: 'dcat-ap-at-easy',        label: 'DCAT-AP.at - Einfacher Modus' }
]
