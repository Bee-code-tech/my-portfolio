import { logoSpectrumFragmentBody } from "./logoSpectrumFragment";

const VERTEX_SHADER = `#version 300 es
precision highp float;

in vec2 a_position;
in vec2 a_texCoord;

out vec2 v_uv;

void main() {
  v_uv = a_texCoord;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform float u_time;
uniform vec2 u_resolution;
uniform float u_deltaTime;
uniform float u_pixelRatio;
uniform vec4 u_mousePosition;
uniform float u_mousePointerDown;
uniform float u_mouseHover;
uniform sampler2D u_image_heightmap;

uniform float u_ambient;
uniform float u_angle;
uniform vec4 u_baseColor;
uniform float u_bend;
uniform vec4 u_colorBack;
uniform float u_contour;
uniform float u_deflection;
uniform float u_density;
uniform float u_dispersion;
uniform float u_distort;
uniform float u_distortSpeed;
uniform float u_edge;
uniform float u_exposure;
uniform float u_glow;
uniform float u_grain;
uniform float u_lineFade;
uniform float u_noiseAmount;
uniform float u_noiseScale;
uniform float u_offset;
uniform float u_saturation;
uniform float u_speed;
uniform float u_sweepSpeed;
uniform float u_viscosity;

${logoSpectrumFragmentBody}`;

const SEVORA_FOOTER_UNIFORMS = {
  u_ambient: 0,
  u_angle: 225,
  u_baseColor: [18 / 255, 18 / 255, 24 / 255, 1] as const,
  u_bend: 0.34,
  u_colorBack: [1, 1, 1, 0] as const,
  u_contour: 1,
  u_deflection: 0,
  u_density: 0.08,
  u_dispersion: 0,
  u_distort: 0,
  u_distortSpeed: 1,
  u_edge: 1,
  u_exposure: 1.65,
  u_glow: 0.85,
  u_grain: 0,
  u_lineFade: 0,
  u_noiseAmount: 0.5,
  u_noiseScale: 1.5,
  u_offset: 0.21,
  u_saturation: 1.2,
  u_speed: 0.2,
  u_sweepSpeed: 0,
  u_viscosity: 2,
};

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Failed to create shader");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Unknown shader compile error";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  const program = gl.createProgram();

  if (!program) throw new Error("Failed to create WebGL program");

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? "Unknown program link error";
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
}

function createFullscreenQuad(gl: WebGL2RenderingContext, program: WebGLProgram) {
  const vao = gl.createVertexArray();
  const buffer = gl.createBuffer();

  if (!vao || !buffer) throw new Error("Failed to create WebGL buffers");

  const positions = new Float32Array([
    -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
  ]);
  const texCoords = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);

  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions.byteLength + texCoords.byteLength, gl.STATIC_DRAW);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, positions);
  gl.bufferSubData(gl.ARRAY_BUFFER, positions.byteLength, texCoords);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");

  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, positions.byteLength);

  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return { vao, buffer };
}

function createHeightmapTexture(
  gl: WebGL2RenderingContext,
  heightmap: HTMLCanvasElement,
) {
  const texture = gl.createTexture();
  if (!texture) throw new Error("Failed to create heightmap texture");

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, heightmap);
  gl.bindTexture(gl.TEXTURE_2D, null);

  return texture;
}

type UniformLocations = Record<string, WebGLUniformLocation | null>;

export class LogoSpectrumRenderer {
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram;
  private vao: WebGLVertexArrayObject;
  private buffer: WebGLBuffer;
  private heightmapTexture: WebGLTexture;
  private uniforms: UniformLocations;
  private animationFrame = 0;
  private startTime = performance.now();
  private lastTime = this.startTime;
  private disposed = false;
  private width = 0;
  private height = 0;

