<template>
  <section class="hero-layout">
    <div class="info-column">
      <section class="status-card frosted-box">
        <h2>城市状态</h2>
        <div class="status-row">
          <span class="status-dot open"></span>
          <span>已开放</span>
        </div>
        <div class="status-row">
          <span class="status-dot locked"></span>
          <span>待开放</span>
        </div>
      </section>

      <section class="tips-card frosted-box">
        <h2>提示</h2>
        <p>点击城市可查看详情与旅行灵感</p>
      </section>
    </div>

    <section class="map-stage" aria-label="地图交互区域">
      <div class="map-canvas-shell">
        <div
          ref="mapViewportRef"
          class="map-viewport"
          @pointerdown="startPan"
          @pointermove="movePan"
          @pointerup="endPan"
          @pointerleave="endPan"
          @pointercancel="endPan"
          @wheel.prevent="handleWheelZoom"
        >
          <div
            class="map-world"
            :style="{
              transform: `translate(${mapState.offsetX}px, ${mapState.offsetY}px) scale(${mapState.scale})`,
            }"
          >
            <canvas
              ref="mapCanvasRef"
              class="map-canvas"
              :width="mapNaturalSize.width"
              :height="mapNaturalSize.height"
              aria-label="中国地图画布"
            ></canvas>

            <div
              v-for="city in pins"
              :key="city.name"
              class="map-pin"
              :class="[city.state, city.size]"
              :style="{ left: city.x, top: city.y }"
            >
              <div v-if="city.tag" class="pin-tag">{{ city.tag }}</div>
              <div class="pin-pill">
                <span v-if="city.state === 'locked'" class="pin-lock">⦿</span>
                <span>{{ city.name }}</span>
              </div>
              <div class="pin-ring"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="island-card">
        <strong>南海诸岛</strong>
        <div class="island-shapes">
          <span
            v-for="n in 10"
            :key="`island-${n}`"
            class="island-shape"
            :style="{
              left: `${12 + ((n * 11) % 60)}%`,
              top: `${18 + ((n * 14) % 58)}%`,
              transform: `rotate(${n * 12}deg)`,
            }"
          ></span>
        </div>
      </div>
    </section>

    <aside class="controls-column">
      <div class="zoom-tools frosted-box">
        <button v-for="tool in zoomTools" :key="tool.label" type="button" @click="tool.action">
          <span>{{ tool.icon }}</span>
          <em>{{ tool.label }}</em>
        </button>
      </div>
    </aside>
  </section>
</template>

<script setup>
import { computed } from "vue"
import { useMapCanvas } from "../composables/useMapCanvas"

defineProps({
  pins: {
    type: Array,
    required: true,
  },
})

const {
  mapCanvasRef,
  mapViewportRef,
  mapNaturalSize,
  mapState,
  handleWheelZoom,
  startPan,
  movePan,
  endPan,
  zoomIn,
  zoomOut,
  resetMap,
} = useMapCanvas()

const zoomTools = computed(() => [
  { icon: "+", label: "放大", action: zoomIn },
  { icon: "−", label: "缩小", action: zoomOut },
  { icon: "◎", label: "复位", action: resetMap },
])
</script>
