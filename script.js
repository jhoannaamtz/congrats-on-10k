// ----- INITIALIZE SCENE -----
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0e0e0e);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 3, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);

// ----- LIGHTING -----
const ambient = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambient);

const point = new THREE.PointLight(0xffffff, 1);
point.position.set(5, 5, 5);
scene.add(point);

// ----- 3D CAKE -----
const cakeGroup = new THREE.Group();

// bottom layer
const geo1 = new THREE.CylinderGeometry(2, 2, 1, 32);
const mat1 = new THREE.MeshStandardMaterial({
    color: 0x1e88e5,  // Clash Royale blue
});
const layer1 = new THREE.Mesh(geo1, mat1);
cakeGroup.add(layer1);

// top layer
const geo2 = new THREE.CylinderGeometry(1.3, 1.3, 1, 32);
const mat2 = new THREE.MeshStandardMaterial({
    color: 0xfbc02d, // gold layer
});
const layer2 = new THREE.Mesh(geo2, mat2);
layer2.position.y = 1;
cakeGroup.add(layer2);

// Clash Royale crown topper
const crownGeo = new THREE.ConeGeometry(0.7, 1, 6);
const crownMat = new THREE.MeshStandardMaterial({
    color: 0xffd600
});
const crown = new THREE.Mesh(crownGeo, crownMat);
crown.position.y = 2;
cakeGroup.add(crown);

scene.add(cakeGroup);

// ----- ROTATION CONTROLS -----
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ----- CONFETTI -----
function burstConfetti() {
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.7 }
    });
}

burstConfetti();

// ----- ANIMATION LOOP -----
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();


// ----- AUDIO -----
const overlay = document.getElementById("overlay");
const playBtn = document.getElementById("playBtn");
const bgm = document.getElementById("bgm");

playBtn.onclick = () => {
    bgm.play();
    overlay.style.display = "none";
};

// ----- RESIZE FIX -----
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
