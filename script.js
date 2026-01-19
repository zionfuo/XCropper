// X Cropper JavaScript

const translations = {
  zh: {
    title: "X Cropper",
    upload: "上传",
    uploadImage: "上传图片",
    pasteImage: "粘贴图片",
    select: "选择",
    quad: "四合一",
    quadDesc: "𝕏 的外部预览拼成 2x2 的完整画面",
    duo: "二合一",
    duoDesc: "𝕏 的外部预览拼成 1x2 的完整画面",
    vertical: "垂直长图",
    verticalDesc: "𝕏 的内部浏览拼成 4x1 的完整画面",
    adjust: "调整",
    zoom: "缩放",
    fit: "适配",
    center: "居中",
    rotate: "旋转",
    mirror: "镜像",
    crop: "确认裁切",
    results: "结果",
    download: "下载",
    copy: "复制",
    imagePreview: "图片预览",
    notSupported: "不支持",
    copied: "已复制",
    failed: "失败",
    imported: "已导入",
    noImage: "无图片"
  },
  en: {
    title: "X Cropper",
    upload: "Upload",
    uploadImage: "Upload Image",
    pasteImage: "Paste Image",
    select: "Select",
    quad: "Quad",
    quadDesc: "X external previews combined into 2x2 full frame",
    duo: "Duo",
    duoDesc: "X external previews combined into 1x2 full frame",
    vertical: "Vertical",
    verticalDesc: "X internal browsing combined into 4x1 full frame",
    adjust: "Adjust",
    zoom: "Zoom",
    fit: "Fit",
    center: "Center",
    rotate: "Rotate",
    mirror: "Mirror",
    crop: "Confirm Crop",
    results: "Results",
    download: "Download",
    copy: "Copy",
    imagePreview: "Image Preview",
    notSupported: "Not Supported",
    copied: "Copied",
    failed: "Failed",
    imported: "Imported",
    noImage: "No Image"
  },
  ja: {
    title: "X Cropper",
    upload: "アップロード",
    uploadImage: "画像をアップロード",
    pasteImage: "画像を貼り付け",
    select: "選択",
    quad: "4枚合一",
    quadDesc: "𝕏 の外部プレビューを 2x2 のフルフレームに結合",
    duo: "2枚合一",
    duoDesc: "𝕏 の外部プレビューを 1x2 のフルフレームに結合",
    vertical: "垂直長図",
    verticalDesc: "𝕏 の内部閲覧を 4x1 のフルフレームに結合",
    adjust: "調整",
    zoom: "ズーム",
    fit: "フィット",
    center: "センター",
    rotate: "回転",
    mirror: "ミラー",
    crop: "クロップ確定",
    results: "結果",
    download: "ダウンロード",
    copy: "コピー",
    imagePreview: "画像プレビュー",
    notSupported: "サポートされていません",
    copied: "コピー済み",
    failed: "失敗",
    imported: "インポート済み",
    noImage: "画像なし"
  },
  ko: {
    title: "X Cropper",
    upload: "업로드",
    uploadImage: "이미지 업로드",
    pasteImage: "이미지 붙여넣기",
    select: "선택",
    quad: "4합1",
    quadDesc: "𝕏 외부 미리보기를 2x2 전체 프레임으로 결합",
    duo: "2합1",
    duoDesc: "𝕏 외부 미리보기를 1x2 전체 프레임으로 결합",
    vertical: "수직 롱",
    verticalDesc: "𝕏 내부 브라우징을 4x1 전체 프레임으로 결합",
    adjust: "조정",
    zoom: "줌",
    fit: "맞춤",
    center: "중앙",
    rotate: "회전",
    mirror: "미러",
    crop: "자르기 확인",
    results: "결과",
    download: "다운로드",
    copy: "복사",
    imagePreview: "이미지 미리보기",
    notSupported: "지원되지 않음",
    copied: "복사됨",
    failed: "실패",
    imported: "가져오기 완료",
    noImage: "이미지 없음"
  }
};

