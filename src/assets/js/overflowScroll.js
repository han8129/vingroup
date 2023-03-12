// import '../../../node_modules/jquery/dist/jquery.js';
const elementToTranslate = document.querySelector(".custom-scroll_overflow");
const elementToBlur = document.querySelector(".custom_to-blur");

const cardsToAnimate = document.getElementsByClassName("custom_hover-card");
let currentMouseX;
let originalMouseX;
let currentTranslateX = 0;
const numberOfCard = elementToTranslate.querySelector('section').childElementCount

let isOverDragged = false
let isDragged = false;
let removeDuration500 = () => elementToTranslate.classList.remove("duration-500");
let addDuration500 = () => elementToTranslate.classList.add("duration-500");

let windDownWidth = window.screen.width;
let singleCardWidth = cardsToAnimate[0].offsetWidth
let cardCatalougeActualWidth = (numberOfCard * singleCardWidth) + (numberOfCard * 16)
let cardCatalougeComputedWidth = elementToTranslate.offsetWidth
let lostHalfWidth = (cardCatalougeActualWidth - cardCatalougeComputedWidth)
let boundaryLeft = - (lostHalfWidth + singleCardWidth * 0.7)
let boundaryRight = cardCatalougeComputedWidth * 0.5


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

if (lostHalfWidth < cardCatalougeComputedWidth) {
    boundaryLeft = - (windDownWidth + singleCardWidth * .7)
}

if (lostHalfWidth < 100) {
    boundaryLeft = - (cardCatalougeActualWidth)
    boundaryRight = cardCatalougeComputedWidth - 100
}

window.addEventListener('resize', () => {
    console.log("Change screen")
    windDownWidth = window.screen.width
    cardCatalougeActualWidth = (numberOfCard * singleCardWidth) + (numberOfCard * 16)
    cardCatalougeComputedWidth = elementToTranslate.offsetWidth
    singleCardWidth = cardsToAnimate[0].offsetWidth

    lostHalfWidth = (cardCatalougeActualWidth - cardCatalougeComputedWidth)

    boundaryLeft = - (lostHalfWidth + singleCardWidth * 0.7)
    boundaryRight = cardCatalougeComputedWidth * 0.7

    if (lostHalfWidth < cardCatalougeComputedWidth) {
        boundaryLeft = - (windDownWidth + singleCardWidth * .5)
    }

    if (lostHalfWidth < 100) {
        boundaryLeft = - (cardCatalougeActualWidth)
        boundaryRight = cardCatalougeComputedWidth - 100
    }
})

const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('translate-x-full');
            entry.target.classList.remove('blur-sm');
            entry.target.classList.remove('opacity-0');

            console.log(boundaryRight)

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

                        isOverDragged = (currentTranslateX < boundaryLeft || currentTranslateX > boundaryRight)
                            ? true
                            : false

                        if (isOverDragged) {
                            console.log("Over dragged")
                            resetElementTranslate()
                        }

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
            if (!isDragged) {
                entry.target.classList.add('translate-x-full');
                entry.target.classList.add('blur-sm');
                entry.target.classList.add('opacity-0');
                resetElementTranslate()
            }
        }
    });
});

observerScroll.observe(elementToTranslate);
