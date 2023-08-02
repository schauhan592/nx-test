export default function getNegPosColor(num: number | string) {
  const number = Number(num);

  if (Math.sign(number) === 1) {
    return '#4BD2A1';
  }

  if (Math.sign(number) === -1) {
    return '#FF5349';
  }

  return '#FFF';
}
