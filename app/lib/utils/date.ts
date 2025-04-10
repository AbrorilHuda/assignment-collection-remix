export function convertToWIB(isoString: string) {
  const date = new Date(isoString);
  return date
    .toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\//g, "-"); // Ganti / dengan - jika perlu
}
