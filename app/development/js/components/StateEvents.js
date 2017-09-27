import $ from "jquery";

export default class StateEvents {
	constructor(state) {
        this.eventHandlers();
	}

    eventHandlers(){
		$('body')
		.on('click', '.nav__menu_btn', this.displayMenu.bind(this));
		$(window).scroll(window, this.fixHeader);

    }

    displayMenu(event){
		event.preventDefault();
		$('.nav__menu').toggleClass('active');
		$('.nav__menu .nav__title').toggleClass('active');
		$('.nav__menu .nav__icon').toggleClass('active');
		$('.nav__mobile__bg').toggleClass('active');
    }
	fixHeader(){
	    let header = $('.page-head');
	    let scrollHeight = $(window).scrollTop();
	    $('body').addClass('fixed-header');
	    let marginTop = header.outerHeight();
	  	let offsetHeight = 100;
	  	if ($(window).width() <= 768) {
	  		offsetHeight = 100;
		}
	    if (scrollHeight > 1) {
			header.addClass('is-fixed');
			$('.main').css('margin-top', 200);
	    }
		else {
	      	header.removeClass('is-fixed');
	  		$('.main').css('margin-top', offsetHeight);
	    }
  }
}
