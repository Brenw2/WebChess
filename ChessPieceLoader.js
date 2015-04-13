function pieceLoader(color,piece,x,y,z) {
    var onProgress = function(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };

    var onError = function(xhr) {};

    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
    var loader = new THREE.OBJMTLLoader();
    loader.load('chessPiece/'+ color + piece + '.obj', 'chessPiece/'+ color + piece + '.mtl', function(object) {

        object.position.x = x;
        object.position.y = y;
        object.position.z = z;
        object.rotation.y = -1.57079633;
        scene.add(object);
        
        if(color == "Black"){
            object.rotation.y = 1.57079633;
        }
        
    }, onProgress, onError);


}