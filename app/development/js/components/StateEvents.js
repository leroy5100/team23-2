import $ from "jquery";

export default class StateEvents {
	constructor(state) {
        this.eventHandlers();
	}

    eventHandlers(){
		$('body')
		.on('click', '.nav__menu_btn', this.displayMenu.bind(this))
    }

    displayMenu(event){
		event.preventDefault();
		$('.nav__menu').toggleClass('active');
		$('.nav__menu .nav__title').toggleClass('active');
		$('.nav__menu .nav__icon').toggleClass('active');
		$('.nav__mobile__bg').toggleClass('active');
    }
}
