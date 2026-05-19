<template>
  <div class="travel-home">
    <div
      class="sidebar-overlay"
      :class="{ visible: sidebarOpen }"
      @click="sidebarOpen = false"
    ></div>
    <AppSidebar
      :items="menuItems"
      :open="sidebarOpen"
      @close="sidebarOpen = false"
    />

    <header class="topbar">
      <div class="brand-block">
        <div class="brand-line">
          <button
            class="mobile-menu-btn"
            type="button"
            aria-label="打开菜单"
            @click="sidebarOpen = true"
          >
            <span class="i-lucide-menu"></span>
          </button>
          <h1>Travel<span>China</span></h1>
          <p>☁️游中国</p>
          <i class="brand-star" aria-hidden="true"></i>
        </div>
        <p class="brand-tagline">探索千年古韵，感受未来中国</p>
      </div>

      <div class="topbar-actions">
        <label class="search-box">
          <span class="search-icon" aria-hidden="true">⌕</span>
          <input type="text" placeholder="搜索城市 / 景点 / 体验" />
        </label>

        <button class="icon-button" type="button" aria-label="通知">
          <span aria-hidden="true">◌</span>
          <b>3</b>
        </button>

        <button class="profile-button" type="button">
          <span class="profile-avatar"></span>
          <span>游客</span>
          <small aria-hidden="true">⌄</small>
        </button>
      </div>
    </header>

    <main id="main-content" class="page-shell">
      <MapCanvasSection :pins="cityPins" />
      <DestinationCards :cards="destinationCards" />
      <ServiceFooter :items="features" />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue"
import AppSidebar from "./components/AppSidebar.vue"
import DestinationCards from "./components/DestinationCards.vue"
import MapCanvasSection from "./components/MapCanvasSection.vue"
import ServiceFooter from "./components/ServiceFooter.vue"
import { cityPins, destinationCards, features, menuItems } from "./data/travelData"

const sidebarOpen = ref(false)
</script>
