// Importamos las constantes y hooks necesarios
import { allCocktails } from '../../constant' // Importa la lista de cócteles
import { useRef, useState } from 'react' // Importa hooks de React
import { useGSAP } from '@gsap/react' // Importa el hook para GSAP
import gsap from 'gsap'; // Importa la librería GSAP para animaciones

// Definimos el componente Menu
const Menu = () => {
 // Creamos una referencia para el contenido
 const contentRef = useRef();
 // Estado para el índice del cóctel actual
 const [currentIndex, setCurrentIndex] = useState(0);
 
 // Usamos el hook de GSAP para animar elementos cuando cambia el índice
 useGSAP(() => {
	// Animación para el título
	gsap.fromTo('#title', { opacity: 0 }, { opacity: 1, duration: 1 });
	// Animación para las imágenes de los cócteles
	gsap.fromTo('.cocktail img', { opacity: 0, xPercent: -100 }, {
	 xPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut'
	})
	// Animación para el título de los detalles
	gsap.fromTo('.details h2', { yPercent: 100, opacity: 0 }, {
	 yPercent: 0, opacity: 100, ease: 'power1.inOut'
	})
	// Animación para la descripción de los detalles
	gsap.fromTo('.details p', { yPercent: 100, opacity: 0 }, {
	 yPercent: 0, opacity: 100, ease: 'power1.inOut'
	})
 }, [currentIndex]); // Dependencia del índice actual para re-ejecutar la animación
 
 // Total de cócteles disponibles
 const totalCocktails = allCocktails.length;
 
 // Función para ir a un índice específico de cóctel
 const goToSlide = (index) => {
	// Calcula el nuevo índice, asegurándose de que esté dentro del rango
	const newIndex = (index + totalCocktails) % totalCocktails;
	
	// Actualiza el índice actual
	setCurrentIndex(newIndex);
 }
 
 // Función para obtener un cóctel basado en un desplazamiento del índice actual
 const getCocktailAt = (indexOffset) => {
	// Devuelve el cóctel en el índice calculado
	return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
 }
 
 // Obtenemos el cóctel actual, anterior y siguiente
 const currentCocktail = getCocktailAt(0);
 const prevCocktail = getCocktailAt(-1);
 const nextCocktail = getCocktailAt(1);
 
 // Renderizamos el componente
 return (
	<section id="menu" aria-labelledby="menu-heading">
	 {/* // Imágenes decorativas para el menú */}
	 <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
	 <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />
	 
	 {/* // Título del menú, oculto para accesibilidad */}
	 <h2 id="menu-heading" className="sr-only">
		Cocktail Menu
	 </h2>
	 
	 {/* // Navegación de cócteles */}
	 <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
		{allCocktails.map((cocktail, index) => {
		 // Verificamos si el cóctel actual es el activo
		 const isActive = index === currentIndex;
		 
		 return (
			<button key={cocktail.id} className={`
				${isActive
				 ? 'text-white border-white' // Estilo activo
				 : 'text-white/50 border-white/50'} // Estilo inactivo
			 `}	onClick={() => goToSlide(index)} // Cambia al cóctel correspondiente al hacer clic
			>
			 {cocktail.name} 
             {/* // Nombre del cóctel */}
			</button>
		 )
		})}
	 </nav>
	 
	 <div className="content">
		<div className="arrows">
		 {/* // Botón para ir al cóctel anterior */}
		 <button className="text-left" onClick={() => goToSlide(currentIndex - 1)}>
			<span>{prevCocktail.name}</span> 
            {/* // Nombre del cóctel anterior */}
			<img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
		 </button>
		 
		 {/* // Botón para ir al cóctel siguiente */}
		 <button className="text-left" onClick={() => goToSlide(currentIndex + 1)}>
			<span>{nextCocktail.name}</span> 
            {/* // Nombre del cóctel siguiente */}
			<img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
		 </button>
		</div>
		
		<div className="cocktail">
		{/* Imagen del cóctel actual */}
		 <img src={currentCocktail.image} className="object-contain"/>
		</div>
		
		<div className="recipe">
		 <div ref={contentRef} className="info">
			<p>Recipe for:</p>
			<p id="title">{currentCocktail.name}</p> 
            {/* // Nombre del cóctel actual */}
		 </div>
		 
		 <div className="details">
			<h2>{currentCocktail.title}</h2> 
             {/* Título del cóctel actual */}
			<p>{currentCocktail.description}</p>
             {/* // Descripción del cóctel actual */}
		 </div>
		</div>
	 </div>
	</section>
 )
}

// Exportamos el componente Menu para usarlo en otras partes de la aplicación
export default Menu