const schemes = {
  quad: {
    id: "quad",
    nameKey: "quad",
    cols: 2,
    rows: 2,
    cellW: 257,
    cellH: 144.13,
  },
  duo: {
    id: "duo",
    nameKey: "duo",
    cols: 2,
    rows: 1,
    cellW: 257,
    cellH: 290.25,
  },
  vertical: {
    id: "vertical",
    nameKey: "vertical",
    cols: 1,
    rows: 4,
    cellW: 257,
    cellH: 144.13,
  },
};

// Initialize language from localStorage if available
const savedLanguage = localStorage.getItem('xcropper-language') || 'en';

const state = {
  scheme: schemes.quad,
  language: savedLanguage,
  imageLoaded: false,
  originalImage: null,
  rotation: 0,
  mirror: false,
  imgWidth: 0,
  imgHeight: 0,
  scale: 1,
  minScale: 1,
  maxScale: 3,
  offsetX: 0,
  offsetY: 0,
  dragging: false,
  dragStartX: 0,
  dragStartY: 0,
  dragOriginX: 0,
  dragOriginY: 0,
};

// DOM Elements
const fileInput = document.getElementById("file-input");
const uploadArea = document.getElementById("upload-area");
const selectBtn = document.getElementById("select-btn");
const pasteBtn = document.getElementById("paste-btn");
const languageSelect = document.getElementById("language-select");
const leftPanel = document.querySelector(".panel");
const uploadCard = document.getElementById("upload-card");
const selectionCard = document.getElementById("selection-card");
const adjustCard = document.getElementById("adjust-card");
const stage = document.getElementById("stage");
const stageWrap = document.querySelector(".stage-wrap");
const resultsCard = document.querySelector(".results");
const resultsHeader = document.querySelector(".results-header");
const sourceImage = document.getElementById("source-image");
const zoomRange = document.getElementById("zoom-range");
const zoomValue = document.getElementById("zoom-value");
const fitBtn = document.getElementById("fit-btn");
const centerBtn = document.getElementById("center-btn");
const rotateBtn = document.getElementById("rotate-btn");
const mirrorBtn = document.getElementById("mirror-btn");
const cropBtn = document.getElementById("crop-btn");
const tileGrid = document.getElementById("tile-grid");
const outputGrid = document.getElementById("output-grid");
const uploadTitle = uploadCard.querySelector(".card-title");
const selectionTitle = selectionCard.querySelector(".card-title");
const adjustTitle = adjustCard.querySelector(".card-title");
const resultsTitle = resultsHeader.querySelector(".results-title");
const stagePlaceholder = stage.querySelector(".stage-placeholder");
const zoomLabel = document.querySelector(".controls .control-row span");
const schemeCards = document.querySelectorAll(".scheme-card");

