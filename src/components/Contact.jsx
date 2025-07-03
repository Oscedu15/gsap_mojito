// Importamos las constantes y hooks necesarios
import { openingHours, socials } from "../../constant"; // Importa las horas de apertura y redes sociales
import { useGSAP } from "@gsap/react"; // Importa el hook para GSAP
import { SplitText } from "gsap/all"; // Importa la funcionalidad para dividir texto
import gsap from "gsap"; // Importa la librería GSAP para animaciones

// Definimos el componente Contact
const Contact = () => {
  // Usamos el hook de GSAP para animar elementos al hacer scroll
  useGSAP(() => {
    // Dividimos el título en palabras para animarlo
    const titleSplit = SplitText.create("#contact h2", { type: "words" });

    // Creamos una línea de tiempo para las animaciones
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact", // Elemento que activa la animación
        start: "top center", // Cuando el top del elemento está en el centro de la ventana
      },
      ease: "power1.inOut", // Tipo de easing para la animación
    });

    // Definimos las animaciones en la línea de tiempo
    timeline
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02, // Animación de las palabras del título
      })
      .from("#contact h3, #contact p", {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02, // Animación para subtítulos y párrafos
      })
      .to("#f-right-leaf", {
        y: "-50",
        duration: 1,
        ease: "power1.inOut", // Animación para la hoja derecha
      })
      .to(
        "#f-left-leaf",
        {
          y: "-50",
          duration: 1,
          ease: "power1.inOut", // Animación para la hoja izquierda
        },
        "<"
      ); // Sincroniza con la animación anterior
  });

  // Renderizamos el componente
  return (
    <footer id="contact">
      <img
        src="/images/footer-right-leaf.png"
        alt="leaf-right"
        id="f-right-leaf"
      />
      <img
        src="/images/footer-left-leaf.png"
        alt="leaf-left"
        id="f-left-leaf"
      />

      <div className="content">
        <h2>Where to Find Us</h2>

        <div>
          <h3>Visit Our Bar</h3>
          <p>456, Raq Blvd. #404, Los Angeles, CA 90210</p>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>(555) 987-6543</p>
          <p>hello@jsmcocktail.com</p>
        </div>

        <div>
          <h3>Open Every Day</h3>
          {/* // Subtítulo para horarios */}
          {openingHours?.map(
            (
              time // Mapeamos las horas de apertura
            ) => (
              <p key={time.day}>
                {time.day} : {time.time}
                {/* // Día y hora */}
              </p>
            )
          )}
        </div>

        <div>
          <h3>Socials</h3>
          {/* // Subtítulo para redes sociales */}

          <div className="flex-center gap-5">
            {/* // Contenedor para los íconos de redes sociales */}
            {socials?.map(
              (
                social // Mapeamos las redes sociales
              ) => (
                <a
                  key={social.name} // Clave única para cada enlace
                  href={social.url} // URL de la red social
                  target="_blank" // Abre en una nueva pestaña
                  rel="noopener noreferrer" // Mejora la seguridad
                  aria-label={social.name} // Etiqueta accesible
                >
                  <img src={social.icon} />
                  {/* // Ícono de la red social */}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Exportamos el componente Contact para usarlo en otras partes de la aplicación
export default Contact;
