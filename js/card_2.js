import * as THREE from 'three';

const contenedor = document.getElementById('About_3c2');
const textureLoader = new THREE.TextureLoader();

// 2. Cargar la imagen y asignarla al mapa del material
const texture = textureLoader.load('./img/l.webp', () => {
    // Opcional: forzar renderizado si la escena ya se dibujó
    renderer.render(scene, camera); 
});

// 3. Crear el material con la textura
const materialess = new THREE.MeshBasicMaterial({ 
    map: texture 
});
// Obtener dimensiones del contenedor (no de la ventana)
const W = contenedor.clientWidth;
const H = contenedor.clientHeight;

const scene  = new THREE.Scene();



const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(W, H);        // tamaño del contenedor, NO de window
renderer.setClearColor(0X00262f,0)

// Añadir el canvas generado al div contenedor
contenedor.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera( 75, W / H, 0.1, 1000 );
camera.position.set(0, 0, 4);


renderer.setSize( W, H );
renderer.setAnimationLoop( animate );
contenedor.appendChild(renderer.domElement); 

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, materialess );
scene.add( cube );

const mouse = new THREE.Vector2(); // x, y normalizados

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth)  * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  // El eje Y se invierte porque DOM: Y crece hacia abajo
  //                              Three.js: Y crece hacia arriba
});

// En el loop: mover la cámara o un objeto con lerp para suavidad
let targetX = 0, targetY = 0;


camera.position.z = 2;

function animate( time ) {
    requestAnimationFrame(animate);

  // La cámara "sigue" al mouse con inercia
  targetX += (mouse.x * -0.5 - targetX) * 0.05; // lerp X
  targetY += (mouse.y * -0.3 - targetY) * 0.05; // lerp Y

  camera.position.x = targetX;
  camera.position.y = targetY;
  camera.lookAt(0, 0, 0); 
  renderer.render( scene, camera );

}