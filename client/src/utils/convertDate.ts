export function formatMongoDate(isoDateString: Date): string {
  const date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  return date.toLocaleDateString("en-US", options).replace(",", "");
}
