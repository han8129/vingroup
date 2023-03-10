// import '../../../node_modules/jquery/dist/jquery.js';
let currentMouseX;
let originalMouseX;
let currentTranslateX = 0;
const elementToTranslate = document.querySelector('.custom-scroll_overflow');
const elementToBlur = document.querySelector('.custom_to-blur')


function getMouseXDelta(event) {
    let windDownWidth = window.screen.width
    let isOverDragged = (
        currentTranslateX > windDownWidth
        || currentTranslateX < - windDownWidth
    ) ? true : false

    if (isOverDragged) {
        currentTranslateX = 0
        originalMouseX = 0
        elementToBlur.classList.remove("md:blur-md")
    } else {
        currentMouseX = event.clientX
        currentTranslateX += currentMouseX - originalMouseX
    }

    if (currentTranslateX < - 200) {
        elementToBlur.classList.add("md:blur-md")
    } else {
        elementToBlur.classList.remove("md:blur-md")
    }

    elementToTranslate.style.setProperty("transform", "translateX(" + currentTranslateX + "px)")
    originalMouseX = currentMouseX
}

const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            elementToTranslate.addEventListener('pointerdown', (pointerdown) => {
                originalMouseX = pointerdown.clientX

                elementToTranslate.setPointerCapture(pointerdown.pointerId)
                elementToTranslate.classList.remove('duration-500')
                elementToTranslate.addEventListener('pointermove', getMouseXDelta)
                elementToTranslate.addEventListener(
                    'pointerup',
                    () => {
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
            elementToBlur.classList.remove("blur-md")
        }
    })
});

observerScroll.observe(elementToTranslate)