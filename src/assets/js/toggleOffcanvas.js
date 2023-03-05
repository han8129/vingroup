const primaryNavigation = document.querySelector('.primary-navigation');
const toggleNavigation = document.querySelector('.toggle_navigation');

toggleNavigation.addEventListener('click', () => {
	const isVisible = primaryNavigation.getAttribute('data-visible');
	
	console.log(isVisible);
	
	if ( isVisible === 'false' ) {
		primaryNavigation.setAttribute('data-visible', true);
		toggleNavigation.classList.toggle('fa-bars');
		toggleNavigation.classList.toggle('fa-xmark');
	} else {
		primaryNavigation.setAttribute('data-visible', false);
		toggleNavigation.classList.toggle('fa-bars');
		toggleNavigation.classList.toggle('fa-xmark');
	}
});
