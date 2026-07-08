const MAX_HEIGHTMAP_SIDE = 1024;

type ImageSource = {
  source: CanvasImageSource;
  width: number;
  height: number;
};

function getImageSource(
  element: HTMLCanvasElement | HTMLImageElement,
): ImageSource | undefined {
  if (element instanceof HTMLImageElement) {
    const { naturalWidth: width, naturalHeight: height } = element;
    return width > 0 && height > 0 ? { source: element, width, height } : undefined;
  }

  const { width, height } = element;
  return width > 0 && height > 0
    ? { source: element, width, height }
    : undefined;
}

function relaxDepthField(
  entries: Int32Array,
  depth: Float32Array,
  keep: number,
  spread: number,
  floor: number,
) {
  for (let index = 0; index < entries.length; index += 5) {
    const center = entries[index] ?? 0;
    const up = entries[index + 1] ?? -1;
    const down = entries[index + 2] ?? -1;
    const left = entries[index + 3] ?? -1;
    const right = entries[index + 4] ?? -1;

    const neighbors =
      (up >= 0 ? (depth[up] ?? 0) : 0) +
      (down >= 0 ? (depth[down] ?? 0) : 0) +
      (left >= 0 ? (depth[left] ?? 0) : 0) +
      (right >= 0 ? (depth[right] ?? 0) : 0);

    depth[center] = keep * (depth[center] ?? 0) + spread * (floor + neighbors);
  }
}

function computeDepthField(mask: Uint8Array, width: number, height: number) {
  const total = width * height;
  const depth = new Float32Array(total);
  const keep = 1 - 1.95;
  const spread = 1.95 / 4;
  const floor = 0.01;
  const even: number[] = [];
  const odd: number[] = [];

  for (let index = 0; index < total; index += 1) {
    if (mask[index] === 0) continue;

    const x = index % width;
    const y = Math.floor(index / width);
    const bucket = (x + y) % 2 === 0 ? even : odd;

    bucket.push(
      index,
      y > 0 ? index - width : -1,
      y < height - 1 ? index + width : -1,
      x > 0 ? index - 1 : -1,
      x < width - 1 ? index + 1 : -1,
    );
  }

  for (let pass = 0; pass < 50; pass += 1) {
    relaxDepthField(new Int32Array(even), depth, keep, spread, floor);
    relaxDepthField(new Int32Array(odd), depth, keep, spread, floor);
  }

  return depth;
}

export function createLogoHeightmap(
  sourceElement: HTMLCanvasElement | HTMLImageElement,
): HTMLCanvasElement | undefined {
  const source = getImageSource(sourceElement);
  if (!source) return undefined;

  let scale = MAX_HEIGHTMAP_SIDE / Math.min(source.width, source.height);
  const maxPixels = MAX_HEIGHTMAP_SIDE * MAX_HEIGHTMAP_SIDE;
  const scaledPixels = source.width * scale * (source.height * scale);

  if (scaledPixels > maxPixels) {
    scale *= Math.sqrt(maxPixels / scaledPixels);
  }

  const width = Math.max(1, Math.round(source.width * scale));
  const height = Math.max(1, Math.round(source.height * scale));

  const raster = document.createElement("canvas");
  raster.width = width;
  raster.height = height;

  const rasterContext = raster.getContext("2d");
  if (!rasterContext) return undefined;

  rasterContext.drawImage(source.source, 0, 0, width, height);

  const pixels = rasterContext.getImageData(0, 0, width, height).data;
  const total = width * height;
  const mask = new Uint8Array(total);

  for (let index = 0; index < total; index += 1) {
    mask[index] = (pixels[index * 4 + 3] ?? 0) > 0 ? 1 : 0;
  }

  const interior = new Uint8Array(total);
  for (let index = 0; index < total; index += 1) {
    if (mask[index] === 0) continue;

    const x = index % width;
    const y = Math.floor(index / width);

    if (x === 0 || x === width - 1 || y === 0 || y === height - 1) continue;

    let touchesOutside = false;
    for (let offsetY = -1; offsetY <= 1 && !touchesOutside; offsetY += 1) {
      for (let offsetX = -1; offsetX <= 1 && !touchesOutside; offsetX += 1) {
        if (offsetX === 0 && offsetY === 0) continue;
        if (mask[(y + offsetY) * width + (x + offsetX)] === 0) {
          touchesOutside = true;
        }
      }
    }

    if (!touchesOutside) interior[index] = 1;
  }

  const depthField = computeDepthField(mask, width, height);
  let depthMax = 0;

  for (let index = 0; index < total; index += 1) {
    const value = depthField[index] ?? 0;
    if (value > depthMax) depthMax = value;
  }

  const encoded = document.createElement("canvas");
  encoded.width = width;
  encoded.height = height;

  const encodedContext = encoded.getContext("2d");
  if (!encodedContext) return undefined;

  const imageData = encodedContext.createImageData(width, height);

  for (let index = 0; index < total; index += 1) {
    const normalizedDepth = depthMax > 0 ? (depthField[index] ?? 0) / depthMax : 0;

    imageData.data[index * 4] = Math.round(normalizedDepth * 255);
    imageData.data[index * 4 + 1] = 255 - (pixels[index * 4 + 3] ?? 0);
    imageData.data[index * 4 + 2] = mask[index] ? 255 : 0;
    imageData.data[index * 4 + 3] = 255;
  }

  encodedContext.putImageData(imageData, 0, 0);

  const heightmap = document.createElement("canvas");
  heightmap.width = source.width;
  heightmap.height = source.height;

  const heightmapContext = heightmap.getContext("2d");
  if (!heightmapContext) return undefined;

  heightmapContext.imageSmoothingEnabled = true;
  heightmapContext.drawImage(encoded, 0, 0, source.width, source.height);

  return heightmap;
}

export function createTextSourceImage(
  text: string,
  fontFamily: string,
  width = 2200,
  height = 280,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) return canvas;

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#121218";

  const fontSize = Math.round(height * 0.88);
  context.font = `600 ${fontSize}px ${fontFamily}`;
  context.textBaseline = "alphabetic";
  context.textAlign = "center";

  const horizontalPadding = width * 0.015;
  const availableWidth = width - horizontalPadding * 2;
  const naturalWidth = context.measureText(text).width;
  const scaleX = availableWidth / Math.max(naturalWidth, 1);
  const baselineY = height * 0.9;

  context.save();
  context.translate(width / 2, baselineY);
  context.scale(scaleX, 1);
  context.fillText(text, 0, 0);
  context.restore();

  return canvas;
}

export function resolveHeadingFontFamily() {
  if (typeof window === "undefined") {
    return '"Stack Sans Notch", sans-serif';
  }

  const stackSans = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-stack-sans-notch")
    .trim();

  return stackSans || '"Stack Sans Notch", sans-serif';
}
