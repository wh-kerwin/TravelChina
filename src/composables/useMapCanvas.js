import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from "vue"
import mapImageUrl from "../assets/map.png"

const mapNaturalSize = { width: 1468, height: 1125 }

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function useMapCanvas() {
  const mapCanvasRef = ref(null)
  const mapViewportRef = ref(null)

  const mapState = reactive({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  })

  const panState = reactive({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  })

  let mapImage = null
  let resizeObserver = null

  function fitMapToViewport() {
    const viewport = mapViewportRef.value
    if (!viewport) return

    const viewportWidth = viewport.clientWidth
    const viewportHeight = viewport.clientHeight
    if (!viewportWidth || !viewportHeight) return

    const scaleX = viewportWidth / mapNaturalSize.width
    const scaleY = viewportHeight / mapNaturalSize.height
    const nextScale = Math.min(scaleX, scaleY) * 0.9

    mapState.scale = clamp(Number(nextScale.toFixed(3)), 0.55, 1.2)
    mapState.offsetX =
      (viewportWidth - mapNaturalSize.width * mapState.scale) / 2 + viewportWidth * 0.015
    mapState.offsetY =
      (viewportHeight - mapNaturalSize.height * mapState.scale) / 2 + viewportHeight * 0.025
  }

  function drawMapCanvas() {
    const canvas = mapCanvasRef.value
    if (!canvas || !mapImage) return

    const context = canvas.getContext("2d")
    if (!context) return

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.save()
    context.shadowColor = "rgba(76, 236, 255, 0.32)"
    context.shadowBlur = 28
    context.drawImage(mapImage, 0, 0, canvas.width, canvas.height)
    context.restore()
  }

  function loadMapImage() {
    mapImage = new Image()
    mapImage.crossOrigin = "anonymous"
    mapImage.src = mapImageUrl
    mapImage.onload = () => {
      drawMapCanvas()
      nextTick(() => {
        fitMapToViewport()
      })
    }
  }

  function zoomBy(delta, anchorX, anchorY) {
    const viewport = mapViewportRef.value
    if (!viewport) return

    const rect = viewport.getBoundingClientRect()
    const pivotX = anchorX ?? rect.left + rect.width / 2
    const pivotY = anchorY ?? rect.top + rect.height / 2
    const localX = pivotX - rect.left
    const localY = pivotY - rect.top

    const oldScale = mapState.scale
    const nextScale = clamp(Number((oldScale + delta).toFixed(3)), 0.55, 1.75)
    if (nextScale === oldScale) return

    const ratio = nextScale / oldScale
    mapState.offsetX = localX - (localX - mapState.offsetX) * ratio
    mapState.offsetY = localY - (localY - mapState.offsetY) * ratio
    mapState.scale = nextScale
  }

  function zoomIn() {
    zoomBy(0.12)
  }

  function zoomOut() {
    zoomBy(-0.12)
  }

  function resetMap() {
    fitMapToViewport()
  }

  function handleWheelZoom(event) {
    const delta = event.deltaY > 0 ? -0.08 : 0.08
    zoomBy(delta, event.clientX, event.clientY)
  }

  function startPan(event) {
    if (event.target !== mapViewportRef.value && event.target !== mapCanvasRef.value) return

    panState.active = true
    panState.pointerId = event.pointerId
    panState.startX = event.clientX
    panState.startY = event.clientY
    panState.originX = mapState.offsetX
    panState.originY = mapState.offsetY
    mapViewportRef.value?.setPointerCapture(event.pointerId)
  }

  function movePan(event) {
    if (!panState.active || panState.pointerId !== event.pointerId) return

    mapState.offsetX = panState.originX + (event.clientX - panState.startX)
    mapState.offsetY = panState.originY + (event.clientY - panState.startY)
  }

  function endPan(event) {
    if (!panState.active) return
    if (event.pointerId != null && panState.pointerId !== event.pointerId) return

    panState.active = false
    panState.pointerId = null
  }

  onMounted(() => {
    loadMapImage()
    nextTick(() => {
      fitMapToViewport()
    })

    if (typeof ResizeObserver !== "undefined" && mapViewportRef.value) {
      resizeObserver = new ResizeObserver(() => {
        fitMapToViewport()
      })
      resizeObserver.observe(mapViewportRef.value)
    } else {
      window.addEventListener("resize", fitMapToViewport)
    }
  })

  onBeforeUnmount(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
    } else {
      window.removeEventListener("resize", fitMapToViewport)
    }
  })

  return {
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
  }
}
