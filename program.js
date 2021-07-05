console.log("Cuando una página web se abre en un navegador, el navegador recupera el código HTML de la página y lo analiza: crea un modelo");
console.log("de la estructura del documento y usa este modelo para generar la página en la pantalla. Esta representación del documento, es");
console.log("una estructura de datos que se puede leer o modificar dinámicamente (en tiempo de ejecución).");

console.log();

console.log("Un documento HTML se puede imaginar como un conjunto de cajas anidadas. Las etiquetas body, contienen otras etiquetas, y");
console.log("estas etiquetas contienen texto, u otras etiquetas e.g. pgs. 224-225");
console.log("Por cada caja, hay un objeto con el que podemos interactuar para averiguar cosas como qué etiqueta HTML representa y qué");
console.log("etiquetas y texto contiene. Esta representación se denomina Modelo de objetos del documento o DOM.");
console.log("El documento vinculante global nos da acceso a estos objetos.");
console.log("Su propiedad documentElement (document.documentElement.childNodes) se refiere al objeto que");
console.log("representa la etiqueta <html>. Dado que cada documento HTML tiene un encabezado y un cuerpo, también tiene propiedades de");
console.log("encabezado y cuerpo, apuntando a esos elementos.");

console.log();

console.log("El DOM se representa mediante una estructura arborescente (ramificada). Su raíz es siempre document.documentElement (<html>)");
console.log("y cada nodo representa una etiqueta HTML (o elemento) diferente y pueden tener nodos secundarios (hijos u hojas)");
console.log("e.g. document.body. Cada objeto de nodo del DOM tiene una propiedad 'nodeType' que contiene un código (número) que");
console.log("identifica el tipo de nodo que también es definida como la propiedad constante Node.ELEMENT_NODE. También existen las");
console.log("propiedades Node.TEXT_NODE o Node.COMMENT_NODE. Visualización alternativa del árbol pg 226 en que las hojas son textos.");

console.log();

console.log("Los nodos DOM contienen una gran cantidad de enlaces a otros nodos cercanos e.g. diagrama pg. 227.");

function talksAbout(node, string) {
	if (node.nodeType == Node.ELEMENT_NODE) {
		for (let child of node.childNodes) {
			if (talksAbout(child, string)) return true;
		}
		return false;
	}
	else if (node.nodeType == Node.TEXT_NODE) return node.nodeValue.indexOf(string) > -1;
}

console.log("A menudo resulta útil navegar por estos vínculos entre padres, hijos y hermanos pero si queremos encontrar un nodo específico");
console.log("es una mala idea ja que puede cambiar la estructura del documento, y se crean automáticamente nodos de texto que representan");
console.log("espacios en blanco entre los demás nodos. Para acceder directamente a un nodo específico es más fácil usar el siguiente");
console.log("método:");

let link = document.body.getElementsByTagName("a")[0];
console.log(link.href);

console.log("Mediante este método, obtendremos todos los elementos que tienen la etiqueta 'a'. Si queremos obtener un único nodo, se le");
console.log("tiene que asignar a este, un atributo id y usar el método que se muestra a continuación:");

let ia = document.getElementById("ia");
console.log(ia.src);

console.log("Un tercer método, similar a los anteriores, es 'getElementsByClassName' que obtiene todos los elementos que tengan un atributo");
console.log("class en concreto.");

console.log();

console.log("Casi todo lo relacionado con la estructura de datos DOM se puede modificar: cambiar las relaciones entre padres e hijos,");
console.log("eliminar nodos o agregar un nodo hijo a otro nodo mediante 'appendChild' o 'insertBefore' e.g. li tags of index.html");

let paragraphs = document.body.getElementsByTagName("li");
document.body.getElementsByTagName("ul")[0].insertBefore(paragraphs[2], paragraphs[0]);

console.log("Supongamos que queremos escribir un script que reemplaze todas las imágenes del documento por el texto contenido en sus");
console.log("atributos 'alt' que representan una alternativa de representación textual. Pare ello tenemos que eliminar las imágenes");
console.log("y crear y agregar nuevos nodos textuales. Los nodos se crean mediante 'document.createTextNode'");

function replaceImages() {
	let images = document.body.getElementsByTagName("img");
	for (let i = images.length - 1; i >= 0; i--) {
		let image = images[i];
		if (image.alt) {
			let text = document.createTextNode(image.alt);
			image.parentNode.replaceChild(text, image);
		}
	}
}

console.log("Para crear nodos de elementos se usa el método 'document.createElement' que toma como parámetro un nombre de etiqueta");
console.log("y devuelve un elemento vacío. E.g.:");

function elt(type, ...children) {
	let node = document.createElement(type);
	for (let child of children) {
		if (typeof child != "string") node.appendChild(child);
		else node.appendChild(document.createTextNode(child));
	}
	return node;
}

function appendNotes() {
	document.getElementById("quote").appendChild(
		elt("footer", "-",
			elt("strong", "Karl Popper"),
			", preface to the second edition of ",
			elt("em", "The Open Society and Its Enemies"),
			", 1950"));
}

console.log("Podemos acceder a algunos atributos de algunos elementos e.g. href, a través de una propiedad que tiene el mismo nombre");
console.log("que el atributo. Estos son atributos estándar, pero HTML nos permite establecer cualquier atributo que deseemos.");

function ocultar() {
	let paras = document.body.getElementsByTagName("p");
	for (let para of Array.from(paras)) {
		if (para.getAttribute("data-classified") == "secret") para.remove();
	}
}

