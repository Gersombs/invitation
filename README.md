# Nathaly & Gerson — Invitación digital

Invitación digital interactiva mobile-first inspirada en la estructura y experiencia del video de referencia.

## Incluye

- Apertura tipo sobre/invitación
- Hero cinematográfico con video local
- Música ambiental preparada (ruta marcada en `src/config.ts`)
- Fecha interactiva para raspar con mouse o touch
- Confeti al descubrir la fecha
- Countdown en tiempo real
- Descarga de `save-the-date.ics`
- Ceremonia y recepción con Google Maps
- Galería swipeable + lightbox
- Dress code con guía visual
- Sugerencias de canciones
- Tips para invitados
- Regalos: cuenta demo + wishlist Amazon
- QR y sección para álbum compartido
- RSVP demo guardado en localStorage
- Animaciones on-scroll y parallax discreto
- Responsive + `prefers-reduced-motion`

## Datos de demo

- **Nathaly Jiménez & Gerson Baena**
- **Ceremonia:** 24 de junio de 2027 · 10:00 AM · Villa del Balbianello, Lago di Como
- **Recepción:** 25 de junio de 2027 · 5:30 PM · Grand Hotel Tremezzo

Las ubicaciones se usan únicamente como escenario visual de esta prueba; no representan una reservación real.

## Cambiar información

La mayor parte de la personalización está centralizada en `src/config.ts`.

## Desarrollo

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```
