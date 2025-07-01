import gsap from "gsap"; // Importa la biblioteca GSAP para animaciones
import { useGSAP } from "@gsap/react"; // Importa el hook useGSAP de la librería GSAP para animaciones
import { SplitText } from "gsap/all"; // Importa la clase SplitText de GSAP para dividir texto en caracteres y líneas
import { useRef } from "react"; // Importa useRef para crear referencias a elementos del DOM
import { useMediaQuery } from "react-responsive"; // Importa useMediaQuery para manejar consultas de medios

const Hero = () => {
  const videoRef = useRef(); // Crea una referencia para el elemento de video

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Verifica si la pantalla es de tamaño móvil

  useGSAP(() => {
    // Utiliza el hook useGSAP para crear animaciones al cargar el componente
    const heroSplit = new SplitText(".title", { type: "chars, words" }); // Divide el título en caracteres y palabras

    const paragraphSplit = new SplitText(".subtitle", { type: "lines" }); // Divide el subtítulo en líneas

    // Añade una clase CSS a cada carácter del título para aplicar un efecto de gradiente
    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    // Anima los caracteres del título desde abajo hacia arriba
    gsap.from(heroSplit.chars, {
      yPercent: 100, // Comienza desde el 100% hacia abajo
      duration: 1.8, // Duración de la animación
      ease: "expo.out", // Tipo de easing para la animación
      stagger: 0.05, // Retraso entre cada carácter
    });

    // Anima las líneas del subtítulo desde abajo hacia arriba con opacidad
    gsap.from(paragraphSplit.lines, {
      opacity: 0, // Comienza con opacidad 0
      yPercent: 100, // Comienza desde el 100% hacia abajo
      duration: 1.8, // Duración de la animación
      ease: "expo.out", // Tipo de easing para la animación
      stagger: 0.06, // Retraso entre cada línea
      delay: 1, // Retraso antes de comenzar la animación
    });

    // Crea una línea de tiempo para animar las hojas al hacer scroll
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero", // Elemento que activa la animación
          start: "top top", // Comienza la animación cuando el top del elemento está en la parte superior de la ventana
          end: "bottom top", // Termina la animación cuando el bottom del elemento está en la parte superior de la ventana
          scrub: true, // Permite que la animación se sincronice con el desplazamiento
        },
      })
      .to(".right-leaf", { y: 200 }, 0) // Mueve la hoja derecha hacia abajo
      .to(".left-leaf", { y: -200 }, 0); // Mueve la hoja izquierda hacia arriba

    // Define los valores de inicio y fin para la animación del video según el tamaño de la pantalla
    const startValue = isMobile ? "top 50%" : "center 60%"; // Valor de inicio
    const endValue = isMobile ? "120% top" : "bottom top"; // Valor de fin

    // Crea una línea de tiempo para la animación del video
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video", // Elemento que activa la animación
        start: startValue, // Valor de inicio
        end: endValue, // Valor de fin
        scrub: true, // Permite que la animación se sincronice con el desplazamiento
        pin: true, // Fija el video en su lugar durante la animación
      },
    });

    // Cuando los metadatos del video se cargan, anima el tiempo actual del video hasta su duración total
    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration, // Establece el tiempo actual del video a su duración
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy"> {/* Sección principal del héroe */}
        <h1 className="title">MOJITO</h1> {/* Título principal */}
        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf" // Hoja izquierda
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf" // Hoja derecha
          className="right-leaf"
        />
        <div className="body"> {/* Contenedor para el contenido */}
          <div className="content"> {/* Contenido principal */}
            <div className="space-y-5 hidden md:block"> {/* Espaciado y oculto en móviles */}
              <p className="">Cool. Crisp. Classic</p> {/* Descripción breve */}
              <p className="subtitle"> {/* Subtítulo */}
                Sip the Spirit <br /> of Summer
              </p>
            </div>
            <div className="view-cocktails"> {/* Sección para ver cócteles */}
              <p className="subtitle"> {/* Descripción de los cócteles */}
                Every cocktail we serve is a reflection of our obsession with
                detail — from the first muddle to the final garnish. That care
                is what turns a simple drink into something truly memorable.
              </p>
              <a href="#cocktails">View Cocktails</a> {/* Enlace para ver cócteles */}
            </div>
          </div>
        </div>
      </section>
      <div className="video absolute inset-0"> {/* Contenedor para el video */}
        <video
          ref={videoRef} // Referencia al elemento de video
          src="/videos/output.mp4" // Fuente del video
          muted // Silencia el video
          playsInline // Permite que el video se reproduzca en línea
          preload="auto" // Precarga el video
        />
      </div>
    </>
  );
};

export default Hero; // Exporta el componente Hero para su uso en otras partes de la aplicación
