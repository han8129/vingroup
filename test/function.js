const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
            console.log(entry)

            if (entry.isIntersecting){
                entry.target.classList.toggle('show');
            } else {
                entry.target.classList.toggle('show');
            }
    });
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((ele) => observer.observe(ele));