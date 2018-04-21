const pixel = function(src, size) {
	let ratio = window.devicePixelRatio
    if(ratio < 2){
        return src + `_240x240.jpg`
    }
    if(ratio < 3){
        return src + `_480x480.jpg`
    }
    if(ratio < 4){
        return src + `_640x640.jpg`
    }
    return src + `_640x640.jpg`
}

export default pixel
