import { FormEvent, useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { wedding as w } from "./config";

type M = "dress" | "gift" | "rsvp" | "music" | "tips" | null;

const FLORAL = "/assets/floral.png",
  DRESS = "/assets/dress-code.jpg";

function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <img src={FLORAL} alt="" />
    </div>
  );
}

function Count() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const f = () => setT(Math.max(new Date(w.date).getTime() - Date.now(), 0));
    f();
    const i = setInterval(f, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="count">
      {[
        Math.floor(t / 864e5),
        Math.floor(t / 36e5) % 24,
        Math.floor(t / 6e4) % 60,
        Math.floor(t / 1e3) % 60,
      ].map((n, i) => (
        <div key={i}>
          <b>{String(n).padStart(2, "0")}</b>
          <small>{["DÍAS", "HRS", "MIN", "SEG"][i]}</small>
        </div>
      ))}
    </div>
  );
}

function Scratch({
  v,
  l,
  onDone,
}: {
  v: string;
  l: string;
  onDone: () => void;
}) {
  const c = useRef<HTMLCanvasElement>(null),
    down = useRef(false),
    done = useRef(false),
    moves = useRef(0);
  useEffect(() => {
    const x = c.current;
    if (!x) return;
    const q = x.getBoundingClientRect(),
      d = Math.min(devicePixelRatio || 1, 2);
    x.width = q.width * d;
    x.height = q.height * d;
    const g = x.getContext("2d")!;
    g.scale(d, d);
    g.fillStyle = "#d4c8b5";
    g.fillRect(0, 0, q.width, q.height);
    g.fillStyle = "#71695f";
    g.font = "600 8px Montserrat";
    g.textAlign = "center";
    g.fillText("RASPA AQUÍ", q.width / 2, q.height / 2 + 3);
  }, []);
  const check = () => {
    const x = c.current!,
      g = x.getContext("2d")!,
      data = g.getImageData(0, 0, x.width, x.height).data;
    let clear = 0,
      total = 0;
    for (let y = 0; y < x.height; y += 8)
      for (let z = 0; z < x.width; z += 8) {
        total++;
        if (data[(y * x.width + z) * 4 + 3] < 40) clear++;
      }
    if (clear / total > 0.56 && !done.current) {
      done.current = true;
      x.classList.add("cleared");
      onDone();
    }
  };
  const s = (e: React.PointerEvent) => {
    if (!down.current || done.current) return;
    const x = c.current!,
      q = x.getBoundingClientRect(),
      d = x.width / q.width,
      g = x.getContext("2d")!,
      r = matchMedia("(max-width:600px)").matches ? 7 : 11;
    g.save();
    g.scale(d, d);
    g.globalCompositeOperation = "destination-out";
    g.beginPath();
    g.arc(e.clientX - q.left, e.clientY - q.top, r, 0, Math.PI * 2);
    g.fill();
    g.restore();
    if (++moves.current % 7 === 0) check();
  };
  return (
    <div className="scratch">
      <b>{v}</b>
      <small>{l}</small>
      <canvas
        ref={c}
        onPointerDown={(e) => {
          down.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          s(e);
        }}
        onPointerMove={s}
        onPointerUp={() => {
          down.current = false;
          check();
        }}
      />
    </div>
  );
}

// Iconos
const Icons = {
  music: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19V6l12-3v13M9 19c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12-3c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zM9 10l12-3"
      />
    </svg>
  ),
  dress: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M10 12l-6 4v-8l6 4M14 12l6 4v-8l6 4"
      />
    </svg>
  ),
  tips: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  ),
  gift: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"
      />
    </svg>
  ),
  rsvp: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7l2 2 4-4"
      />
    </svg>
  ),
};

