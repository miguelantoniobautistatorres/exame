
import * as THREE from 'three';

const contenedor = document.getElementById('About_3D');

// Obtener dimensiones del contenedor (no de la ventana)
const W = contenedor.clientWidth;
const H = contenedor.clientHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,                               // FOV: 75° es un valor natural
  //window.innerWidth / window.innerHeight, // relación de aspecto
  W / H, // relación de aspecto
  0.1,                              // plano cercano (near)
  1000                              // plano lejano (far)
);
camera.position.set(0, 0, 5); // posición X, Y, Z en el espacio 3D
camera.lookAt(0, 0, 0);  

const renderer = new THREE.WebGLRenderer();
//renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setSize( W, H );
renderer.setAnimationLoop( animate );
//document.body.appendChild( renderer.domElement );
contenedor.appendChild(renderer.domElement); // ← key line


const geometry_cubo = new THREE.SphereGeometry(0.5, 32, 32);
const geometry_cubo2 = new THREE.SphereGeometry(0.5, 32, 32);
const geometry_cubo3 = new THREE.SphereGeometry(0.5, 32, 32);
const geometry_luna = new THREE.SphereGeometry(0.5, 32, 32);

const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const matBasico = new THREE.MeshBasicMaterial({
  color: '#ff6b35',
  wireframe: false   // true → muestra solo las aristas
});
const matStandard = new THREE.MeshStandardMaterial({
  color:     '#4aa8ff', // color base
  metalness: 0.3,       // 0 = plástico, 1 = metal puro
  roughness: 0.4        // 0 = espejo, 1 = completamente rugoso
});

const ci = new THREE.Mesh( geometry_cubo, matStandard );
const c2 = new THREE.Mesh( geometry_cubo2, matStandard );
const c3 = new THREE.Mesh( geometry_cubo3, matStandard );
const lu = new THREE.Mesh( geometry_luna, matStandard );
scene.add( ci );
scene.add( c2 );
scene.add( c3 );
scene.add( lu );



const luzAmbiente = new THREE.AmbientLight('#ffffff', 0.5); // color, intensidad
scene.add(luzAmbiente);

// DirectionalLight: como el sol, rayos paralelos, produce sombras
const luzDireccional = new THREE.DirectionalLight('#ffffff', 1.5);
luzDireccional.position.set(5, 10, 7); // posición de la fuente de luz
scene.add(luzDireccional);

// PointLight: como una bombilla, emite en todas las direcciones
const luzPunto = new THREE.PointLight('#ff6b35', 2, 10); // color, intensidad, distancia
luzPunto.position.set(-3, 2, 2);
scene.add(luzPunto);

ci.position.x = 0


camera.position.z = 7;


function animate(time) {
  ci.position.y = 2.8*Math.sin(time*0.09);
  ci.position.x = 2.8*Math.cos(time*0.09);

  c2.position.y = 3.4*Math.sin(7+time*0.05);
  c2.position.z = 3.4*Math.cos(7+time*0.05);

  c3.position.x = 3*Math.sin(12+time*0.02);
  c3.position.z = 3*Math.cos(12+time*0.02);
  renderer.render(scene, camera);
}

