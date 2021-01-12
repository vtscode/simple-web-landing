// When the user scrolls the page, execute myFunction 
window.onscroll = function() {showSlide()};
let slide = document.getElementById('sliding__wrapper');

const showSlide = () =>{
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
  let scrolled = (winScroll / height) * 100;
  if(scrolled >= 30){
    if(localStorage.getItem('closedSlide') == null){
      slide.classList.remove('closedSlide');
      return;
    }
    if(parseInt(localStorage.getItem('closedSlide')) <= new Date().getTime()){
      slide.classList.remove('closedSlide');
      return;
    }else{
      slide.classList.add('closedSlide');
      return;
    }
  }
}
const closeSlide = () =>{
  let d1 = new Date (),
  d2 = new Date ( d1 );
  d2.setMinutes ( d1.getMinutes() + 10 );
  let timeStore = d2.getTime();
  localStorage
  localStorage.setItem('closedSlide',timeStore);
  slide.classList.add('closedSlide');
}

if(parseInt(localStorage.getItem('closedSlide')) <= new Date().getTime()){
  slide.classList.remove('closedSlide');
}
if(parseInt(localStorage.getItem('closedSlide')) > new Date().getTime()){
  slide.classList.add('closedSlide');
}