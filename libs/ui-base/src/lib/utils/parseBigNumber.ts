type parseBigNumberProps = {
  prefix?: string;
  value: string | undefined;
  suffix?: string;
};

export const parseBigNumber = ({ value }: parseBigNumberProps) => {
  const DIGITS_AFTER_DECIMAL = 4;
  if (value) {
    let digits = 0;
    const chars = value.split('.')[1];
    for (let index = 0; index < chars.length; index++) {
      if (chars[index] === '0') digits += 1;
      else if (digits > DIGITS_AFTER_DECIMAL) {
        return `~0.00001`;
      } else {
        return `${value.substring(0, DIGITS_AFTER_DECIMAL + 3)}`;
      }
    }
  }
  // TODO; If value is undefined then return 0
  return 0;
};
