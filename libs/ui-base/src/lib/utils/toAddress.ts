export function toAddress(addressString: string) {
  return addressString?.split(':')[1];
}

export function toTokenId(addressString: string) {
  return addressString?.split(':')[2];
}

export function toTokenUri(addressString: string) {
  return `${addressString?.split(':')[1]}:${addressString?.split(':')[2]}`;
}
