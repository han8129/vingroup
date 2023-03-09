const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

            if (entry.isIntersecting){
                entry.target.classList.remove('-translate-x-full');
                entry.target.classList.remove('blur-sm');
                entry.target.classList.remove('opacity-0');
            } else {
                entry.target.classList.add('-translate-x-full');
                entry.target.classList.add('blur-sm');
                entry.target.classList.add('opacity-0');
            }
    });
});

const observerRight = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

            if (entry.isIntersecting){
                entry.target.classList.remove('translate-x-full');
                entry.target.classList.remove('blur-sm');
                entry.target.classList.remove('opacity-0');
            } else {
                entry.target.classList.add('translate-x-full');
                entry.target.classList.add('blur-sm');
                entry.target.classList.add('opacity-0');
            }
    });
});

const hiddenElements = document.querySelectorAll('.-translate-x-full');
hiddenElements.forEach((element) => observer.observe(element));

const hiddenElementsRight = document.querySelectorAll('.custom_onscroll-effect_right');
hiddenElementsRight.forEach((element) => observerRight.observe(element));
