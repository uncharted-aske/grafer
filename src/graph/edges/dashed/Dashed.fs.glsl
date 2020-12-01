#version 300 es
precision highp float;

#pragma glslify: lineColor = require(../shaders/line.fs.glsl)

uniform vec2 uViewportSize;
uniform float uAlpha;
uniform uint uRenderMode;

in vec3 vColor;
in float vDashLength;
in vec2 vProjectedPosition;
in float vProjectedW;

out vec4 fragColor;

void main() {
    if (int(vDashLength) % 2 == 1) {
        discard;
    }
    fragColor = lineColor(vColor, vProjectedPosition, vProjectedW, uViewportSize, uAlpha, uRenderMode);
}