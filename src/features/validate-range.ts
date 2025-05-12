export default function isValidRange(n: string): boolean {
  if (n == "") return true;

  for (let i = 1; i <= 9; i++) {
    if (n == i.toString()) return true;
  }
  return false;
}
