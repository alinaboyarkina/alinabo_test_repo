export function getExpirationPlusMonths(months: number): string {
  const now = new Date();
  now.setMonth(now.getMonth() + months);

  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();

  return `${mm}/${yyyy}`;
}
