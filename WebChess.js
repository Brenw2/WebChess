var container, stats;

var camera, scene, renderer;

var mouseX = 0,
    mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    //camera
    camera();

    // scene
    scene = new THREE.Scene();

    //lights
    directionalLightLeft();
    directionalLightRight();

    // models
    wKing = new whiteKing(.79, .03, -.12);
    
    wQueen = new whiteQueen(.79, .03, .11);
    
    wKnight1 = new whiteKnight(.79, .03, .80);
    wKnight2 = new whiteKnight(.79, .03, -.80);
    
    wBishop1 = new whiteBishop(.79, .03, .57);
    wBishop2 = new whiteBishop(.79, .03, -.57);
    
    wRook1 = new whiteRook(.79, .03, .34);
    wRook2 = new whiteRook(.79, .03, -.34);
    
    wPawn1 = new whitePawn(.56, .03, .80);
    wPawn2 = new whitePawn(.56, .03, .57);
    wPawn3 = new whitePawn(.56, .03, .34);
    wPawn4 = new whitePawn(.56, .03, .11);
    wPawn5 = new whitePawn(.56, .03, -.12);
    wPawn6 = new whitePawn(.56, .03, -.36);
    wPawn7 = new whitePawn(.56, .03, -.36);
    wPawn8 = new whitePawn(.56, .03, -.59);
    wPawn9 = new whitePawn(.56, .03, -.81);
    
    ChessBoard();

    //renderer
    renderer();

    //Scene Controls
    controls();

    window.addEventListener('resize', onWindowResize, false);
}

function camera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 12;
    camera.position.y = 3;
    camera.position.x = 0;
}

function directionalLightLeft() {
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(2, 4, -3).normalize();
    scene.add(directionalLight);
}

function directionalLightRight() {
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(-2, 4, 0).normalize();
    scene.add(directionalLight);
}

function renderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function controls() {
    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;

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

function tweeenUp(object) {
    tween = new TWEEN.Tween(object.position).to({
        x: .56,
        y: .3,
        z: .57
    }, 3000).delay(1000);
    tween.easing(TWEEN.Easing.Elastic.Out).start();

    object.position.x = .56;
    object.position.y = .3;
    object.position.z = .56;
}

function tweenAcross(object) {
    tween2 = new TWEEN.Tween(object.position).to({
        x: .045,
        y: .3,
        z: .57
    }, 3000).delay(3000);
    tween2.easing(TWEEN.Easing.Elastic.Out).start();

    object.position.x = .045;
    object.position.y = .3;
    object.position.z = .56;
}

function tweenDown(object) {
    tween3 = new TWEEN.Tween(object.position).to({
        x: .11,
        y: .03,
        z: .56
    }, 1000).delay(6000);
    tween3.start();

    object.position.x = .56;
    object.position.y = .03;
    object.position.z = .56
}



function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
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