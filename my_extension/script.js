

jQuery(document).ready(function($){

$(".random-toggle").change(function() {
		var param = $(this).parent().parent().parent().parent().find($(".param"));
		var random = $(this).parent().parent().parent().parent().find($(".random"));
        if($(this).prop('checked')) {
		param.hide();
		random.show(200);
        } else {
		random.hide();
		param.show(200);
        }
});	
	
const reel = document.querySelector('.tab_reel');
const tab1 = document.querySelector('.tab1');
const tab2 = document.querySelector('.tab2');
const tab3 = document.querySelector('.tab3');
const panel1 = document.querySelector('.tab_panel1');
const panel2 = document.querySelector('.tab_panel2');
const panel3 = document.querySelector('.tab_panel3');

function slideToFirst(e) {
  tab2.classList.remove('active');
  tab3.classList.remove('active');
  this.classList.add('active');
  reel.style.transform = "translateX(0%)";
}

function slideToSecond(e) {
  tab1.classList.remove('active');
  tab3.classList.remove('active');
  this.classList.add('active');
  reel.style.transform = "translateX(-33.33%)";
}

function slideToThird(e) {
  tab1.classList.remove('active');
  tab2.classList.remove('active');
  this.classList.add('active');
  reel.style.transform = "translateX(-66.66%)";
}
tab1.addEventListener('click', slideToFirst);
tab2.addEventListener('click', slideToSecond);
tab3.addEventListener('click', slideToThird);
});