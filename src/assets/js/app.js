
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

const swiper2 = new Swiper(".projects__swiper", {
  slidesPerView: 2,
  spaceBetween: 15,
  loop: true,
  navigation: {
      nextEl: ".projects__button",
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
      button.classList.toggle('arrow--active');
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      button.classList.toggle('arrow--active')
    } 
  });
}
acc[0].click()

const navButton = document.querySelectorAll('.nav-button')
const leftBlocks = document.querySelectorAll('.home__text-wrapper')
const homeBlock = document.querySelector('.home')

function changeLeftSlide() {
  if (navButton) {
    navButton.forEach(el => {
      el.addEventListener('click', () => {
        clickhandler()
        buttonHandler(navButton, el)
      })
    })
  }
}

changeLeftSlide()

function buttonHandler(arr, element) {
  arr.forEach(el => {
    removeClass(el, 'nav-button--active')
  })
  addClass(element, 'nav-button--active')
}

function clickhandler() {
  event.preventDefault()
  const href = event.target.closest('a').href
  if(href) {
    const hrefText = href.replace(/^.*(?=\/)./gi, '')
    for(let elem of leftBlocks) {
      if (elem.id === hrefText) {
        addClass(elem, 'home__text-wrapper--active')
        const scrollElem = document.querySelector(`#${hrefText}-scroll`)
        if (scrollElem) {
          scroll(scrollElem)
        }
      } else {
        elem.classList.remove('home__text-wrapper--active')
      }
    }
  }
}

const observeTarget = document.querySelectorAll('.right-block')
function mainObserver() {
  const options = {
    // rootMargin: '-200px'
    threshold: 0.1
  }
  function vdHandler(els) {
      els.forEach((data) => {
      if (data.isIntersecting === true) {
          data.target.classList.add('is-visible')



          
      } else {
        data.target.classList.remove('is-visible')
        
        // removeClass(button, 'nav-button--active')
        // removeClass(leftBlock, 'home__text-wrapper--active')
      }
      firstActive()
      })
  }
  if (observeTarget.length > 0) {
    const observer = new IntersectionObserver(vdHandler, options)
  
    observeTarget.forEach(el => {
        observer.observe(el)
    })
  }
}

mainObserver()
function firstActive() {
  const first = document.querySelector('.is-visible')



  leftBlocks.forEach(el => {
    removeClass(el, 'home__text-wrapper--active')
  })
  if (first) {
    const idname = first.id.slice(0, -7)
    const leftBlock = document.querySelector(`#${idname}`)
    const button = document.querySelector(`.nav-button[href="${idname}"]`)
    buttonHandler(navButton, button)
    const isBlackTheme = Boolean(first.classList.contains('black-theme'));
    if (isBlackTheme === true) {
      changeTheme()
    } else {
      changeThemeBack()
    }
  
    addClass(leftBlock, 'home__text-wrapper--active')
  }
}

function changeTheme() {
  document.documentElement.style.setProperty('--darktheme', '#F1F1F1')
  document.documentElement.style.setProperty('--lighttheme', '#1B1B1B')
}
function changeThemeBack() {
  document.documentElement.style.setProperty('--darktheme', '#1B1B1B')
  document.documentElement.style.setProperty('--lighttheme', '#F1F1F1')
}

function addClass(elem, className) {
  elem.classList.add(className)
}

function removeClass(elem, className) {
  elem.classList.remove(className)
}

function scroll(el) {
  el.scrollIntoView({block: "start", behavior: "smooth"});
}

addClass(leftBlocks[0], 'home__text-wrapper--active')









