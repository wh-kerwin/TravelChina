<template>
  <section class="recommend-panel glass-panel">
    <div class="section-head">
      <h2>为你推荐</h2>
      <button type="button">查看更多城市</button>
    </div>

    <div class="recommend-strip">
      <button class="strip-arrow" type="button" aria-label="上一页">‹</button>

      <div class="cards-row" role="list" aria-label="推荐城市">
        <article
          v-for="card in cards"
          :key="card.name"
          class="destination-card"
          :style="{ backgroundImage: card.background }"
          role="listitem"
        >
          <div class="destination-overlay"></div>
          <div class="destination-head">
            <div>
              <h3>{{ card.name }}</h3>
              <p>{{ card.tagline }}</p>
            </div>
            <span class="card-badge">{{ card.status }}</span>
          </div>

          <div class="card-tags">
            <span v-for="tag in card.tags" :key="tag">{{ tag }}</span>
          </div>

          <button type="button">去探索</button>
        </article>
      </div>

      <button class="strip-arrow" type="button" aria-label="下一页">›</button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  cards: {
    type: Array,
    required: true,
  },
})
</script>
