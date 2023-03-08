// import '../../../node_modules/jquery/dist/jquery.js';
let currentMouseX;
let originalMouseX;
const elementToTranslate = document.querySelector('.custom-scroll_overflow');

function getMouseXDelta(event) {
    currentMouseX = event.pageX
    let mouseXDelta = - (originalMouseX - currentMouseX)
    console.log(mouseXDelta);

    elementToTranslate.style.setProperty("transform", "translateX(" + mouseXDelta + "px)")
}

elementToTranslate.addEventListener('pointerdown', (mousedown) => {
    elementToTranslate.setPointerCapture(mousedown.pointerId)
    getMouseXDelta(mousedown)
    originalMouseX = mousedown.pageX
    elementToTranslate.classList.remove('duration-500')

    elementToTranslate.addEventListener('pointermove', getMouseXDelta)

    elementToTranslate.addEventListener(
        'pointerup',
        () => {
            elementToTranslate.classList.add("duration-500")
            elementToTranslate.removeEventListener('pointermove', getMouseXDelta)
        },
        { once: true }
    )
})