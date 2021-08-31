import './style.css'
import * as dat from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import potalVertexShader from './shaders/potal/vertex.glsl'
import potalFragmentShader from './shaders/potal/fragment.glsl'

/**
 * Base
 */

// Debug
const debugObject = {}
const gui = new dat.GUI({
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

// texture
const bakeTexture = textureLoader.load('texture.jpg')
bakeTexture.flipY = false
bakeTexture.encoding = THREE.sRGBEncoding

/**
 * Object
 */
const bakeMaterial = new THREE.MeshBasicMaterial({ map: bakeTexture })
const polelightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const woodMaterial = new THREE.MeshBasicMaterial({ color: 0xd44b14 })
const potalMaterial = new THREE.ShaderMaterial({
    vertexShader: potalVertexShader,
    side: THREE.DoubleSide,
    fragmentShader: potalFragmentShader,
    uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color('skyblue') },
        uColorEnd: { value: new THREE.Color('#B01EBD') },
    }

})
const asaineMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('tomato') })
const axeMaterial = new THREE.MeshBasicMaterial({ color: 0x69554e })
    // modal
gltfLoader.load('final.glb', (gltf) => {
    gltf.scene.traverse((child) => {
        child.material = bakeMaterial
    })

    // const groundPlane = gltf.scene.children.find(child => child.name == 'Plane')
    // groundPlane.material = new THREE.MeshBasicMaterial({
    //     color: new THREE.Color('blue'),
    //     side: THREE.DoubleSide
    // })

    const wood1 = gltf.scene.children.find(child => child.name == 'Cylinder004')
    const wood2 = gltf.scene.children.find(child => child.name == 'Cylinder007')
    const wood3 = gltf.scene.children.find(child => child.name == 'Cylinder006')
    const wood4 = gltf.scene.children.find(child => child.name == 'Cylinder005')
    const wood5 = gltf.scene.children.find(child => child.name == 'Cylinder010')



    // // asaine
    const asaine1 = gltf.scene.children.find(child => child.name == 'Cylinder008')
    const asaine2 = gltf.scene.children.find(child => child.name == 'Cylinder009')
    const asaine3 = gltf.scene.children.find(child => child.name == 'Cylinder011')

    // // axe
    const axe = gltf.scene.children.find(child => child.name == 'Cube024')
        //     // datdaing
    const datdaing = gltf.scene.children.find(child => child.name == 'Cube033')

    // polelight
    const polelight1 = gltf.scene.children.find(child => child.name == 'Cube038')
    const polelight2 = gltf.scene.children.find(child => child.name == 'Cube032')
        // potalligh
    const potalLight = gltf.scene.children.find(child => child.name == 'Circle')

    polelight1.material = polelightMaterial
    polelight2.material = polelightMaterial
        // E7DF42
        // B01EBD
        // 8A6F63
    wood1.material = woodMaterial
    wood2.material = woodMaterial
    wood3.material = woodMaterial
    wood4.material = woodMaterial
    wood5.material = woodMaterial

    asaine1.material = asaineMaterial
    asaine2.material = asaineMaterial
    asaine3.material = asaineMaterial

    axe.material = axeMaterial

    datdaing.material = axeMaterial

    potalLight.material = potalMaterial

    scene.add(gltf.scene)

})

const firefliesGeometry = new THREE.BufferGeometry()
const firefliesCount = 30
const positionArray = new Float32Array(firefliesCount * 3)
const scaleArray = new Float32Array(firefliesCount * 1)

for (let i = 0; i < firefliesCount; i++) {
    positionArray[i * 3] = (Math.random() - 0.5) * 4
    positionArray[i * 3 + 1] = Math.random() * 1.5
    positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4

    scaleArray[i] = Math.random()

}
firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

// Material
const firefliesMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 100 },
    }

})

gui.add(firefliesMaterial.uniforms.uSize, 'value', 0, 200).step(1).name('size')

const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial)
scene.add(fireflies)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    firefliesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding


debugObject.clearColor = '#181818'
renderer.setClearColor(debugObject.clearColor)
gui.addColor(debugObject, 'clearColor').onChange(() => {
    renderer.setClearColor(debugObject.clearColor)
})

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    firefliesMaterial.uniforms.uTime.value = elapsedTime

    potalMaterial.uniforms.uTime.value = elapsedTime

    camera.rotation.y += 1

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()