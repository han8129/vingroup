const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
            console.log(entry)

            if (entry.isIntersecting){
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
    });
});

const hiddenElements = document.querySelectorAll('.onscroll_hidden');
hiddenElements.forEach((element) => observer.observe(element));

const hiddenElementsRight = document.querySelectorAll('.onscroll_hidden_right');
hiddenElementsRight.forEach((e) => observer.observe(e));