import { ref, shallowReadonly } from 'vue';
import { debounce } from '@mono-pack/utils/src/index';

function requireAll(modules) {
  return modules;
}

function useResponsiveRem(width) {
  const designWidth = width ?? 1920;
  const remScale = ref(1);
  function setRem() {
    const docEl = document.documentElement;
    if (!docEl) return;
    const viewportWidth = docEl.clientWidth;
    if (!viewportWidth) return;
    const scale = viewportWidth / designWidth;
    const dpr = window.devicePixelRatio || 1;
    const baseFontSize = 192 * scale * dpr;
    try {
      docEl.style.fontSize = `${baseFontSize}px`;
      remScale.value = scale;
    } catch (error) {
      console.error("\u8BBE\u7F6E REM \u5B57\u4F53\u5927\u5C0F\u5931\u8D25", error);
    }
  }
  const debouncedSetRem = debounce(setRem, 200);
  function bindEvents() {
    window.removeEventListener("resize", debouncedSetRem);
    window.addEventListener("resize", debouncedSetRem);
    window.removeEventListener("pageshow", handlePageShow);
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("visibilitychange", handleVisibilityChange);
  }
  function handlePageShow(e) {
    if (e.persisted) {
      debouncedSetRem();
    }
  }
  function handleVisibilityChange() {
    if (document.visibilityState === "visible") {
      debouncedSetRem();
    }
  }
  function destroyResponsiveRem() {
    if (debouncedSetRem) {
      window.removeEventListener("resize", debouncedSetRem);
    }
    if (handlePageShow) {
      window.removeEventListener("pageshow", handlePageShow);
    }
    if (handleVisibilityChange) {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }
  bindEvents();
  debouncedSetRem();
  return {
    remScale: shallowReadonly(remScale),
    destroyResponsiveRem
  };
}

export { requireAll, useResponsiveRem };
