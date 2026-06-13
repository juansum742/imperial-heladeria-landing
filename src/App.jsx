import { useEffect, useRef, useState } from "react";

import logo from "../mqbkn4r7-Logo-.jpeg";
import heroFacade from "../mqbkpl85-WhatsApp-Image-2026-06-12-at-6.45.03-PM-_7_.jpeg";
import ambienteMesa from "../assets/ambiente-mesa-imperial.jpeg";
import fachadaTerraza from "../assets/fachada-terraza-calle.jpeg";
import cucurucho from "../assets/cucurucho-dos-sabores.jpeg";
import saboresCartel from "../assets/sabores-cartel.jpeg";
import cafeteria from "../assets/cafeteria-waffle-cafe.jpeg";
import cartaMenu from "../assets/carta-menu.jpeg";
import fachadaEsquina from "../assets/fachada-esquina-logo.jpeg";
import copaFrutilla from "../assets/copa-frutilla-oblea.jpeg";

const navItems = [
  { href: "#historia", label: "El local" },
  { href: "#heladeria", label: "Heladería" },
  { href: "#cafeteria", label: "Cafetería" },
  { href: "#galeria", label: "Fotos reales" },
  { href: "#contacto", label: "Contacto" },
];

const productFeatures = [
  {
    id: "heladeria",
    titleId: "heladeria-title",
    className: "product-feature--heladeria",
    kicker: "Heladería",
    title: "Para pedir algo fresco",
    description:
      "Helados servidos, sabores visibles y una carta simple para decidir rápido antes de acercarse al mostrador.",
    items: [
      ["Cucuruchos", "Un pedido directo, visible y fácil de imaginar desde la primera foto."],
      ["Sabores", "La carta real ayuda a revisar opciones sin esconder la identidad del local."],
      ["Postres fríos", "Copas, vitrina y detalles de producto suman ganas de probar algo más."],
    ],
    tags: ["Cucuruchos", "Sabores", "Vitrina", "Postres fríos"],
    photo: {
      src: cucurucho,
      alt: "Cucurucho con dos sabores y oblea de Heladería Imperial",
    },
    sheet: {
      src: saboresCartel,
      alt: "Menú de sabores y opciones de Heladería Imperial",
      caption: "Menú real de heladería",
    },
  },
  {
    id: "cafeteria",
    titleId: "cafeteria-title",
    className: "product-feature--cafeteria",
    kicker: "Cafetería",
    title: "Café y algo dulce",
    description:
      "Una opción más cálida para merendar, acompañar el helado o quedarse un rato en el local.",
    items: [
      ["Café", "La taza y el plato servido muestran una opción concreta, no solo una categoría."],
      ["Waffles", "Algo dulce para compartir o sumar a la visita de la tarde."],
      ["Carta visible", "El menú real acompaña la elección con precios y opciones a la vista."],
    ],
    tags: ["Café", "Waffles", "Merienda", "Algo dulce"],
    photo: {
      src: cafeteria,
      alt: "Café y waffle servido en Heladería Imperial",
      coffee: true,
    },
    sheet: {
      src: cartaMenu,
      alt: "Carta de cafetería de Heladería Imperial con opciones dulces y bebidas",
      caption: "Menú real de cafetería",
      left: true,
    },
    mediaFirst: true,
  },
];

const galleryItems = [
  {
    src: fachadaEsquina,
    caption: "Fachada y terraza",
    fullCaption: "Fachada de esquina con la marca de Heladería Imperial visible y terraza exterior.",
    alt: "Fachada de esquina de Heladería Imperial con marca visible",
  },
  {
    src: cucurucho,
    caption: "Cucurucho servido",
    fullCaption: "Cucurucho con dos sabores y oblea de Heladería Imperial.",
    alt: "Cucurucho de dos sabores con oblea",
  },
  {
    src: copaFrutilla,
    caption: "Copa con frutilla",
    fullCaption: "Copa helada con frutilla y oblea.",
    alt: "Copa helada con frutilla y oblea de Heladería Imperial",
  },
  {
    src: ambienteMesa,
    caption: "Ambiente del local",
    fullCaption: "Mesa del local con material gráfico de Heladería Imperial y ambiente interior.",
    alt: "Mesa del local con material gráfico de Heladería Imperial",
  },
  {
    src: cafeteria,
    caption: "Cafetería y algo dulce",
    fullCaption: "Café y waffle: una línea de cafetería que acompaña los helados.",
    alt: "Café y waffle servido en Heladería Imperial",
  },
];

