export const splitSig = (sig: string) => {
  // splits the signature to r, s, and v values.
  const pureSig = sig.replace('0x', '');

  const r = '0x' + pureSig.substring(0, 64);
  const s = '0x' + pureSig.substring(64, 128);
  const v = parseInt(pureSig.substring(128, 130), 16).toString();

  return {
    r,
    s,
    v,
  };
};
