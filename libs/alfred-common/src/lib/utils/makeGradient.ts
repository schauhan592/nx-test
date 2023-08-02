// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { hsl2rgb } from './hsl2rbg';

// The random number is a js implementation of the Xorshift PRNG
const randseed = new Array(4); // Xorshift: [x, y, z, w] 32 bit values

function seedrand(seed: string) {
  for (let i = 0; i < randseed.length; i++) {
    randseed[i] = 0;
  }
  for (let i = 0; i < seed.length; i++) {
    randseed[i % 4] = (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
  }
}

function rand() {
  // based on Java's String.hashCode(), expanded to 4 32bit values
  const t = randseed[0] ^ (randseed[0] << 11);

  randseed[0] = randseed[1];
  randseed[1] = randseed[2];
  randseed[2] = randseed[3];
  randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);

  return (randseed[3] >>> 0) / ((1 << 31) >>> 0);
}

function createColor() {
  //saturation is the whole color spectrum
  const h = Math.floor(rand() * 360);
  //saturation goes from 50 to 100, it avoids greyish colors
  const s = rand() * 50 + 50;
  //lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
  const l = (rand() + rand() + rand() + rand()) * 25;

  return [h / 360, s / 100, l / 100];
}

function buildOpts(opts: any) {
  if (!opts.seed) {
    throw new Error('No seed provided');
  }

  seedrand(opts.seed);

  return Object.assign(
    {
      size: 8,
      scale: 16,
      color: createColor(),
      bgcolor: createColor(),
      spotcolor: createColor(),
      extracolor: createColor(),
    },
    opts
  );
}

export function makeGradient(address: string) {
  const opts = buildOpts({ seed: address?.toLowerCase() });
  const calculated = opts.size * opts.scale;

  const color = hsl2rgb(...opts.color);
  const spotcolor = hsl2rgb(...opts.spotcolor);
  const extracolor = hsl2rgb(...opts.extracolor);

  const color1 = `rgb(${color[0]},${color[1]},${color[2]})`;
  const color2 = `rgb(${spotcolor[0]},${spotcolor[1]},${spotcolor[2]})`;
  const color3 = `rgb(${extracolor[0]},${extracolor[1]},${extracolor[2]})`;

  const SvgMoving = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${calculated} ${calculated}">
  <defs>
     <linearGradient id='a' gradientUnits='objectBoundingBox' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${color1}'>
           <animate attributeName="stop-color"
              values="${color1};${color2};${color3};${color1};${color2};${color3};${color1};" dur="20s" repeatCount="indefinite">
           </animate>
        </stop>
        <stop offset='.5' stop-color='${color2}'>
           <animate attributeName="stop-color"
              values="${color2};${color3};${color1};${color2};${color3};${color1};${color2};" dur="20s" repeatCount="indefinite">
           </animate>
        </stop>
        <stop offset='1' stop-color='  ${color3}'>
           <animate attributeName="stop-color"
              values="${color3};${color1};${color2};${color3};${color1};${color2};${color3};" dur="20s" repeatCount="indefinite">
           </animate>
        </stop>
        <animateTransform attributeName="gradientTransform" type="rotate" from="0 .5 .5" to="360 .5 .5"
           dur="20s" repeatCount="indefinite" />
     </linearGradient>
     <linearGradient id='b' gradientUnits='objectBoundingBox' x1='0' y1='1' x2='1' y2='1'>
        <stop offset='0' stop-color='${color1}'>
           <animate attributeName="stop-color"
              values="${color1};${color2};${color3};${color1};${color2};${color3};${color1};" dur="20s" repeatCount="indefinite">
           </animate>
        </stop>
        <stop offset='1' stop-color='${color2}' stop-opacity="0">
           <animate attributeName="stop-color"
              values="${color2};${color3};${color1};${color2};${color3};${color1};${color2};" dur="20s" repeatCount="indefinite">
           </animate>
        </stop>
        <animateTransform attributeName="gradientTransform" type="rotate" values="360 .5 .5;0 .5 .5" class="ignore"
           dur="10s" repeatCount="indefinite" />
     </linearGradient>
  </defs>
  <rect fill='url(#a)' width='100%' height='100%' />
  <rect fill='url(#b)' width='100%' height='100%' />
</svg>`;

  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(SvgMoving)))}`;
}
