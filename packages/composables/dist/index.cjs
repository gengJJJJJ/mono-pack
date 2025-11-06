"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  useViewportScale: () => useViewportScale
});
module.exports = __toCommonJS(index_exports);

// src/use-viewport-scale/index.ts
var import_vue = require("vue");
var import_utils = require("@gengjjjjj/utils");
var DEFAULT_OPTIONS = {
  designWidth: 1920,
  baseFontSizeAtDesign: 192,
  // 设计稿宽度下 1rem 对应的 px 值（通常 = designWidth / 10）
  respectDPR: true,
  // 是否考虑设备像素比（高分屏适配）
  debounceDelay: 150,
  // 防抖延迟（ms）
  autoDestroy: true
  // 是否在组件卸载时自动销毁（仅 Vue 组件内使用时有效）
};
function useViewportScale(options = {}, _window = typeof window !== "undefined" ? window : null, _document = typeof document !== "undefined" ? document : null) {
  if (!_window || !_document) {
    return {
      remScale: (0, import_vue.shallowReadonly)((0, import_vue.ref)(1)),
      currentFontSize: (0, import_vue.shallowReadonly)((0, import_vue.ref)(16)),
      update: () => {
      },
      destroy: () => {
      }
    };
  }
  const {
    designWidth = DEFAULT_OPTIONS.designWidth,
    baseFontSizeAtDesign = DEFAULT_OPTIONS.baseFontSizeAtDesign,
    respectDPR = DEFAULT_OPTIONS.respectDPR,
    debounceDelay = DEFAULT_OPTIONS.debounceDelay,
    autoDestroy = DEFAULT_OPTIONS.autoDestroy
  } = options;
  const remScale = (0, import_vue.ref)(1);
  const currentFontSize = (0, import_vue.ref)(baseFontSizeAtDesign);
  const docEl = document.documentElement;
  if (!docEl) {
    console.warn("[useViewportScale ] document.documentElement not found");
    return {
      remScale: (0, import_vue.shallowReadonly)(remScale),
      currentFontSize: (0, import_vue.shallowReadonly)(currentFontSize),
      update: () => {
      },
      destroy: () => {
      }
    };
  }
  function setRem() {
    try {
      const viewportWidth = docEl.clientWidth;
      if (!viewportWidth) return;
      const scale = viewportWidth / designWidth;
      const dpr = respectDPR ? _window.devicePixelRatio || 1 : 1;
      let fontSize = baseFontSizeAtDesign * scale * dpr;
      fontSize = Math.max(fontSize, 12);
      if (isNaN(fontSize) || fontSize <= 0) return;
      docEl.style.fontSize = `${fontSize}px`;
      remScale.value = scale;
      currentFontSize.value = fontSize;
    } catch (error) {
      console.error("\u8BBE\u7F6E REM \u5B57\u4F53\u5927\u5C0F\u5931\u8D25", error);
    }
  }
  const debouncedSetRem = (0, import_utils.debounce)(() => {
    requestAnimationFrame(setRem);
  }, debounceDelay);
  function handlePageShow(e) {
    if (e.persisted) debouncedSetRem();
  }
  function handleVisibilityChange() {
    if (_document.visibilityState === "visible") {
      debouncedSetRem();
    }
  }
  function bindEvents() {
    _window.addEventListener("resize", debouncedSetRem, { passive: true });
    _window.addEventListener("pageshow", handlePageShow, { passive: true });
    _document.addEventListener("visibilitychange", handleVisibilityChange);
  }
  function unbindEvents() {
    _window.removeEventListener("resize", debouncedSetRem);
    _window.removeEventListener("pageshow", handlePageShow);
    _document.removeEventListener("visibilitychange", handleVisibilityChange);
  }
  bindEvents();
  debouncedSetRem();
  if (autoDestroy && typeof import_vue.onUnmounted === "function") {
    (0, import_vue.onUnmounted)(() => {
      unbindEvents();
    });
  }
  return {
    remScale: (0, import_vue.shallowReadonly)(remScale),
    currentFontSize: (0, import_vue.shallowReadonly)(currentFontSize),
    update: debouncedSetRem,
    // 暴露手动触发接口
    destroy: unbindEvents
    // 手动销毁（适用于非组件场景）
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useViewportScale
});
