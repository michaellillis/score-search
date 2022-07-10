export function combine(input: string) {
  const join = input
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join('');
  return join;
}
