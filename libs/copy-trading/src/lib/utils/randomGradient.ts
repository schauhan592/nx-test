const charMapper: { [key: string]: number } = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  x: 10,
};

function is_numeric(str: string) {
  return /^\d+$/.test(str);
}

function toHex(num: string) {
  const h = parseInt(num, 10).toString(16);
  return h.padStart(6, '0');
}

function createHex(hex: string) {
  let sum = 0;
  for (let i = 0; i < hex.length; i++) {
    if (is_numeric(hex[i])) {
      sum += Number(hex[i]);
    } else {
      sum += charMapper[hex[i]];
    }
  }

  const sum2 = (sum % 3) * 100;
  sum = sum * 100;
  return [toHex(String(sum)), toHex(String(sum2))];
}

export default function generateRandomGradient(hex: string) {
  const deg = 45;
  const [hex1, hex2] = createHex(hex);
  console.log(hex1, hex2);

  return `linear-gradient(${deg}deg, #${hex1} 0%, #${hex2} 100%);`;
}
