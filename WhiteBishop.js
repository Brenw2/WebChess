function whiteBishop(x,y,z) {
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

        object.position.x = x;
        object.position.y = y;
        object.position.z = z;
        scene.add(object);
        
    }, onProgress, onError);


}