function colorear() {
	let sample = document.getElementById("presentation");
	sample.setAttribute("style", "color: green");
}

console.log("Hay elementos HTML que son bloques y se presentan en líneas diferentes (como <p>), y otros elementos que se presentan");
console.log("en la misma línea (<a> o <strong>). El navegador establece un diseño por defecto en base a esta información,");
console.log("no obstante, se puede acceder al tamaño y a la posición de un elemento desde JS, mediante unas propiedades inherentes");
console.log("a cualquier elemento, que muestran la anchura y altura interior o exterior:");
console.log("https://developer.mozilla.org/es/docs/Web/API/HTMLElement/offsetWidth");
console.log("https://developer.mozilla.org/es/docs/Web/API/Element/clientWidth");

let para = document.body.getElementsByTagName("p")[0];
console.log("clientHeight:", para.clientHeight);
console.log("clientWidth:", para.clientWidth);
console.log("offsetHeight:", para.offsetHeight);
console.log("offsetWidth:", para.offsetWidth);

console.log("Para encontrar la posición que ocupa un elemento en la pantalla se usa el método 'getBoundingClientRect', que devuelve");
console.log("la propiedades x e y del elemento, que representan la distancia del elemento respecto de la esquina superior izquierda");
console.log("y las propiedades top, left, right y bottom. Los valores de cada atributo son píxeles e.g.");

console.log(document.body.getBoundingClientRect());

console.log("Las propiedades 'pageXOffset' y 'pageYOffset' devuelven la posición relativa del scroll.");
console.log("A continuación, comparamos el tiempo de ejecución de dos programas diferentes que cambian el diseño de la página");
console.log("leyendo y modificando el DOM pg. 234");

console.log();

console.log("Podemos cambiar el estilo por defecto asociado a un documento mediante la propiedad 'style'. Esta propiedad puede");
console.log("contener una o más declaraciones (estilos CSS en línea). Por ejemplo la propiedad display, controla si un elemento");
console.log("se muestra como un bloque o un elemento en línea pg. 235");

console.log();

console.log("Mediante JS podemos manipular directamente el estilo de un elemento a través de la propiedad style del elemento:");

let para2 = document.getElementById("para");
console.log(para2.style.color);
para2.style.color = "magenta";

console.log();

console.log("El sistema de estilos de HTML se llama CSS, que es un conjunto de reglas para aplicar estilos a los elementos de");
console.log("un documento. Se pueden establecer dentro de la etiqueta <style> e.g. index.html");
console.log("Existen diferentes notaciones para referirse a los elementos, según la etiqueta, el ID o la clase.");

console.log();

console.log("El método 'querySelectorAll' de un elemento, devuelve una NodeList que representa una lista de elementos del");
console.log("documento que coinciden con el grupo de selectores indicados.");

function count(selector) {
	return document.querySelectorAll(selector).length;
}

console.log(count("p"));
console.log(count("strong"));
console.log(count("li"));
console.log(count("button"));

console.log();

console.log("La propiedad position, tiene el valor static, por defecto. Cuando se cambia el valor por relative, el elemento");
console.log("al que afecta, sigue ocupando el espacio que ocupaba por defecto, pero se puede mover cambiando el valor de");
console.log("atributos top y left. Cuando el valor de position, se cambia por absolute, el elemento al que afecta se");
console.log("elimina del flujo normal del documento i.e. ya no ocupa el espacio que ocupaba y puede superponerse con otros");
console.log("elementos. Además se puede cambiar el valor de los atributos top y left, para mover el elemento respecto del");
console.log("elemento que lo contiene o respecto del documento per se. A partir de esto, podemos crear una animación.");
console.log("El siguiente script muestra un gato moviéndose en una elipse:");

let cat = document.querySelector("img");
let hat = document.getElementById("hat");
let angle = Math.PI / 2;
function animate(time, lastTime) {
	//El ángulo se incrementa en 0.001 * la diferencia del tiempo que tarda en cargarse la página desde la última vez
	//que se cargo.
	if (lastTime != null) angle += (time - lastTime) * 0.001;
	//Cosinus representa el eje x y sinus el eje y (suponiendo que la circunferencia tiene radio 1 y considerando el teorema de Tales)
	//Se multiplican por 200 y 50 respectivamente para que la imagen se desplace siguiendo la trayectoria de una elipse. Si quisiéramos
	//que la trayectoria fuese un círculo, estos valores tendrían que ser iguales.
	cat.style.top = (Math.sin(angle) * 50) + "px";
	cat.style.left = (Math.cos(angle) * 200) + "px";

	hat.style.top = (Math.cos(angle) * 50) + "px";
	hat.style.left = (Math.sin(angle) * 200) + "px";

	requestAnimationFrame(newTime => animate(newTime, time));
}
requestAnimationFrame(animate);

console.log("Inicialmente, la imagen del gato está centrada en la página y el valor de su propiedad position es relative.");
console.log("Se actualizan constantemente las propiedades top y left de la imagen para moverla.");
console.log("La función 'requestAnimationFrame' se utiliza para ejecutar la animación de forma eficiente. Esta función");
console.log("se sincroniza automáticamente con el navegador y genera una animación fluida, mejor que con 'setInterval'.");
console.log("Además le pasa un argumento al callback, (animate en este caso), que contiene el valor del tiempo que tarda");
console.log("en cargarse la página, en ms.");

