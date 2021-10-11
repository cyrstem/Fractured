
#version 150
#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2DRect u_tex0;

uniform vec3 y_noise[100];
in vec2 vertTexCoord;

uniform  float u_colorFactor;

out vec4 outputColor;
float random (vec2 st) {
    return fract(sin(dot(st.xy,
       vec2(2000.9898,78.233)))*
        43758.5453123);
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}


// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(9.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}


float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}
 
void main() {
   vec2 st = gl_FragCoord.xy/u_resolution.xy;
   // st.y = 1.-st.y; // invert y to draw normally per openFrameworks
	  st = u_resolution; // de-normalize coords
  //modifica tan  to cos different aproach 
    vec2 translate = scale( vec2(cos(u_time)) ) *st;
    st += translate *1000.05;
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
  //last value change for 1 to 100 more distorcion 
  float drift = cos(u_time) / random(ipos)*100;

  float r = texture(u_tex0, vec2(gl_FragCoord.x - drift + y_noise[int(gl_FragCoord.y)].r, (u_resolution.y + gl_FragCoord.y))).r;
  float g = texture(u_tex0, vec2(gl_FragCoord.x + drift - y_noise[int(gl_FragCoord.y)].g, (u_resolution.y - gl_FragCoord.y))).g;
  float b = texture(u_tex0, vec2(gl_FragCoord.x - drift / y_noise[int(gl_FragCoord.y)].b, (u_resolution.y - gl_FragCoord.y))).b;


vec2 pos = vec2(st* random(fpos));

    // Use the noise function
    float n = noise(pos);
  
  vec3 color = vec3(r,g,b);
  //float grey =0.021 *color.r +0.91 *color.g +0.07 * color.b;

  //outputColor = vec4(color.r * u_colorFactor + grey * (1.0 - u_colorFactor),color.g * u_colorFactor + grey * (1.0 - u_colorFactor),color.b * u_colorFactor + grey * (1.0 - u_colorFactor),1.0);
  outputColor = vec4(color,1.0);
}