<template>
  <aside class="sidebar-shell" :class="{ open }">
    <div class="sidebar glass-panel">
      <button
        class="sidebar-close-btn"
        type="button"
        aria-label="关闭菜单"
        @click="$emit('close')"
      >
        <span class="i-lucide-x"></span>
      </button>

      <section class="assistant-card">
        <div class="assistant-avatar">
          <div class="avatar-face"></div>
        </div>
        <div class="assistant-copy">
          <strong>AI 导游小智</strong>
          <span>为你定制行程</span>
        </div>
      </section>

      <nav class="menu" aria-label="主导航">
        <button
          v-for="item in items"
          :key="item.label"
          class="menu-item"
          :class="{ active: item.active }"
          type="button"
          @click="$emit('close')"
        >
          <span class="menu-icon" aria-hidden="true">{{ item.icon }}</span>
          <span class="menu-label">{{ item.label }}</span>
        </button>
      </nav>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  open: {
    type: Boolean,
    default: false,
  },
})

defineEmits(["close"])
</script>
