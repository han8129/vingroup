// import '../../../node_modules/jquery/dist/jquery.js';
let currentMouseX;
let originalMouseX;
let currentTranslateX = 0;
let windDownWidth = window.screen.width;

const elementToTranslate = document.querySelector(".custom-scroll_overflow");
const elementToBlur = document.querySelector(".custom_to-blur");

const cardsToAnimate = document.getElementsByClassName("custom_hover-card");
let isDragged = false;
let removeDuration500 = () => elementToTranslate.classList.remove("duration-500");
let addDuration500 = () => elementToTranslate.classList.add("duration-500");

let addBlur = () => {
    elementToBlur.classList.add("md:blur-md");
}

let removeBlur = () => {
    elementToBlur.classList.remove("md:blur-md");
}

function removeRedBackground() {
    for (let index = 0; index < cardsToAnimate.length; index++) {
        let card = cardsToAnimate[index];
        let toDropDown = card.querySelector("span");

        toDropDown.classList.add("h-0");
        toDropDown.classList.remove("h-full");
        toDropDown.classList.remove("p-3");
    }
}

function resetElementTranslate() {
    elementToTranslate.removeEventListener("pointermove", getMouseXDelta);
    addDuration500()
    elementToTranslate.style.removeProperty("transform");
    removeBlur()
    currentTranslateX = 0;
    removeRedBackground()
}

function getMouseXDelta(event) {
    let rightBoundary = windDownWidth * 0.25
    let isOverDragged = currentTranslateX > rightBoundary ? true : false
    if (isOverDragged) {
        resetElementTranslate()
        return
    }

    currentMouseX = event.clientX;
    currentTranslateX += currentMouseX - originalMouseX;

    if (currentTranslateX < -200) {
        addBlur()
    } else {
        removeBlur()
    }

    elementToTranslate.style.setProperty(
        "transform",
        "translateX(" + currentTranslateX + "px)"
    );
    originalMouseX = currentMouseX;
}

for (let index = 0; index < cardsToAnimate.length; index++) {
    let card = cardsToAnimate[index];
    let toDropDown = card.querySelector("span");

    card.addEventListener("pointerover", () => {
        toDropDown.classList.remove("h-0");
        toDropDown.classList.add("h-full");
        toDropDown.classList.add("p-3");
    });

    card.addEventListener("pointerleave", () => {
        if (isDragged) return;
        toDropDown.classList.add("h-0");
        toDropDown.classList.remove("h-full");
        toDropDown.classList.remove("p-3");
    });
}

const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            elementToTranslate.addEventListener("pointerdown", (pointerdown) => {
                originalMouseX = pointerdown.clientX;
                elementToTranslate.setPointerCapture(pointerdown.pointerId);

                isDragged = true;

                removeDuration500()
                elementToTranslate.addEventListener("pointermove", getMouseXDelta);
                elementToTranslate.addEventListener(
                    "pointerup",
                    (pointerup) => {
                        elementToTranslate.removeEventListener(
                            "pointermove",
                            getMouseXDelta
                        );
                        addDuration500()

                        let pointerType = pointerup.pointerType
                        let isTouchEvent = pointerType === 'touch' ? true : false

                        if (isTouchEvent) {
                            removeRedBackground()
                        }
                        isDragged = false;
                    },
                    { once: true }
                );
            });
        } else {
            resetElementTranslate()
        }
    });
});

observerScroll.observe(elementToTranslate);
