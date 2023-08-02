export function truncateValue(input: string) {
  if (!input) {
    return '';
  }
  if (input.length > 5) {
    return input.substring(0, 3) + '...';
  }
  return input;
}