function Modal({ m, setM }: { m: M; setM: (x: M) => void }) {
  if (!m) return null;
  return (
    <div
      className="shade"
      onClick={(e) => e.target === e.currentTarget && setM(null)}
    >
      <div className="modal">
        <div className="modalIcon">{Icons[m]}</div>

        <div className="modalFrame">
          <button className="x" aria-label="Cerrar" onClick={() => setM(null)}>
            ×
          </button>

          {m === "dress" && (
            <>
              <h2>Dress Code</h2>
              <p>Formal / elegante. Usa esta guía como inspiración.</p>
              <img
                className="dressGuide"
                src={DRESS}
                alt="Ejemplos de vestimenta"
              />
            </>
          )}

          {m === "gift" && (
            <>
              <h2>Regalos</h2>
              <p>
                Si quieres darnos algo más que tu hermosa presencia, contamos
                con las siguientes opciones:
              </p>
              <div className="giftCard">
                <small>{w.gift.bank}</small>
                <b>{w.gift.clabe}</b>
              </div>
              <a
                className="btn block-btn"
                href={w.gift.wishlist}
                target="_blank"
              >
                VER WISHLIST
              </a>
            </>
          )}

          {m === "music" && (
            <>
              <h2>Sugerir Canción</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setM(null);
                }}
              >
                <input required placeholder="Ingrese su nombre completo" />
                <input required placeholder="Nombre de la canción y autor" />
                <input placeholder="Link de YouTube (opcional)" />
                <button className="btn block-btn">Sugerir Canción</button>
              </form>
            </>
          )}

          {m === "tips" && (
            <>
              <h2>Tips y Notas</h2>
              <ul className="tipsList">
                <li>¡Por favor ser puntuales!</li>
                <li>
                  Queremos que disfrutes de esta fiesta al máximo, por eso
                  decidimos que sea un evento solo para adultos.
                </li>
                <li>¡Confirmar asistencia a la brevedad!</li>
                <li>Olvidarse de todo y a disfrutar!!!</li>
              </ul>
            </>
          )}

          {m === "rsvp" && (
            <>
              <h2>¿Asistes a la celebración?</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  localStorage.setItem("rsvp", "ok");
                  setM(null);
                }}
              >
                <div className="radioGroup">
                  <label>
                    <input type="radio" name="att" required /> Sí, confirmo!
                  </label>
                  <label>
                    <input type="radio" name="att" required /> No puedo 😔
                  </label>
                </div>
                <input required placeholder="Ingrese su nombre completo" />
                <input placeholder="Algún dato importante. Ej: Soy vegetariano" />
                <button className="btn block-btn">Enviar Asistencia</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [open, setOpen] = useState(false),
    [m, setM] = useState<M>(null),
    [rev, setRev] = useState(0),
    [toast, setToast] = useState(""),
    [slide, setSlide] = useState(0),
    [lightbox, setLightbox] = useState<number | null>(null),
    [playing, setPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!open || m !== null || lightbox !== null) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open, m, lightbox]);

  const toggleMusic = () => {
    if (!w.musicSrc) {
      setToast("Añade tu canción en src/config.ts ♫");
      return;
    }

    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => {
            setPlaying(true);
          })
          .catch(() => setToast("Error al reproducir el audio"));
      }
    }
  };

  const openInvitation = () => {
    setOpen(true);
    if (!w.musicSrc) return;

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch(() => setToast("Error al reproducir el audio"));
    }
  };

  const cal = () => {
    const b = new Blob(
        [
          `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20270624T080000Z\nSUMMARY:Boda Nathaly & Gersom\nLOCATION:Villa del Balbianello\nEND:VEVENT\nEND:VCALENDAR`,
        ],
        { type: "text/calendar" },
      ),
      a = document.createElement("a");
    a.href = URL.createObjectURL(b);
    a.download = "nathaly-gersom.ics";
    a.click();
  };

  return (
    <div className={open ? "opened" : ""}>
      <audio ref={audioRef} src={w.musicSrc} loop />

      <div className="cinema" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={w.gallery[4]}
          src={w.heroSrc}
        />
        <div />
      </div>

      {!open && (
        <div className="gate" onTouchMove={(e) => e.preventDefault()}>
          <div className="gateFlowers top">
            <img src={FLORAL} alt="" />
          </div>
          <div className="paper">
            <p className="eyebrow">TIENES UNA INVITACIÓN</p>
            <div className="mono">
              N <i>&</i> G
            </div>
            <h1>
              Nathaly Jiménez
              <br />
              <i>&</i>
              <br />
              Gersom Bahena
            </h1>
            <p>24 · 06 · 2027</p>
            <button className="seal" onClick={openInvitation}>
              NG
            </button>
            <small>TOCA EL SELLO PARA ABRIR</small>
          </div>
        </div>
      )}

      <button
        type="button"
        className={`music ${playing ? "is-playing" : ""}`}
        onClick={toggleMusic}
        aria-label={playing ? "Pausar música" : "Reproducir música"}
        aria-pressed={playing}
      >
        {playing ? "⏸ PAUSAR" : "♫ MÚSICA"}
      </button>

      {toast && (
        <div className="toast" onAnimationEnd={() => setToast("")}>
          {toast}
        </div>
      )}

      <main>
        {/* HERO */}
        <section className="transparent-sec hero">
          <div className="heroText">
            <p className="eyebrow">NUESTRA BODA</p>
            <h1>
              {w.couple.first}
              <i>&</i>
              {w.couple.second}
            </h1>
            <p className="date">24 · 06 · 2027</p>
            <q>{w.message}</q>
          </div>
        </section>

        <Divider />

        {/* SAVE THE DATE */}
        <section className="ivory dateSec">
          <p className="eyebrow">SAVE THE DATE</p>
          <h2>Nos casamos</h2>
          <p>
            Hay momentos que merecen descubrirse despacio. Raspa cada círculo.
          </p>
          <div className="scratches">
            <Scratch v="24" l="DÍA" onDone={() => setRev((x) => x + 1)} />
            <Scratch v="JUN" l="MES" onDone={() => setRev((x) => x + 1)} />
            <Scratch v="27" l="AÑO" onDone={() => setRev((x) => x + 1)} />
          </div>
          {rev >= 3 && <div className="confetti">✦ · ✧ · ✦ · ✧ · ✦</div>}
          <Count />
          <button className="btn" onClick={cal}>
            + GUARDAR LA FECHA
          </button>
        </section>

        <Divider />

        {/* ITINERARIO */}
        <section className="transparent-sec">
          {(["ceremony", "celebration"] as const).map((k) => {
            const e = w[k];
            return (
              <article key={k} className="card text-center">
                <p className="eyebrow">{e.eyebrow}</p>
                <div className="lock">
                  <span>{e.weekday}</span>
                  <b>{e.day}</b>
                  <span>{e.time}</span>
                </div>
                <small className="divider-line">{e.monthYear}</small>
                <h3>{e.place}</h3>
                <a className="btn" href={e.maps} target="_blank">
                  ¿Cómo llegar?
                </a>
              </article>
            );
          })}
        </section>

        <Divider />

        {/* GALERÍA */}
        <section className="ivory gallery">
          <h2>Retratos de nuestro amor</h2>
          <p>La clave es disfrutar cada momento</p>

          <div className="slider">
            <button
              className="arrow"
              onClick={() =>
                setSlide((s) => (s === 0 ? w.gallery.length - 1 : s - 1))
              }
            >
              ←
            </button>
            <figure onClick={() => setLightbox(slide)}>
              <img
                src={w.gallery[slide]}
                alt={`Nathaly y Gersom ${slide + 1}`}
              />
              <div className="expand-hint">⛶</div>
            </figure>
            <button
              className="arrow"
              onClick={() =>
                setSlide((s) => (s === w.gallery.length - 1 ? 0 : s + 1))
              }
            >
              →
            </button>
          </div>

          <div className="dots">
            {w.gallery.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === slide ? "active" : ""}`}
                onClick={() => setSlide(i)}
                aria-label={`Foto ${i + 1}`}
              />
            ))}
          </div>
        </section>

        <Divider />

        {/* MENU APILADO */}
        <section className="transparent-sec">
          <article className="card text-center">
            <div className="card-icon">{Icons.music}</div>
            <h2>Música</h2>
            <p>¿Cuál es la canción que no puede faltar en la fiesta?</p>
            <button className="btn" onClick={() => setM("music")}>
              Sugerir canción
            </button>
          </article>

          <article className="card text-center">
            <div className="card-icon">{Icons.dress}</div>
            <h2>Dress Code</h2>
            <p>Una orientación para tu vestimenta.</p>
            <button className="btn" onClick={() => setM("dress")}>
              Ver más
            </button>
          </article>

          <article className="card text-center">
            <div className="card-icon">{Icons.tips}</div>
            <h2>Tips y Notas</h2>
            <p>Información adicional a considerar.</p>
            <button className="btn" onClick={() => setM("tips")}>
              Ver más
            </button>
          </article>
        </section>

        <Divider />

        {/* REGALOS */}
        <section className="ivory gifts-sec">
          <div className="card-icon text-center">{Icons.gift}</div>
          <h2>Regalos</h2>
          <p>Si quieres darnos algo más que tu hermosa presencia...</p>
          <button className="btn" onClick={() => setM("gift")}>
            Ver opciones de regalo
          </button>
        </section>

        <Divider />

        {/* ALBUM COMPARTIDO */}
        <section className="transparent-sec">
          <article className="card text-center">
            <p className="eyebrow">ÁLBUM COMPARTIDO</p>
            <h2>
              La boda a través
              <br />
              de tus ojos
            </h2>
            <p>Comparte tus fotos y videos de este hermoso día.</p>
            <div className="qr-box">
              <QRCodeSVG value={w.photosUrl} size={150} />
            </div>
            <p className="qr-hint">Escanea el código QR y sube tus fotos</p>
            <a className="btn block-btn" href={w.photosUrl} target="_blank">
              Subir fotos
            </a>
          </article>
        </section>

        <Divider />

        {/* RSVP FINAL */}
        <section className="ivory rsvp">
          <h2>Confirmación</h2>
          <p>¿Nos acompañas en este día tan especial?</p>
          <div className="card-icon text-center" style={{ margin: "20px 0" }}>
            {Icons.rsvp}
          </div>
          <button className="btn" onClick={() => setM("rsvp")}>
            Confirmar asistencia
          </button>
          <div className="signature">
            Nathaly <i>&</i> Gersom
          </div>
          <small className="copyright">Desarrollado con ♥ por Gersom BS © 2026</small>
        </section>
      </main>

      {/* OVERLAYS */}
      <Modal m={m} setM={setM} />

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="lightbox"
          onClick={(e) => e.target === e.currentTarget && setLightbox(null)}
        >
          <button className="x" onClick={() => setLightbox(null)}>
            ×
          </button>
          <button
            className="lightbox-arrow left"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((s) => (s === 0 ? w.gallery.length - 1 : s! - 1));
            }}
          >
            ←
          </button>
          <img src={w.gallery[lightbox]} alt="Fullscreen" />
          <button
            className="lightbox-arrow right"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((s) => (s === w.gallery.length - 1 ? 0 : s! + 1));
            }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
