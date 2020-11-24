#version 300 es

layout(location=0) in uint aSourceIndex;
layout(location=1) in uint aTargetIndex;
layout(location=2) in uint aSourceColor;
layout(location=3) in uint aTargetColor;

uniform sampler2D uGraphPoints;

out vec3 vSource;
out vec3 vTarget;
flat out uint vSourceColor;
flat out uint vTargetColor;

vec4 getValueByIndexFromTexture(sampler2D tex, int index) {
    int texWidth = textureSize(tex, 0).x;
    int col = index % texWidth;
    int row = index / texWidth;
    return texelFetch(tex, ivec2(col, row), 0);
}

void main() {
    vec4 source = getValueByIndexFromTexture(uGraphPoints, int(aSourceIndex));
    vSource = source.xyz;

    vec4 target = getValueByIndexFromTexture(uGraphPoints, int(aTargetIndex));
    vTarget = target.xyz;

    vSourceColor = aSourceColor;
    vTargetColor = aTargetColor;
}
