<template>
  <div class="uri-view">
    <template v-if="Array.isArray(modelValue)">
      <a
        v-for="(uri, i) in modelValue"
        :key="i"
        :href="uri"
        target="_blank"
        rel="noopener noreferrer"
        class="uri-link"
      >{{ shorten(uri) }}</a>
    </template>
    <a
      v-else-if="modelValue"
      :href="modelValue"
      target="_blank"
      rel="noopener noreferrer"
      class="uri-link"
    >{{ shorten(modelValue) }}</a>
  </div>
</template>

<script setup>
defineProps({
  field: { type: Object, required: true },
  modelValue: { required: true },
  lang: { type: String, required: true },
})

function shorten(uri) {
  if (!uri) return uri
  if (uri.length < 60) return uri
  try {
    const u = new URL(uri)
    const parts = u.pathname.split('/').filter(Boolean)
    return parts.length ? parts[parts.length - 1] : uri
  } catch {
    return uri
  }
}
</script>

<style scoped>
.uri-view {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.uri-link {
  color: var(--color-primary);
  word-break: break-all;
  text-decoration: none;
}
.uri-link:hover {
  text-decoration: underline;
}
</style>