  constructor(
    private canvas: HTMLCanvasElement,
    heightmap: HTMLCanvasElement,
  ) {
    const context = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "default",
    });

    if (!context) throw new Error("WebGL2 is not supported");

    this.gl = context;
    this.program = createProgram(this.gl);
    const quad = createFullscreenQuad(this.gl, this.program);
    this.vao = quad.vao;
    this.buffer = quad.buffer;
    this.heightmapTexture = createHeightmapTexture(this.gl, heightmap);

    this.uniforms = {
      u_time: this.gl.getUniformLocation(this.program, "u_time"),
      u_resolution: this.gl.getUniformLocation(this.program, "u_resolution"),
      u_deltaTime: this.gl.getUniformLocation(this.program, "u_deltaTime"),
      u_pixelRatio: this.gl.getUniformLocation(this.program, "u_pixelRatio"),
      u_mousePosition: this.gl.getUniformLocation(this.program, "u_mousePosition"),
      u_mousePointerDown: this.gl.getUniformLocation(this.program, "u_mousePointerDown"),
      u_mouseHover: this.gl.getUniformLocation(this.program, "u_mouseHover"),
      u_image_heightmap: this.gl.getUniformLocation(this.program, "u_image_heightmap"),
      u_ambient: this.gl.getUniformLocation(this.program, "u_ambient"),
      u_angle: this.gl.getUniformLocation(this.program, "u_angle"),
      u_baseColor: this.gl.getUniformLocation(this.program, "u_baseColor"),
      u_bend: this.gl.getUniformLocation(this.program, "u_bend"),
      u_colorBack: this.gl.getUniformLocation(this.program, "u_colorBack"),
      u_contour: this.gl.getUniformLocation(this.program, "u_contour"),
      u_deflection: this.gl.getUniformLocation(this.program, "u_deflection"),
      u_density: this.gl.getUniformLocation(this.program, "u_density"),
      u_dispersion: this.gl.getUniformLocation(this.program, "u_dispersion"),
      u_distort: this.gl.getUniformLocation(this.program, "u_distort"),
      u_distortSpeed: this.gl.getUniformLocation(this.program, "u_distortSpeed"),
      u_edge: this.gl.getUniformLocation(this.program, "u_edge"),
      u_exposure: this.gl.getUniformLocation(this.program, "u_exposure"),
      u_glow: this.gl.getUniformLocation(this.program, "u_glow"),
      u_grain: this.gl.getUniformLocation(this.program, "u_grain"),
      u_lineFade: this.gl.getUniformLocation(this.program, "u_lineFade"),
      u_noiseAmount: this.gl.getUniformLocation(this.program, "u_noiseAmount"),
      u_noiseScale: this.gl.getUniformLocation(this.program, "u_noiseScale"),
      u_offset: this.gl.getUniformLocation(this.program, "u_offset"),
      u_saturation: this.gl.getUniformLocation(this.program, "u_saturation"),
      u_speed: this.gl.getUniformLocation(this.program, "u_speed"),
      u_sweepSpeed: this.gl.getUniformLocation(this.program, "u_sweepSpeed"),
      u_viscosity: this.gl.getUniformLocation(this.program, "u_viscosity"),
    };

    this.resize();
  }

  resize() {
    const { clientWidth, clientHeight } = this.canvas;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(clientWidth * pixelRatio));
    const height = Math.max(1, Math.floor(clientHeight * pixelRatio));

    if (width === this.width && height === this.height) return;

    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  }

  start() {
    const render = (now: number) => {
      if (this.disposed) return;

      this.resize();
      this.draw(now);
      this.animationFrame = window.requestAnimationFrame(render);
    };

    this.animationFrame = window.requestAnimationFrame(render);
  }

  private draw(now: number) {
    const { gl } = this;
    const elapsed = (now - this.startTime) / 1000;
    const delta = (now - this.lastTime) / 1000;
    this.lastTime = now;

    gl.viewport(0, 0, this.width, this.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.heightmapTexture);
    gl.uniform1i(this.uniforms.u_image_heightmap, 0);

    gl.uniform1f(this.uniforms.u_time, elapsed);
    gl.uniform2f(this.uniforms.u_resolution, this.width, this.height);
    gl.uniform1f(this.uniforms.u_deltaTime, delta);
    gl.uniform1f(this.uniforms.u_pixelRatio, window.devicePixelRatio || 1);
    gl.uniform4f(this.uniforms.u_mousePosition, -999, -999, 0, 0);
    gl.uniform1f(this.uniforms.u_mousePointerDown, 0);
    gl.uniform1f(this.uniforms.u_mouseHover, 0);

    gl.uniform1f(this.uniforms.u_ambient, SEVORA_FOOTER_UNIFORMS.u_ambient);
    gl.uniform1f(this.uniforms.u_angle, SEVORA_FOOTER_UNIFORMS.u_angle);
    gl.uniform4fv(this.uniforms.u_baseColor, SEVORA_FOOTER_UNIFORMS.u_baseColor);
    gl.uniform1f(this.uniforms.u_bend, SEVORA_FOOTER_UNIFORMS.u_bend);
    gl.uniform4fv(this.uniforms.u_colorBack, SEVORA_FOOTER_UNIFORMS.u_colorBack);
    gl.uniform1f(this.uniforms.u_contour, SEVORA_FOOTER_UNIFORMS.u_contour);
    gl.uniform1f(this.uniforms.u_deflection, SEVORA_FOOTER_UNIFORMS.u_deflection);
    gl.uniform1f(this.uniforms.u_density, SEVORA_FOOTER_UNIFORMS.u_density);
    gl.uniform1f(this.uniforms.u_dispersion, SEVORA_FOOTER_UNIFORMS.u_dispersion);
    gl.uniform1f(this.uniforms.u_distort, SEVORA_FOOTER_UNIFORMS.u_distort);
    gl.uniform1f(this.uniforms.u_distortSpeed, SEVORA_FOOTER_UNIFORMS.u_distortSpeed);
    gl.uniform1f(this.uniforms.u_edge, SEVORA_FOOTER_UNIFORMS.u_edge);
    gl.uniform1f(this.uniforms.u_exposure, SEVORA_FOOTER_UNIFORMS.u_exposure);
    gl.uniform1f(this.uniforms.u_glow, SEVORA_FOOTER_UNIFORMS.u_glow);
    gl.uniform1f(this.uniforms.u_grain, SEVORA_FOOTER_UNIFORMS.u_grain);
    gl.uniform1f(this.uniforms.u_lineFade, SEVORA_FOOTER_UNIFORMS.u_lineFade);
    gl.uniform1f(this.uniforms.u_noiseAmount, SEVORA_FOOTER_UNIFORMS.u_noiseAmount);
    gl.uniform1f(this.uniforms.u_noiseScale, SEVORA_FOOTER_UNIFORMS.u_noiseScale);
    gl.uniform1f(this.uniforms.u_offset, SEVORA_FOOTER_UNIFORMS.u_offset);
    gl.uniform1f(this.uniforms.u_saturation, SEVORA_FOOTER_UNIFORMS.u_saturation);
    gl.uniform1f(this.uniforms.u_speed, SEVORA_FOOTER_UNIFORMS.u_speed);
    gl.uniform1f(this.uniforms.u_sweepSpeed, SEVORA_FOOTER_UNIFORMS.u_sweepSpeed);
    gl.uniform1f(this.uniforms.u_viscosity, SEVORA_FOOTER_UNIFORMS.u_viscosity);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    gl.bindVertexArray(null);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  dispose() {
    this.disposed = true;
    window.cancelAnimationFrame(this.animationFrame);

    const { gl } = this;
    gl.deleteTexture(this.heightmapTexture);
    gl.deleteBuffer(this.buffer);
    gl.deleteVertexArray(this.vao);
    gl.deleteProgram(this.program);
  }
}