const tiles = [];
let verticalLayoutScheduled = false;
let pendingFit = false;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getGridGap = () => {
  const value = getComputedStyle(stage).getPropertyValue("--grid-gap");
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const updateTranslation = () => {
  const t = translations[state.language];
  document.title = t.title;
  uploadTitle.textContent = t.upload;
  selectBtn.textContent = t.uploadImage;
  pasteBtn.textContent = t.pasteImage;
  selectionTitle.textContent = t.select;
  adjustTitle.textContent = t.adjust;
  cropBtn.textContent = t.crop;
  resultsTitle.textContent = t.results;
  stagePlaceholder.textContent = t.imagePreview;
  zoomLabel.textContent = t.zoom;
  fitBtn.textContent = t.fit;
  centerBtn.textContent = t.center;
  rotateBtn.textContent = t.rotate;
  mirrorBtn.textContent = t.mirror;
  
  schemeCards.forEach((card, index) => {
    const input = card.querySelector('input');
    const schemeName = card.querySelector('.scheme-head span:first-child');
    const schemeDesc = card.querySelector('.scheme-tag');
    const value = input.value;
    if (value === 'quad') {
      schemeName.textContent = t.quad;
      schemeDesc.textContent = t.quadDesc;
    } else if (value === 'duo') {
      schemeName.textContent = t.duo;
      schemeDesc.textContent = t.duoDesc;
    } else if (value === 'vertical') {
      schemeName.textContent = t.vertical;
      schemeDesc.textContent = t.verticalDesc;
    }
  });
};

const getContentMetrics = () => {
  const rect = stage.getBoundingClientRect();
  const gap = getGridGap();
  const { cols, rows } = state.scheme;
  const contentW = rect.width - gap * (cols - 1);
  const contentH = rect.height - gap * (rows - 1);
  const cellW = contentW / cols;
  const cellH = contentH / rows;
  return { rect, gap, cols, rows, contentW, contentH, cellW, cellH };
};

const mapStageToContent = (value, cell, gap, count) => {
  const segment = cell + gap;
  const maxStage = segment * count - gap;
  const clamped = clamp(value, 0, maxStage);
  const index = Math.min(count - 1, Math.floor(clamped / segment));
  const within = clamped - index * segment;
  return index * cell + Math.min(within, cell);
};

const getOutputCardHeightEstimate = (scheme = state.scheme, columnWidth = null) => {
  const gridStyles = getComputedStyle(outputGrid);
  const columns = gridStyles.gridTemplateColumns.split(" ");
  const gridWidth = outputGrid.getBoundingClientRect().width || 0;
  // Properly cap column width to prevent enormous values
  const maxColumnWidth = 200;
  const minColumnWidth = 160;
  const resolvedColumnWidth = Math.min(
    maxColumnWidth,
    Math.max(
      minColumnWidth,
      columnWidth || 
      parseFloat(columns[0]) || 
      (scheme.id === "vertical" ? gridWidth : gridWidth / 2) || 
      160
    )
  );
  const ratio = scheme.cellW / scheme.cellH;

  const tempCard = document.createElement("div");
  tempCard.className = "output-card";
  tempCard.style.position = "absolute";
  tempCard.style.visibility = "hidden";
  tempCard.style.pointerEvents = "none";
  tempCard.style.width = `${resolvedColumnWidth}px`;
  tempCard.style.left = "-9999px";
  tempCard.style.top = "0";

  const tempImg = document.createElement("img");
  tempImg.style.width = "100%";
  tempImg.style.height = "auto";
  tempImg.style.aspectRatio = `${ratio}`;
  tempImg.src = 
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  const meta = document.createElement("div");
  meta.className = "output-meta";
  const btn1 = document.createElement("button");
  btn1.textContent = translations[state.language].download;
  const btn2 = document.createElement("button");
  btn2.textContent = translations[state.language].copy;
  meta.appendChild(btn1);
  meta.appendChild(btn2);

  tempCard.appendChild(tempImg);
  tempCard.appendChild(meta);
  outputGrid.appendChild(tempCard);
  const height = tempCard.getBoundingClientRect().height || 0;
  tempCard.remove();
  
  // Cap the returned height to prevent enormous values
  const maxCardHeight = 200;
  return Math.min(height, maxCardHeight);
};

const getVerticalBaseline = () => {
  // Check if we're on mobile to skip complex calculations
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    // On mobile, return minimal baseline values
    return {
      resultsMinHeight: 160,
      resultsBottom: 0,
      targetPanelHeight: 0,
      targetSelectionHeight: 0
    };
  }
  
  const gridStyles = getComputedStyle(outputGrid);
  const rowGap = parseFloat(gridStyles.rowGap || gridStyles.gap) || 0;
  const resultsStyles = getComputedStyle(resultsCard);
  const resultsPadY = 
    parseFloat(resultsStyles.paddingTop) + parseFloat(resultsStyles.paddingBottom);
  const headerHeight = resultsHeader.getBoundingClientRect().height;
  const gridWidth = outputGrid.getBoundingClientRect().width || 0;
  // Properly cap column width to prevent enormous values
  const columnWidth = Math.min(200, Math.max(160, gridWidth || 160));
  const cardHeight = getOutputCardHeightEstimate(schemes.vertical, columnWidth);
  const stackHeight = 
    cardHeight * schemes.vertical.rows + rowGap * (schemes.vertical.rows - 1);
  const resultsMinHeight = Math.max(
    headerHeight + resultsPadY + stackHeight,
    160
  );
  const resultsTop = resultsCard.getBoundingClientRect().top;
  const panelTop = leftPanel.getBoundingClientRect().top;
  const gap = parseFloat(getComputedStyle(leftPanel).gap) || 0;
  const uploadHeight = uploadCard.getBoundingClientRect().height;
  const adjustHeight = adjustCard.getBoundingClientRect().height;
  const resultsBottom = resultsTop + resultsMinHeight;
  const targetPanelHeight = Math.max(resultsBottom - panelTop, 0);
  const targetSelectionHeight = Math.max(
    targetPanelHeight - uploadHeight - adjustHeight - gap * 2,
    0
  );
  return {
    resultsMinHeight,
    resultsBottom,
    targetPanelHeight,
    targetSelectionHeight,
  };
};

