export function truncateAddress(input: string) {
  if (!input) {
    return '';
  }
  if (input.length > 10) {
    return input.substring(0, 11) + '...' + input.substring(input.length - 4, input.length);
  }
  return input;
}

export function getCleanAddress(input: string) {
  return input?.split(':')[0];
}
