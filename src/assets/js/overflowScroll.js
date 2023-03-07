// import '../../../node_modules/jquery/dist/jquery.js';
let currentMouseX;
let originalMouseX;
const elementToTranslate = document.querySelector('.custom-scroll_overflow');
let mouseIsUp = false;

elementToTranslate.onmousedown = (mousedown) => {
    mouseIsUp = false
    originalMouseX = mousedown.pageX
    elementToTranslate.style.setProperty("transition", "none", "important")
}

elementToTranslate.addEventListener('mousemove', (event) =>{
    if (mouseIsUp) {
        return
    }

    currentMouseX = event.pageX
    let mouseXDelta = - (originalMouseX - currentMouseX)
    console.log(mouseXDelta);

    elementToTranslate.style.setProperty("transform", "translateX(" + mouseXDelta + "px)", "important")
})

elementToTranslate.onmouseup = (event) => {
    elementToTranslate.style.removeProperty("transition")
    originalMouseX = event.pageX
    mouseIsUp = true;
    elementToTranslate.removeEventListener('mousemove')
}