import * as THREE from 'three';

const contenedor = document.getElementById('About_3c3');
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

camera.position.z = 3;

function animate( time ) {
  camera.position.y = Math.cos(time / 1000);
  camera.position.x = Math.sin(time / 1000);
  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;
  camera.lookAt(0, 0, 0); 
  renderer.render( scene, camera );

}