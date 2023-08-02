export default function mapSymbolWithConstantTokenHex(hex: string) {
  switch (hex) {
    case '0x82af49447d8a07e3bd95bd0d56f35241523fbab1':
      return 'WETH';
    case '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f':
      return 'WBTC';
    case '0xf97f4df75117a78c1a5a0dbb814af92458539fb4':
      return 'LINK';
    case '0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0':
      return 'UNI';
  }
}