const contactItems = [
  ["Dirección", "Joaquín Suárez 207", "Esquina 25 de Mayo, Tacuarembó."],
  ["Teléfono", "098 19 00 61", "Consultas y pedidos al local."],
  ["Lunes a jueves", "12:00 a 22:00", "Heladería y cafetería abiertas."],
  ["Viernes a domingo", "12:00 a 23:00", "Una hora más para el fin de semana."],
];

function useRevealMotion() {
  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return undefined;
    }

    document.documentElement.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealTargets.forEach((target, index) => {
      target.style.setProperty("--reveal-order", String(Math.min(index % 3, 2)));
      revealObserver.observe(target);
    });

    return () => {
      revealObserver.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);
}

function Brand({ footer = false }) {
  return (
    <a className="brand" href="#inicio" aria-label={footer ? "Volver al inicio de Imperial Heladería" : "Ir al inicio de Imperial Heladería"}>
      <img className="brand__mark" src={logo} alt="Logo real de Imperial Heladería" />
      <span className="brand__name">
        <strong>Imperial</strong>
        <span>Heladería</span>
      </span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav">
        <Brand />

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav__links${menuOpen ? " is-open" : ""}`} id="nav-links" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" data-od-id="hero-principal">
      <div className="container hero__grid">
        <div className="hero__copy" data-reveal="hero-copy">
          <div className="hero__main">
            <span className="eyebrow">Heladería artesanal en Tacuarembó</span>
            <h1>Helados, café y algo rico para compartir en familia.</h1>
            <p className="lead">
              Heladería Imperial combina helados, postres y cafetería en un espacio cercano: de esos lugares donde pasás por un
              cucurucho, te quedás un rato y salís con ganas de volver.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#contacto">
                Pasá por el local
              </a>
              <a className="btn btn--secondary" href="#heladeria">
                Ver opciones
              </a>
            </div>
          </div>

          <div className="hero__note" aria-label="Datos rápidos" data-reveal>
            <p className="note">
              <strong>Para elegir en el local</strong> Cucuruchos, postres fríos, café y algo dulce para quedarse un rato.
            </p>
            <p className="note">
              <strong>Dirección</strong> Joaquín Suárez 207, esquina 25 de Mayo, Tacuarembó.
            </p>
          </div>
        </div>

        <figure className="hero-card" data-reveal="hero-card">
          <img className="hero-card__photo" src={heroFacade} alt="Fachada de Heladería Imperial con el logo del local visible" />
          <figcaption className="hero-card__caption">
            <span>Joaquín Suárez 207</span>
            Fachada reconocible, mesas afuera y el borgoña de la marca como primera señal.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="section section--white" id="historia" data-od-id="identidad-local">
      <div className="container story">
        <div className="story__media" aria-label="Fotos reales del local" data-reveal>
          <img src={ambienteMesa} alt="Mesa del local con volante de Heladería Imperial y ambiente de cafetería al fondo" />
          <img src={fachadaTerraza} alt="Terraza exterior de Heladería Imperial con mesas de madera y baranda blanca" />
        </div>
        <div className="story__copy" data-reveal>
          <h2>Heladería Imperial se reconoce desde la vereda.</h2>
          <p>
            La marca aparece en carteles, fachada, platos y piezas impresas con un rojo borgoña fácil de recordar. La página
            toma esa identidad y la ordena en una presencia más clara: luminosa, cercana y con el producto siempre a la vista.
          </p>
          <p>
            La sensación buscada es la de un local cuidado y familiar: una heladería donde se puede pasar por un helado, una
            merienda o una pausa simple.
          </p>
          <div className="signature">
            <img src={logo} alt="Recorte del logo real de Heladería Imperial" />
            <div>
              <strong>Marca de siempre</strong>
              <span>Borgoña, crema y una rotulación clásica llevados a una web más limpia.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductMedia({ photo, sheet }) {
  return (
    <div className="product-feature__media" aria-label="Composición visual de producto">
      <figure className={`feature-photo${photo.coffee ? " feature-photo--coffee" : ""}`}>
        <img src={photo.src} alt={photo.alt} />
      </figure>
      <figure className={`menu-sheet${sheet.left ? " menu-sheet--left" : ""}`}>
        <img src={sheet.src} alt={sheet.alt} />
        <figcaption>{sheet.caption}</figcaption>
      </figure>
    </div>
  );
}

function ProductCopy({ feature }) {
  return (
    <div className="product-feature__copy">
      <span className="product-kicker">{feature.kicker}</span>
      <h3 id={feature.titleId}>{feature.title}</h3>
      <p>{feature.description}</p>
      <ul className="product-list">
        {feature.items.map(([title, text]) => (
          <li key={title}>
            <strong>{title}</strong>
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <div className="product-tags" aria-label={`Opciones de ${feature.kicker.toLowerCase()} visibles`}>
        {feature.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function ProductFeature({ feature }) {
  const media = <ProductMedia photo={feature.photo} sheet={feature.sheet} />;
  const copy = <ProductCopy feature={feature} />;

  return (
    <article className={`product-feature ${feature.className}`} id={feature.id} aria-labelledby={feature.titleId} data-reveal>
      {feature.mediaFirst ? media : copy}
      {feature.mediaFirst ? copy : media}
    </article>
  );
}

function Products() {
  return (
    <section className="section" id="productos" data-od-id="productos-destacados">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <h2>Dos maneras de pasar por Heladería Imperial.</h2>
          </div>
          <p>
            Lo frío y lo de merienda aparecen separados para que cada visita tenga una puerta clara: pedir un helado o sentarse
            con café y algo dulce.
          </p>
        </div>

        <div className="product-sections">
          {productFeatures.map((feature) => (
            <ProductFeature key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ onOpen }) {
  return (
    <section className="section section--white" id="galeria" data-od-id="galeria-editorial">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <h2>Fotos para conocer el local.</h2>
          </div>
          <p>Fachada, terraza, producto y mesa interior muestran cómo se ve el local antes de llegar.</p>
        </div>

        <div className="gallery" aria-label="Galería de Heladería Imperial" data-reveal>
          {galleryItems.map((item) => (
            <button key={item.caption} type="button" onClick={() => onOpen(item)}>
              <img src={item.src} alt={item.alt} />
              <span className="caption">{item.caption}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="section" id="contacto" data-od-id="cta-contacto">
      <div className="container visit">
        <div className="visit-card" data-reveal>
          <h2>Pasá por Heladería Imperial cuando tengas ganas de algo rico y simple.</h2>
          <p>Acercate por un helado, una merienda o algo para llevar. La información práctica queda a mano para decidir sin vueltas.</p>
          <a
            className="btn"
            href="https://www.google.com/maps/search/?api=1&query=Joaqu%C3%ADn%20Su%C3%A1rez%20207%20esquina%2025%20de%20Mayo%20Tacuaremb%C3%B3"
            target="_blank"
            rel="noreferrer"
          >
            Cómo llegar
          </a>
        </div>

        <div className="contact-grid" aria-label="Información de contacto" data-reveal>
          {contactItems.map(([label, title, text]) => (
            <div className="contact-card" key={label}>
              <small>{label}</small>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
          <div className="contact-card full">
            <small>Canales online</small>
            <strong>
              <a className="contact-link" href="mailto:imperial.heladeria1.tbo@gmail.com">
                imperial.heladeria1.tbo@gmail.com
              </a>
            </strong>
            <span>
              Instagram:{" "}
              <a className="contact-link" href="https://www.instagram.com/heladeriaimperial2025/" target="_blank" rel="noreferrer">
                @heladeriaimperial2025
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" data-od-id="footer">
      <div className="container footer__grid">
        <Brand footer />
        <p>Helados, cafetería y un local familiar en Tacuarembó. Borgoña, crema y fotos reales de Heladería Imperial.</p>
      </div>
    </footer>
  );
}

function Lightbox({ item, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!item) return undefined;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  return (
    <div
      className={`lightbox${item ? " is-open" : ""}`}
      aria-hidden={!item}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lightbox__dialog" role="dialog" aria-modal="true" aria-label="Imagen ampliada">
        <button ref={closeButtonRef} className="lightbox__close" type="button" aria-label="Cerrar imagen" onClick={onClose}>
          ×
        </button>
        <img src={item?.src ?? fachadaEsquina} alt={item?.alt ?? ""} />
        <div className="lightbox__caption">{item?.fullCaption ?? ""}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [lightboxItem, setLightboxItem] = useState(null);
  useRevealMotion();

  return (
    <>
      <div className="page">
        <Header />
        <main id="inicio">
          <Hero />
          <Story />
          <Products />
          <Gallery onOpen={setLightboxItem} />
          <Visit />
        </main>
        <Footer />
      </div>
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </>
  );
}