const updateVerticalLayout = () => {
  // Reset all heights first
  stage.style.setProperty("--stage-max-height", "52vh");
  selectionCard.style.removeProperty("min-height");
  leftPanel.style.removeProperty("min-height");
  outputGrid.style.removeProperty("min-height");
  resultsCard.style.removeProperty("min-height");

  // Check if we're on mobile to skip complex vertical layout calculations
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    // On mobile, use simpler layout without forced heights
    return;
  }

  // Only do complex layout calculations for desktop
  const baseline = getVerticalBaseline();
  resultsCard.style.minHeight = `${Math.round(baseline.resultsMinHeight)}px`;
  
  // Limit selection card height to prevent it from being too long
  const maxSelectionHeight = 600;
  const targetSelectionHeight = Math.min(baseline.targetSelectionHeight, maxSelectionHeight);
  selectionCard.style.minHeight = `${Math.round(targetSelectionHeight)}px`;
  
  leftPanel.style.minHeight = `${Math.round(baseline.targetPanelHeight)}px`;

  if (state.scheme.id !== "vertical") {
    return;
  }
  const stageWrapRect = stageWrap.getBoundingClientRect();
  const wrapStyles = getComputedStyle(stageWrap);
  const padY = 
    parseFloat(wrapStyles.paddingTop) + parseFloat(wrapStyles.paddingBottom);
  const borderY = 
    parseFloat(wrapStyles.borderTopWidth) + 
    parseFloat(wrapStyles.borderBottomWidth);
  const maxHeight = Math.max(
    baseline.resultsBottom - stageWrapRect.top - padY - borderY,
    160
  );
  stage.style.setProperty("--stage-max-height", `${Math.round(maxHeight)}px`);
};

const scheduleVerticalLayout = (shouldFit = false) => {
  if (shouldFit) {
    pendingFit = true;
  }
  if (verticalLayoutScheduled) return;
  verticalLayoutScheduled = true;
  window.requestAnimationFrame(() => {
    verticalLayoutScheduled = false;
    updateVerticalLayout();
    if (pendingFit && state.imageLoaded) {
      pendingFit = false;
      fitImageToStage();
    }
  });
};

const setImageLoadedState = (loaded) => {
  state.imageLoaded = loaded;
  stage.dataset.loaded = loaded ? "true" : "false";
  cropBtn.disabled = !loaded;
  rotateBtn.disabled = !loaded;
  mirrorBtn.disabled = !loaded;
};

const renderTiles = () => {
  tileGrid.innerHTML = "";
  tiles.length = 0;
  const { cols, rows } = state.scheme;
  tileGrid.style.setProperty("--cols", cols.toString());
  tileGrid.style.setProperty("--rows", rows.toString());

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cell = document.createElement("div");
      cell.className = "tile-cell";
      if (row === 0 && col === 0) {
        cell.style.borderTopLeftRadius = "var(--stage-radius)";
      }
      if (row === 0 && col === cols - 1) {
        cell.style.borderTopRightRadius = "var(--stage-radius)";
      }
      if (row === rows - 1 && col === 0) {
        cell.style.borderBottomLeftRadius = "var(--stage-radius)";
      }
      if (row === rows - 1 && col === cols - 1) {
        cell.style.borderBottomRightRadius = "var(--stage-radius)";
      }
      const img = document.createElement("img");
      img.className = "tile-image";
      img.alt = "";
      img.draggable = false;
      cell.appendChild(img);
      tileGrid.appendChild(cell);
      tiles.push({ row, col, img });
    }
  }

  if (state.imageLoaded) {
    updateTileSources();
  }
  updateTileTransforms();
};

