import gsap from "gsap"; // Importa la biblioteca GSAP para animaciones
import { SplitText } from "gsap/all"; // Importa la clase SplitText de GSAP para dividir texto en palabras
import { useGSAP } from "@gsap/react"; // Importa el hook useGSAP de la librería GSAP para animaciones en React

const About = () => {
  // Utiliza el hook useGSAP para crear animaciones al cargar el componente
  useGSAP(() => {
    // Divide el título en palabras para animaciones
    const titleSplit = SplitText.create("#about h2", {
      type: "words", // Tipo de división: palabras
    });

    // Crea una línea de tiempo de GSAP para manejar las animaciones al hacer scroll
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about", // Elemento que activa la animación
        start: "top center", // Comienza la animación cuando el top del elemento está en el centro de la ventana
      },
    });

    // Anima las palabras del título desde abajo hacia arriba
    scrollTimeline
      .from(titleSplit.words, {
        opacity: 0, // Comienza con opacidad 0
        duration: 1, // Duración de la animación
        yPercent: 100, // Comienza desde el 100% hacia abajo
        ease: "expo.out", // Tipo de easing para la animación
        stagger: 0.02, // Retraso entre cada palabra
      })
      .from(
        ".top-grid div, .bottom-grid div",
        {
          opacity: 0, // Comienza con opacidad 0
          duration: 1, // Duración de la animación
          ease: "power1.inOut", // Tipo de easing para la animación
          stagger: 0.04, // Retraso entre cada div
        },
        "-=0.5"
      ); // Comienza esta animación 0.5 segundos antes de que termine la anterior
  });

  return (
    <div id="about">
      {" "}
      {/* Sección principal "About" */}
      <div className="mb-16 md:px-0 px-5">
        {" "}
        {/* Contenedor principal con márgenes y padding */}
        <div className="content">
          {" "}
          {/* Contenedor para el contenido */}
          <div className="md:col-span-8">
            {" "}
            {/* Columna para el título y descripción */}
            <p className="badge">Best Cocktails</p>{" "}
            {/* Etiqueta de mejor cóctel */}
            <h2>
              Where every detail matters <span className="text-white">-</span>
              from muddle to garnish {/* Título principal */}
            </h2>
          </div>
          <div className="sub-content">
            {" "}
            {/* Contenedor para el contenido secundario */}
            <p>
              Every cocktail we serve is a reflection of our obsession with
              detail — from the first muddle to the final garnish. That care is
              what turns a simple drink into something truly memorable.
            </p>
            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span>4.5</span>/5 {/* Calificación */}
              </p>
              <p className="text-sm text-white-100">
                More than +12000 customers {/* Número de clientes */}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="top-grid">
        {" "}
        {/* Contenedor para la primera fila de imágenes */}
        <div className="md:col-span-3">
          {" "}
          {/* Columna para la primera imagen */}
          <div className="noisy" /> {/* Elemento decorativo */}
          <img src="/images/abt1.png" alt="grid-img-1" /> {/* Imagen 1 */}
        </div>
        <div className="md:col-span-6">
          {" "}
          {/* Columna para la segunda imagen */}
          <div className="noisy" /> {/* Elemento decorativo */}
          <img src="/images/abt2.png" alt="grid-img-2" /> {/* Imagen 2 */}
        </div>
        <div className="md:col-span-3">
          {" "}
          {/* Columna para la tercera imagen */}
          <div className="noisy" /> {/* Elemento decorativo */}
          <img src="/images/abt5.png" alt="grid-img-5" /> {/* Imagen 3 */}
        </div>
      </div>
      <div className="bottom-grid">
        {" "}
        {/* Contenedor para la segunda fila de imágenes */}
        <div className="md:col-span-8">
          {" "}
          {/* Columna para la cuarta imagen */}
          <div className="noisy" /> {/* Elemento decorativo */}
          <img src="/images/abt3.png" alt="grid-img-3" /> {/* Imagen 4 */}
        </div>
        <div className="md:col-span-4">
          {" "}
          {/* Columna para la quinta imagen */}
          <div className="noisy" /> {/* Elemento decorativo */}
          <img src="/images/abt4.png" alt="grid-img-4" /> {/* Imagen 5 */}
        </div>
      </div>
    </div>
  );
};

export default About; // Exporta el componente About para su uso en otras partes de la aplicación
