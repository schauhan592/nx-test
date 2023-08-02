const replace = String.prototype.replace;
const percentTwenties = /%20/g;

const Format = {
  RFC1738: 'RFC1738',
  RFC3986: 'RFC3986',
};

const formats: any = {
  default: Format.RFC3986,
  formatters: {
    RFC1738: function (value: any) {
      return replace.call(value, percentTwenties, '+' as any);
    },
    RFC3986: function (value: any) {
      return String(value);
    },
  },
  RFC1738: Format.RFC1738,
  RFC3986: Format.RFC3986,
};
export default formats;