const setStageRatio = () => {
  const { cols, rows, cellW, cellH } = state.scheme;
  const ratio = (cellW / cellH) * (cols / rows);
  stage.style.setProperty("--stage-ratio", ratio.toString());
  stage.style.setProperty("--cols", cols.toString());
  stage.style.setProperty("--rows", rows.toString());
};

const updateTileSources = () => {
  const src = sourceImage.src;
  tiles.forEach((tile) => {
    tile.img.src = src;
  });
};

const updateTileTransforms = () => {
  if (!tiles.length) return;
  const { cellW, cellH } = getContentMetrics();

  tiles.forEach((tile) => {
    const tileX = tile.col * cellW;
    const tileY = tile.row * cellH;
    tile.img.style.transform = `translate(${state.offsetX - tileX}px, ${state.offsetY - tileY}px) scale(${state.scale})`;
  });
};

const updateZoomUI = () => {
  zoomRange.value = state.scale.toFixed(3);
  zoomValue.textContent = `${state.scale.toFixed(2)}x`;
};

const clampOffsets = () => {
  const { contentW, contentH } = getContentMetrics();
  const imgW = state.imgWidth * state.scale;
  const imgH = state.imgHeight * state.scale;
  const minX = contentW - imgW;
  const minY = contentH - imgH;
  state.offsetX = clamp(state.offsetX, minX, 0);
  state.offsetY = clamp(state.offsetY, minY, 0);
};

const applyTransform = () => {
  sourceImage.style.transform = `translate(${state.offsetX}px, ${state.offsetY}px) scale(${state.scale})`;
  updateTileTransforms();
};

const fitImageToStage = () => {
  const { contentW, contentH } = getContentMetrics();
  state.minScale = Math.max(contentW / state.imgWidth, contentH / state.imgHeight);
  state.maxScale = state.minScale * 3.5;
  state.scale = state.minScale;
  state.offsetX = (contentW - state.imgWidth * state.scale) / 2;
  state.offsetY = (contentH - state.imgHeight * state.scale) / 2;
  clampOffsets();
  zoomRange.min = state.minScale.toFixed(3);
  zoomRange.max = state.maxScale.toFixed(3);
  zoomRange.step = Math.max(state.minScale / 200, 0.001).toFixed(3);
  updateZoomUI();
  applyTransform();
};

const centerImage = () => {
  const { contentW, contentH } = getContentMetrics();
  state.offsetX = (contentW - state.imgWidth * state.scale) / 2;
  state.offsetY = (contentH - state.imgHeight * state.scale) / 2;
  clampOffsets();
  applyTransform();
};

const zoomTo = (newScale, focusX, focusY) => {
  const { rect, gap, cols, rows, cellW, cellH, contentW, contentH } = getContentMetrics();
  const fx = focusX ?? rect.width / 2;
  const fy = focusY ?? rect.height / 2;
  const contentFx = mapStageToContent(fx, cellW, gap, cols);
  const contentFy = mapStageToContent(fy, cellH, gap, rows);
  const imageX = (contentFx - state.offsetX) / state.scale;
  const imageY = (contentFy - state.offsetY) / state.scale;
  state.scale = clamp(newScale, state.minScale, state.maxScale);
  state.offsetX = clamp(contentFx - imageX * state.scale, contentW - state.imgWidth * state.scale, 0);
  state.offsetY = clamp(contentFy - imageY * state.scale, contentH - state.imgHeight * state.scale, 0);
  clampOffsets();
  applyTransform();
  updateZoomUI();
};

const setOutputEmpty = () => {
  outputGrid.innerHTML = '<div class="output-empty" aria-hidden="true"></div>';
};

const updateOutputLayout = () => {
  outputGrid.classList.toggle("vertical-stack", state.scheme.id === "vertical");
};

