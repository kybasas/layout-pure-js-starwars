
const modalTiser  = document.querySelector('.modal-tiser');

const buttonTiser = document.querySelector('.button-block-label');
const modalClose = document.querySelector('.modal-close');


const addModalWindow = (event,el) => {
	el.classList.add('modal-is-open');
};


const removeModalWindow = (event,el) => {
	el.classList.remove('modal-is-open');
};


buttonTiser.addEventListener('click', () => {
	addModalWindow(event, modalTiser);
});
modalClose.addEventListener('click', () => {
	removeModalWindow(event, modalTiser);
});

modalTiser.addEventListener('click', (event) => {
	if(event.target.classList.contains('modal-tiser')) {
		removeModalWindow(event, modalTiser);
	}
});