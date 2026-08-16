/** CONFIGURACIÓN PRINCIPAL: cambia aquí nombres, fechas, lugares, enlaces y regalos. */
export const wedding = {
  couple: {
    first: "Nathaly",
    firstFull: "Nathaly Jiménez",
    second: "Gersom",
    secondFull: "Gersom Bahena",
  },
  date: "2027-06-24T10:00:00+02:00",
  dateParts: { day: "24", month: "Junio", year: "2027" },
  message:
    "Hay lugares que parecen un sueño; contigo, cualquier lugar se siente como hogar.",
  ceremony: {
    eyebrow: "CEREMONIA",
    weekday: "JUEVES",
    day: "24",
    monthYear: "Junio · 2027",
    time: "10:00 AM",
    place: "Villa del Balbianello",
    address: "Lenno · Lago di Como · Italia",
    maps: "https://www.google.com/maps/search/?api=1&query=Villa+del+Balbianello+Lenno+Italy",
  },
  celebration: {
    eyebrow: "RECEPCIÓN",
    weekday: "VIERNES",
    day: "25",
    monthYear: "Junio · 2027",
    time: "5:30 PM",
    place: "Grand Hotel Tremezzo",
    address: "Tremezzina · Lago di Como · Italia",
    maps: "https://www.google.com/maps/search/?api=1&query=Grand+Hotel+Tremezzo+Italy",
  },
  gift: {
    bank: "Cuenta de regalo · Demo",
    clabe: "0000 0000 0000 0000 00",
    wishlist: "https://www.amazon.com/registries",
  },
  // TODO ÁLBUM: reemplaza por el enlace compartido real.
  photosUrl: "https://photos.google.com/",
  musicSrc: "/assets/music-bg.mp3",
  heroSrc: "/assets/invitation-bg.mp4",
  gallery: [
    "https://images.unsplash.com/photo-1562826772-be179f321470?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1506014299253-3725319c0f69?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1519307212971-dd9561667ffb?auto=format&fit=crop&w=1000&q=82",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=82",
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=82",
  ],
} as const;