const updateMirrorLabel = () => {
  mirrorBtn.textContent = translations[state.language].mirror;
};

const setSourceImage = (src) => {
  sourceImage.onload = () => {
    state.imgWidth = sourceImage.naturalWidth;
    state.imgHeight = sourceImage.naturalHeight;
    setImageLoadedState(true);
    updateMirrorLabel();
    updateTileSources();
    scheduleVerticalLayout(true);
    setOutputEmpty();
  };
  sourceImage.src = src;
};

const applyRotation = () => {
  if (!state.originalImage) return;
  const angle = (state.rotation + 360) % 360;
  const radians = (angle * Math.PI) / 180;
  const swap = angle % 180 !== 0;
  const canvas = document.createElement("canvas");
  canvas.width = swap ? state.originalImage.height : state.originalImage.width;
  canvas.height = swap ? state.originalImage.width : state.originalImage.height;
  const ctx = canvas.getContext("2d");
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(radians);
  ctx.scale(state.mirror ? -1 : 1, 1);
  ctx.drawImage(
    state.originalImage,
    -state.originalImage.width / 2,
    -state.originalImage.height / 2
  );
  setSourceImage(canvas.toDataURL("image/png"));
};

const rotateBy = (delta) => {
  if (!state.originalImage) return;
  state.rotation = (state.rotation + delta + 360) % 360;
  applyRotation();
};

const copyImage = async (dataUrl, button) => {
  const t = translations[state.language];
  if (!navigator.clipboard || !window.ClipboardItem) {
    button.textContent = t.notSupported;
    setTimeout(() => {
      button.textContent = t.copy;
    }, 1200);
    return;
  }

  try {
    const blob = await (await fetch(dataUrl)).blob();
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
    button.textContent = t.copied;
    setTimeout(() => {
      button.textContent = t.copy;
    }, 1200);
  } catch (error) {
    button.textContent = t.failed;
    setTimeout(() => {
      button.textContent = t.copy;
    }, 1200);
  }
};

const drawSlices = () => {
  if (!state.imageLoaded) return;
  const { cols, rows, cellW, cellH } = getContentMetrics();
  const t = translations[state.language];
  outputGrid.innerHTML = "";

  let index = 0;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      index += 1;
      const sx = (col * cellW - state.offsetX) / state.scale;
      const sy = (row * cellH - state.offsetY) / state.scale;
      const sw = cellW / state.scale;
      const sh = cellH / state.scale;
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(sw));
      canvas.height = Math.max(1, Math.round(sh));
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        sourceImage,
        sx,
        sy,
        sw,
        sh,
        0,
        0,
        canvas.width,
        canvas.height
      );
      const dataUrl = canvas.toDataURL("image/png");

      const card = document.createElement("div");
      card.className = "output-card";
      const img = document.createElement("img");
      img.src = dataUrl;
      img.alt = `${t[state.scheme.nameKey]} 切片 ${index}`;
      img.style.aspectRatio = `${canvas.width} / ${canvas.height}`;
      const meta = document.createElement("div");
      meta.className = "output-meta";
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `xpost-${state.scheme.id}-${index}.png`;
      link.textContent = t.download;
      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.textContent = t.copy;
      copyBtn.addEventListener("click", () => {
        copyImage(dataUrl, copyBtn);
      });
      meta.appendChild(link);
      meta.appendChild(copyBtn);
      card.appendChild(img);
      card.appendChild(meta);
      outputGrid.appendChild(card);
    }
  }
};

const loadFile = (file) => {
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(url);
    state.originalImage = img;
    state.rotation = 0;
    state.mirror = false;
    applyRotation();
  };
  img.src = url;
};

const updatePasteLabel = (text) => {
  pasteBtn.textContent = text;
  window.clearTimeout(pasteBtn._timer);
  pasteBtn._timer = window.setTimeout(() => {
    pasteBtn.textContent = translations[state.language].pasteImage;
  }, 1200);
};

