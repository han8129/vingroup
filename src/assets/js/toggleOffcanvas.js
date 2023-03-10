const toChangeBackground = document.querySelector('header')
const toChangeZIndex = document.querySelector('img')
const primaryNavigation = document.getElementById('primary-navigation');
const toggleNavigation = document.querySelector('.toggle_navigation');
console.log(toChangeZIndex)

function toggleNavBar() {
	toggleNavigation.classList.toggle('fa-bars');
	toggleNavigation.classList.toggle('fa-xmark');

	toChangeBackground.classList.toggle('bg-red-700');
	toChangeBackground.classList.toggle('bg-white');
	toChangeBackground.classList.toggle('text-white');
	toChangeBackground.classList.toggle('text-gray-400');
	toChangeZIndex.classList.toggle('invisible')

	let i = 0;
	primaryNavigation.querySelectorAll('a').forEach((element) => {
		setTimeout(() => {
			element.classList.toggle('-translate-x-full')
		}, 150 * i)
		++i
	})
}

toggleNavigation.addEventListener('click', () => {
	const isVisible = primaryNavigation.getAttribute('data-visible');

	console.log(isVisible);

	if (isVisible === 'false') {
		primaryNavigation.setAttribute('data-visible', true);
		toggleNavBar();


	} else {
		primaryNavigation.setAttribute('data-visible', false);
		toggleNavBar();
	}
});
