#version 150

out vec4 outputColor;
uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2DRect u_tex0;
in vec2 vertTexCoord;


float uvrand(vec2 uv)
{
  return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
  vec2 offs = vec2(u_resolution.x - u_resolution.y, 8) / 2;
  vec2 p = (gl_FragCoord.xy - offs) / u_resolution.y;
  vec2 ro = vec2(-1.5,-5.5); // rect origin
  vec2 rw = vec2(5.5, 5.5); // rect extent (half width)
    

   
  float t = floor(u_time);

    for (int i = 0; i <=90; i++)
    {
        if (uvrand(ro.xy +  t) < .005 * i) break;
        rw *= 0.8;
        ro += rw * (step(ro, p) * 2 - 1);
    }

    float rnd = uvrand(ro);

    vec2 sl = rnd < 0.9 ? vec2(1,0) : vec2(1,1); // sliding param
    sl *= 4 * rw * (1 - smoothstep(5.05, 1, fract(u_time)));

    
    vec2 cp = (abs(rw + p + ro) - sl) * u_resolution.y - 105; // rect fill
    vec4  masks = texture (u_tex0, cp);

    //float c = clamp(min(1, 1), 0.5, 0.5);
    //c*= rnd * (1 - abs(floor(p.y))); // outside

   //outputColor =vec4(c,0.0,0,1);
   outputColor = masks;
}
 

  