const pasteFromClipboard = async () => {
  const t = translations[state.language];
  if (!navigator.clipboard || !navigator.clipboard.read) {
    updatePasteLabel(t.notSupported);
    return;
  }

  try {
    const items = await navigator.clipboard.read();
    for (const item of items) {
      const type = item.types.find((itemType) => itemType.startsWith("image/"));
      if (type) {
        const blob = await item.getType(type);
        const file = new File([blob], "clipboard.png", { type });
        loadFile(file);
        updatePasteLabel(t.imported);
        return;
      }
    }
    updatePasteLabel(t.noImage);
  } catch (error) {
    updatePasteLabel(t.failed);
  }
};

// Event Listeners
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  loadFile(file);
});

selectBtn.addEventListener("click", () => {
  fileInput.click();
});

uploadArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  uploadArea.classList.add("dragging");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("dragging");
});

uploadArea.addEventListener("drop", (event) => {
  event.preventDefault();
  uploadArea.classList.remove("dragging");
  const file = event.dataTransfer.files[0];
  loadFile(file);
});

document.addEventListener("paste", (event) => {
  const items = event.clipboardData?.items;
  if (!items) return;
  for (const item of items) {
    if (item.kind === "file" && item.type.startsWith("image/")) {
      const file = item.getAsFile();
      loadFile(file);
      break;
    }
  }
});

pasteBtn.addEventListener("click", () => {
  pasteFromClipboard();
});

// Set initial language select value
languageSelect.value = state.language;

languageSelect.addEventListener("change", (event) => {
  state.language = event.target.value;
  localStorage.setItem('xcropper-language', state.language);
  updateTranslation();
});

document.querySelectorAll('input[name="scheme"]').forEach((input) => {
  input.addEventListener("change", (event) => {
    const value = event.target.value;
    state.scheme = schemes[value];
    setStageRatio();
    renderTiles();
    updateOutputLayout();
    if (state.imageLoaded) {
      scheduleVerticalLayout(true);
      setOutputEmpty();
    } else {
      scheduleVerticalLayout();
    }
  });
});

zoomRange.addEventListener("input", (event) => {
  const value = parseFloat(event.target.value);
  zoomTo(value);
});

fitBtn.addEventListener("click", () => {
  if (!state.imageLoaded) return;
  fitImageToStage();
});

centerBtn.addEventListener("click", () => {
  if (!state.imageLoaded) return;
  centerImage();
});

rotateBtn.addEventListener("click", () => {
  rotateBy(90);
});

mirrorBtn.addEventListener("click", () => {
  state.mirror = !state.mirror;
  updateMirrorLabel();
  applyRotation();
});

cropBtn.addEventListener("click", () => {
  drawSlices();
});

stage.addEventListener("pointerdown", (event) => {
  if (!state.imageLoaded) return;
  state.dragging = true;
  state.dragStartX = event.clientX;
  state.dragStartY = event.clientY;
  state.dragOriginX = state.offsetX;
  state.dragOriginY = state.offsetY;
  stage.setPointerCapture(event.pointerId);
});

stage.addEventListener("pointermove", (event) => {
  if (!state.dragging) return;
  const dx = event.clientX - state.dragStartX;
  const dy = event.clientY - state.dragStartY;
  state.offsetX = state.dragOriginX + dx;
  state.offsetY = state.dragOriginY + dy;
  clampOffsets();
  applyTransform();
});

stage.addEventListener("pointerup", (event) => {
  state.dragging = false;
  stage.releasePointerCapture(event.pointerId);
});

stage.addEventListener("pointerleave", () => {
  state.dragging = false;
});

stage.addEventListener(
  "wheel",
  (event) => {
    if (!state.imageLoaded) return;
    event.preventDefault();
    const delta = -event.deltaY * 0.001;
    const nextScale = state.scale * (1 + delta);
    const rect = stage.getBoundingClientRect();
    const focusX = event.clientX - rect.left;
    const focusY = event.clientY - rect.top;
    zoomTo(nextScale, focusX, focusY);
  },
  { passive: false }
);

window.addEventListener("resize", () => {
  scheduleVerticalLayout(state.imageLoaded);
});

// Initialize
updateTranslation();
setStageRatio();
renderTiles();
updateOutputLayout();
scheduleVerticalLayout();
setOutputEmpty();