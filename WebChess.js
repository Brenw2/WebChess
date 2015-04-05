var container, stats;

var camera, scene, renderer;

var mouseX = 0,
    mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var bishop;




init();
animate();


function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 1;
    camera.position.y = 3;
    camera.position.x = 1;
    // scene
    scene = new THREE.Scene();

    //lights
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(2, 4, -3).normalize();
    scene.add(directionalLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(-2, 4, 0).normalize();
    scene.add(directionalLight);

    // models
    whiteBishop();
    ChessBoard();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;

    window.addEventListener('resize', onWindowResize, false);

}

function whiteBishop() {
    var onProgress = function(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };

    var onError = function(xhr) {};


    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
    var loader = new THREE.OBJMTLLoader();
    loader.load('chessPiece/WhiteBishop.obj', 'chessPiece/WhiteBishop.mtl', function(object) {
        
        object.position.x = .56;
        object.position.y = .03;
        object.position.z = .57;
        scene.add(object);
        runAnimationUp(object);
       
    }, onProgress, onError);
}

function ChessBoard() {
    var onProgress = function(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };

    var onError = function(xhr) {};


    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

    var loader = new THREE.OBJMTLLoader();
    loader.load('chessPiece/Chessboard.obj', 'chessPiece/Chessboard.mtl', function(object) {
        object.position.x = 0;
        object.position.y = 0;
        scene.add(object);
        runAnimationUp(object);
    }, onProgress, onError);

}

function onDocumentMouseMove(event) {

    event.preventDefault();

    if (isMouseDown) {

        theta = -((event.clientX - onMouseDownPosition.x) * 0.5) + onMouseDownTheta;
        phi = ((event.clientY - onMouseDownPosition.y) * 0.5) + onMouseDownPhi;

        phi = Math.min(180, Math.max(0, phi));

        camera.position.x = radious * Math.sin(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
        camera.position.y = radious * Math.sin(phi * Math.PI / 360);
        camera.position.z = radious * Math.cos(theta * Math.PI / 360) * Math.cos(phi * Math.PI / 360);
        camera.updateMatrix();

    }

    mouse3D = projector.unprojectVector(
        new THREE.Vector3(
            (event.clientX / renderer.domElement.width) * 2 - 1, -(event.clientY / renderer.domElement.height) * 2 + 1,
            0.5
        ),
        camera
    );
    ray.direction = mouse3D.subSelf(camera.position).normalize();

    interact();
    render();

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function runAnimationUp(object) {
      new TWEEN.Tween(object.position).to({
        x: .56,
        y: .3,
        z: .57
    }, 3000).delay(1000)
      .easing( TWEEN.Easing.Elastic.Out).start();
}

function runAnimationMove(object) {
     new TWEEN.Tween(object.position).to({
        x: .77,
        y: .3,
        z: .57
    }, 5000).delay(3000)
      .easing( TWEEN.Easing.Elastic.Out).start();
    
}

function runAnimationDown(object) {
    new TWEEN.Tween(object.position).to({
        x: .77,
        y: .03,
        z: .57
    }, 3000).delay(5000)
      .start();
    
}

//

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    TWEEN.update();
    camera.lookAt(scene.position);
    renderer.render(scene, camera);

}