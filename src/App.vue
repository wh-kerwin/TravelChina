<template>
  <div class="page">
    <div class="bg"></div>

    <header class="header">
      <h1 class="brand">
        <span class="brand-main">TravelChina</span>
        <span class="brand-sub">赛博旅游中国</span>
      </h1>
      <p class="subtitle">探索千年古韵，感受未来中国</p>
    </header>

    <main class="map-section" aria-label="全国卡通地图3D区域">
        <ThreeChinaMap />
    </main>
  </div>
</template>

<script setup>
import ThreeChinaMap from "./components/ThreeChinaMap.vue";
</script>
