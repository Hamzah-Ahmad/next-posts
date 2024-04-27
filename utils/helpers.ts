export function capitalizeFirstLetter(str: string = "") {
  return str[0]?.toUpperCase() + str.slice(1);
}

export function formatDate(date: Date): string {
  if (!(date instanceof Date)) {
    return "Invalid date";
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
