export function truncateAddress(input: string) {
  if (!input) {
    return '';
  }
  if (input.length > 10) {
    return input.substring(0, 5) + '...' + input.substring(input.length - 5, input.length);
  }
  return input;
}
