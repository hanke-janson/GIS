// 闪电
`float hash(float x)
{
  return fract(21654.6512 * sin(385.51 * x));
}
float hash(vec2 p)
{
  return fract(1654.65157 * sin(15.5134763 * p.x + 45.5173247 * p.y + 5.21789));
}
vec2 hash2(vec2 p)
{
  return vec2(hash(p * .754), hash(1.5743 * p + 4.5476351));
}
vec2 add = vec2(1.0, 0.0);
vec2 noise2(vec2 x)
{
vec2 p = floor(x);
vec2 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
vec2 res = mix(mix(hash2(p),
hash2(p + add.xy), f.x),
mix(hash2(p + add.yx), hash2(p + add.xx), f.x), f.y);
  return res;
}
vec2 fbm2(vec2 x)
{
vec2 r = vec2(0.0);
float a = 1.0;
  for (int i = 0; i < 8; i++)
{
r += noise2(x) * a;
x *= 2.;
a *= .5;
}
  return r;
}
float dseg(vec2 ba, vec2 pa)
{
float h = clamp(dot(pa, ba) / dot(ba, ba), -0.2, 1.);
  return length(pa - ba * h);
}
uniform sampler2D colorTexture; 
uniform float fall_interval; 
uniform float mix_factor; 
varying vec2 v_textureCoordinates; 
void main(void){
vec2 uv = gl_FragCoord.xy; 
float iTime = czm_frameNumber * fall_interval * clamp(fall_interval * 0.1, 0.01, 0.1); 
vec2 p = uv / czm_viewport.zw; 
vec2 d; 
vec2 tgt = vec2(1., -1.); 
float c = 0.; 
  if (p.y >= 0.) 
  c = (1. - (fbm2((p + .2) * p.y + .1 * iTime)).x) * p.y; 
else 
  c = (1. - (fbm2(p + .2 + .1 * iTime)).x) * p.y * p.y; 
vec3 col = vec3(0.); 
//\u7528\u5206\u5E03\u6717\u8FD0\u52A8\u6A21\u62DF\u4E4C\u4E91
vec3 col1 = c * vec3(.3, .5, 1.); 
float mdist = 100000.; 
float t = hash(floor(5. * iTime)); 
  tgt += 4. * hash2(tgt + t) - 1.5; 
  if (hash(t + 2.3) > .6) 
  for (int i = 0; i < 100; i++) {
vec2 dtgt = tgt - p; 
d = .05 * (vec2(-.5, -1.) + hash2(vec2(float(i), t))); 
//\u70B9d\u5230\u9009\u6BB5dtgt\u7684\u8DDD\u79BB
float dist = dseg(d, dtgt); 
//\u6C42\u6700\u5C0F\u8DDD\u79BB(https://blog.csdn.net/weixin_43751272/article/details/114017953
mdist = min(mdist, dist); 
tgt -= d; 
c = exp(-1.2 * dist) + exp(-55. * mdist); 
col = c * vec3(.7, .8, 1.); 
  } 
  //\u52A0\u4E0A\u4E4C\u4E91
  col += col1; 
  gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(col, 0.0), mix_factor); 
} 
`;
