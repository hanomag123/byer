
document.addEventListener("DOMContentLoaded", () => {


//= components/
  class Menu {
    constructor(menuElement, buttonElement) {
      this.menu = typeof menuElement === "string" ? document.querySelector(menuElement) : menuElement
      this.button = typeof buttonElement === "string" ? document.querySelector(buttonElement) : buttonElement
      this.overlay = document.createElement('div')
      this.overlay.hidden = true
      this._init()
    }

    _init() {
      document.body.appendChild(this.overlay)
      this.overlay.classList.add('overlay')

      this.overlay.addEventListener('click', this.toggleMenu.bind(this))
      this.button.addEventListener('click', this.toggleMenu.bind(this))
    }

    toggleMenu() {
      this.menu.classList.toggle('header__nav--active')
      this.button.classList.toggle('header__menu-button--active')
      this.overlay.hidden = !this.overlay.hidden


      if (this.isMenuOpen()) {
        this.disableScroll()
      } else {
        this.enableScroll()
      }
    }

    isMenuOpen() {
      return this.menu.classList.contains('header__nav--active')
    }

    disableScroll() {
        // Get the current page scroll position
        const scrollTop = window.pageYOffset  || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset  || document.documentElement.scrollLeft;
      
            // if any scroll is attempted, set this to the previous value
            window.onscroll = function() {
                window.scrollTo(scrollLeft, scrollTop);
            };
    }

    enableScroll() {
      window.onscroll = function() {};
    }
  }

  const menu = document.querySelector('.header__nav')
  const menuButton = document.querySelector('.header__menu-button')

  if (menu && menuButton) {
    const menuClass = new Menu(menu, menuButton)
  }



  
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  loop: true,
  navigation: {
      nextEl: ".mySwiper__button",
  },
});
})


const gallery = document.querySelectorAll('.gallery__img-container')

function galleryImfFlip() {
  if (gallery.length > 0) {
    gallery.forEach(el => {
      el.addEventListener('click', () => {
        flipImg(el)
      })
    })
  }
}

function flipImg(el) {
  el.children[0].style.setProperty('transform', 'rotateY(-180deg)')
  el.children[1].style.setProperty('transform', 'rotateY(0deg)')
}

galleryImfFlip()

let acc = document.querySelectorAll(".about-us__accordion-item");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("about-us__accordion-item--active");
    let panel = this.nextElementSibling;
    let button = this.querySelector('svg')
    if (panel.style.maxHeight && button) {
      panel.style.maxHeight = null;
      button.classList.toggle('arrow--active')
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      button.classList.toggle('arrow--active')
    } 
  });
}
acc[0].click()









