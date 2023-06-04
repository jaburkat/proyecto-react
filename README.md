# PONTOCOLOR 
Tienda de pintureria realizada en react + firebase.


👉 [DEMO (FIREBASE HOSTING)](https://proyecto-react-a1f5e.web.app/)

![GIF DEMO](./assets/demo.gif)

## Características

- Se conecta a cloud Firestore donde se encuentra una colección "productos" y desde ahí muestra el listado de productos.
- Los productos se pueden filtrar por categorías: Accesorios y Pinturas.
- En el detalle del producto se puede incrementar o disminuir la cantidad a comprar.
- En resumen de compra se puede vaciar el carrito o finalizar la compra.
- En el checkout los campos están validados mediante expresiones regulares. Si todos los campos están rellenados correctamente, se habilita el botón "finalizar". Al pulsar en dicho botón se genera la orden y se almacena en una colección "órdenes" en Firestore. 
- El checkout solo es accesible desde "Terminar compra".
- Cada producto cuenta con un stock que disminuye a medida que se compran y al llegar a 0 este producto ya no está disponible para su compra.
- Si una ruta no es encontrada muestra: "ERROR 404".


## Configuración
Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona este repositorio en tu computadora: `git clone https://github.com/jaburkat/proyecto-react.git`
2. Navega hasta el directorio del proyecto: `cd proyecto-react`
3. Instala las dependencias del proyecto: `npm install`

## Uso
Una vez que hayas configurado el proyecto, puedes ejecutarlo con el siguiente comando:

`npm start`

Esto iniciará la aplicación en modo de desarrollo. Abre tu navegador web y visita http://localhost:3000 para ver la aplicación en acción.
