export function convertToWIB(isoString: string) {
    return new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
        hour12: false, // Format 24 jam
    }).format(new Date(isoString));
}
