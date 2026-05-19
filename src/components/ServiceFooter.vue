<template>
  <footer class="service-bar glass-panel">
    <div class="service-grid">
      <article v-for="feature in items" :key="feature.title" class="service-item">
        <div class="service-icon">{{ feature.icon }}</div>
        <div class="service-copy">
          <strong>{{ feature.title }}</strong>
          <span>{{ feature.desc }}</span>
        </div>
      </article>
    </div>

    <div class="assistant-footer">
      <div class="assistant-footer-bot"></div>
      <div class="assistant-footer-copy">
        <strong>嗨！我是小智</strong>
        <span>点击我，帮你规划完美行程</span>
      </div>
      <button type="button">›</button>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>
