import { useGSAP } from "@gsap/react"; // Importa el hook useGSAP de la librería GSAP para animaciones
import gsap from "gsap"; // Importa la biblioteca GSAP para animaciones
import { cocktailLists, mockTailLists } from "../../constant"; // Importa listas de cócteles y mocktails desde un archivo de constantes

const Cocktails = () => {
  // Utiliza el hook useGSAP para crear una animación basada en el desplazamiento de la página
  useGSAP(() => {
    // Crea una línea de tiempo de GSAP para manejar las animaciones
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails", // Elemento que activa la animación
        start: "top 30%", // Comienza la animación cuando el top del elemento está en el 30% de la ventana
        end: "bottom 80%", // Termina la animación cuando el bottom del elemento está en el 80% de la ventana
        scrub: true, // Permite que la animación se sincronice con el desplazamiento
      },
    });

    // Define las animaciones para los elementos de las hojas
    parallaxTimeline
      .from("#c-left-leaf", {
        x: -100, // Mueve la hoja izquierda desde la izquierda
        y: 100, // Mueve la hoja hacia arriba
      })
      .from("#c-right-leaf", {
        x: 100, // Mueve la hoja derecha desde la derecha
        y: 100, // Mueve la hoja hacia arriba
      });
  });

  return (
    <section id="cocktails" className="noisy">
      {" "}
      {/* Sección principal de cócteles */}
      <img
        src="/images/cocktail-left-leaf.png"
        alt="l-leaf"
        id="c-left-leaf"
      />{" "}
      {/* Hoja izquierda */}
      <img
        src="/images/cocktail-right-leaf.png"
        alt="r-leaf"
        id="c-right-leaf" // Hoja derecha
      />
      <div className="list">
        {" "}
        {/* Contenedor para las listas de cócteles y mocktails */}
        <div className="popular">
          {" "}
          {/* Sección de cócteles populares */}
          <h2>Most popular cocktails:</h2> {/* Título de la sección */}
          <ul>
            {cocktailLists?.map(
              (
                { name, country, detail, price } // Mapea la lista de cócteles
              ) => (
                <li key={name}>
                  {" "}
                  {/* Cada cóctel es un elemento de lista */}
                  <div className="md:me-28">
                    {" "}
                    {/* Contenedor para el nombre y detalles */}
                    <h3>{name}</h3> {/* Nombre del cóctel */}
                    <p>
                      {country} | {detail} {/* País y detalles del cóctel */}
                    </p>
                  </div>
                  <span>- {price}</span> {/* Precio del cóctel */}
                </li>
              )
            )}
          </ul>
        </div>
        <div className="loved">
          {" "}
          {/* Sección de mocktails más queridos */}
          <h2>Most loved mocktails:</h2> {/* Título de la sección */}
          <ul>
            {mockTailLists?.map(
              (
                { name, country, detail, price } // Mapea la lista de mocktails
              ) => (
                <li key={name}>
                  {" "}
                  {/* Cada mocktail es un elemento de lista */}
                  <div className="me-28">
                    {" "}
                    {/* Contenedor para el nombre y detalles */}
                    <h3>{name}</h3> {/* Nombre del mocktail */}
                    <p>
                      {country} | {detail} {/* País y detalles del mocktail */}
                    </p>
                  </div>
                  <span>- {price}</span> {/* Precio del mocktail */}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails; // Exporta el componente Cocktails para su uso en otras partes de la aplicación
