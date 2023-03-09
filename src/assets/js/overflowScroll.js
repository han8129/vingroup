// import '../../../node_modules/jquery/dist/jquery.js';
let currentMouseX;
let originalMouseX;
var currentTranslateX = 0;
const elementToTranslate = document.querySelector('.custom-scroll_overflow');

function getMouseXDelta(event) {
    currentMouseX = event.clientX
    currentTranslateX += currentMouseX - originalMouseX
    elementToTranslate.style.setProperty("transform", "translateX(" + currentTranslateX + "px)")
    originalMouseX = currentMouseX
    console.log(currentTranslateX)
}

const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("Locked in")
            elementToTranslate.addEventListener('pointerdown', (pointerdown) => {
                    originalMouseX = pointerdown.clientX

                elementToTranslate.setPointerCapture(pointerdown.pointerId)
                elementToTranslate.classList.remove('duration-500')
                elementToTranslate.addEventListener('pointermove', getMouseXDelta)
                elementToTranslate.addEventListener(
                    'pointerup',
                    (pointerup) => {
                        elementToTranslate.removeEventListener('pointermove', getMouseXDelta)
                        elementToTranslate.classList.add("duration-500")
                    },
                    { once: true }
                )

            })
        } else {
            elementToTranslate.removeEventListener('pointermove', getMouseXDelta)
            elementToTranslate.classList.add("duration-500")
            elementToTranslate.style.removeProperty("transform")
        }
    })
});

observerScroll.observe(elementToTranslate)