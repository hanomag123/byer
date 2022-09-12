
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
    closeMenu() {
      this.menu.classList.remove('header__nav--active')
      this.button.classList.remove('header__menu-button--active')
      this.overlay.hidden = true

      this.enableScroll()
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

  let isMobile = false
  const menu = document.querySelector('.header__nav')
  const menuButton = document.querySelector('.header__menu-button')
  const logo = document.querySelector('.header__logo')
  let menuClass = null

  if (menu && menuButton) {
    menuClass = new Menu(menu, menuButton)
  }

  
//   let changeOption = option => {
//     isMobile = option;
//  }

  



const gallery = document.querySelectorAll('.flip')

function galleryImfFlip() {
  if (gallery.length > 0) {
    gallery.forEach(el => {
      el.addEventListener('mouseenter', () => {
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

if (acc.length > 0) {
  for (let i = 0; i < acc.length; i++) {
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
} 

let checkboxAcc = document.querySelectorAll(".accordion__item");

if (checkboxAcc.length > 0) {
  for (let i = 0; i < checkboxAcc.length; i++) {
    checkboxAcc[i].addEventListener("click", function() {
      event.preventDefault()
      event.target.parentNode.querySelector('input[type="checkbox"]').checked = !event.target.parentNode.querySelector('input[type="checkbox"]').checked
      this.classList.toggle("accordion__item--active");
      let panel = this.nextElementSibling;
      console.log(panel)
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        panel.style.setProperty('overflow', 'hidden')
        panel.removeEventListener('transitionend', trans)
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.addEventListener('transitionend', trans)
      } 
    });
  }
} 

function trans () {
  this.style.setProperty('overflow', 'visible')
}

const calcButton = document.querySelector('.calc__button')
const formSubmit = document.querySelector('.main-submit')
formSubmit.addEventListener('click', () => {
  formSubmit.hidden = true
    enableScroll()
})
calcButton.addEventListener('click', () => {
  event.preventDefault()
  toggleModal()
})
for(let form of document.forms) {
  form.addEventListener('submit', () => {
    event.preventDefault()
    console.log('hello')
    formSubmit.hidden = !formSubmit.hidden
    if (form.querySelector('.close-icon')) {
      form.querySelector('.close-icon').click()
    }
    disableScroll()
  })
}


const selectFunc = () => {
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected select-selected--light");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  
  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
        y[i].classList.remove('select-selected--light')
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (!x[i].querySelector('.same-as-selected')) {
        x[i].previousSibling.classList.add('select-selected--light')
      }
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  
  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
}

selectFunc()


const modal = document.querySelector('.calc__modal-container')
const orderbutton = document.querySelector('.order__button')
const modaloverlay = document.querySelector('.modal-overlay')
const mainModal = document.querySelector('.main-form')
const mainFormOverlay = document.querySelector('.main-form__overlay')
const mainModalCloseIcon = document.querySelectorAll('.close-icon')
mainModalCloseIcon.forEach(el => {
  el.addEventListener('click', closeModal)
})

function changeButton() {
  if (modal && orderbutton && modaloverlay) {

    mainFormOverlay.addEventListener('click', firstModalToggle)
    modaloverlay.addEventListener('click', toggleModal)
    orderbutton.addEventListener('click', () => {
      event.preventDefault()
      const calc = document.querySelector('#calc-scroll')
      if (window.innerWidth > 1024) {
        if (orderbutton.classList.contains('order__button--active')) {
          if (calc && window.innerWidth > 1024) {
            scroll(calc)
          } 
        } else {
          firstModalToggle()
        }
      } else {
        if (orderbutton.classList.contains('order__button--active')) {
          document.querySelector('.nav-button[href="calc"').click()
        } else {
          document.querySelector('.nav-button[href="calc"').click()
          firstModalToggle()
        }
      }
    })
  }
}
function closeModal () {
  event.preventDefault()

  const modals = document.querySelectorAll('.modal')
  modaloverlay.hidden = true
  modals.forEach(el => {
    el.hidden = true
  })
  enableScroll()
}
function firstModalToggle () {
  event.preventDefault()
  mainModal.hidden = !mainModal.hidden
  if (mainModal.hidden) {
    enableScroll()
  } else {
    disableScroll()
  }
}
changeButton()
function toggleModal () {
  modal.hidden = !modal.hidden
  modaloverlay.hidden = !modaloverlay.hidden
  if (modal.hidden === false) {
    disableScroll()
  } else {
    enableScroll()
  }
}

function disableScroll() {
  // Get the current page scroll position
  const scrollTop = window.pageYOffset  || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset  || document.documentElement.scrollLeft;

      // if any scroll is attempted, set this to the previous value
      window.onscroll = function() {
          window.scrollTo(scrollLeft, scrollTop);
      };
}

function enableScroll() {
window.onscroll = function() {};
}

function addMask() {
  [].forEach.call( document.querySelectorAll('input[type="tel"]'), function(input) {
  let keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      let matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5)  this.value = ""
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false)

});

}
addMask()


const navButton = document.querySelectorAll('.nav-button')
const leftBlocks = document.querySelectorAll('.home__text-wrapper')
const rightBlocks = document.querySelectorAll('.right-block')
const main = document.querySelector('main')

if (window.matchMedia("(min-width: 1025px)").matches) {
  /* the viewport is at least 400 pixels wide */
  main.classList.add('isDesc')
  main.classList.remove('isMobile')
  maxApp()
} else {
  main.classList.remove('isDesc')
  main.classList.add('isMobile')
  minApp()
}
const mutationObs = new MutationObserver((target) => {
  if (target[0].oldValue !== target[0].target.className) {
    location.reload()
  }
})

const config = {
  attributes: true,
  childList: false,
  subtree: false,
  attributeOldValue: true
};

mutationObs.observe(main, config)
window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    main.classList.add('isDesc')
    main.classList.remove('isMobile')
  } else {
    main.classList.remove('isDesc')
    main.classList.add('isMobile')
  }
})
function scroll(el) {
  el.scrollIntoView({block: "start", behavior: "smooth"});
}

function maxApp () {
  leftBlocks.forEach(el => {
      el.style.setProperty('position', 'absolute')
  })
  rightBlocks.forEach(el => {
    el.hidden = false
  })

  navButton.forEach(el => {
    if (window.innerWidth <= 1024) {
      el.addEventListener('click', () => {

      })
    } else {
      el.removeEventListener('click', function prevPlusHandler () {
        event.preventDefault()
        navClickHandler(el)
      })
    }
  })
  function mainObserver() {
  const options = {
    threshold: 0.1
  }
  function vdHandler(els) {
      els.forEach((data) => {
        // console.log(data)
      if (data.isIntersecting === true) {
          data.target.classList.add('is-visible')
      } else {
        data.target.classList.remove('is-visible')
      }
      firstActive()
      })
  }
  if (rightBlocks.length > 0 && window.innerWidth > 1024) {
    const observer = new IntersectionObserver(vdHandler, options)
  
    rightBlocks.forEach(el => {
        observer.observe(el)
    })
  } else {
    rightBlocks.forEach(el => {
      observer.unobserve(el)
  })
  }
}
function buttonHandler(arr, element) {
  arr.forEach(el => {
    removeClass(el, 'nav-button--active')
  })
  addClass(element, 'nav-button--active')
}




function addClass(elem, className) {
  elem.classList.add(className)
}

function removeClass(elem, className) {
  elem.classList.remove(className)
}



if (window.innerWidth > 1024) {
  mainObserver()
}
function firstActive() {
  let first = null
  const rightBlocksNews = document.querySelectorAll('.is-visible')
  if (rightBlocksNews.length > 1) {
    first = rightBlocksNews[1]
  } else {
    first = rightBlocksNews[0]
  }
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
      orderbutton.classList.add('order__button--active')
      // orderbutton.querySelector('a').innerHTML = 'Калькулятор'
      changeTheme()
    } else {
      changeThemeBack()
      orderbutton.classList.remove('order__button--active')
    }
  
    addClass(leftBlock, 'home__text-wrapper--active')
  }
}
addClass(leftBlocks[0], 'home__text-wrapper--active')

function changeLeftSlide() {
  if (navButton) {
    if (window.innerWidth > 1024) {
      navButton.forEach(el => {
        el.addEventListener('click', () => {
          clickhandler()
          buttonHandler(navButton, el)
        })
      })
    } else {
      navButton.forEach(el => {
        el.removeEventListener('click', () => {
          clickhandler()
          buttonHandler(navButton, el)
        })
      })
    }
  }
}

changeLeftSlide()

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
}

function changeTheme() {
  document.documentElement.style.setProperty('--darktheme', '#F1F1F1')
  document.documentElement.style.setProperty('--lighttheme', '#1B1B1B')
}
function changeThemeBack() {
  document.documentElement.style.setProperty('--darktheme', '#1B1B1B')
  document.documentElement.style.setProperty('--lighttheme', '#F1F1F1')
}

function minApp () {
  /* the viewport is less than 400 pixels wide */
  let activeNav = null
  let activeHome = document.querySelector('.home__text-wrapper--active')
  let activeMainBlock = null
  if (activeHome) {
    activeMainBlock = document.querySelector(`#${activeHome.id}-scroll`)
  }



  rightBlocks.forEach(el => {
    if (el !== activeMainBlock) {
      el.hidden = true
    }
  })
  if (!activeHome) {
    leftBlocks[0].classList.add('home__text-wrapper--active')
  }
  leftBlocks.forEach(el => {
    if (!el.classList.contains('home__text-wrapper--active')) {
      el.style.setProperty('position', 'absolute')
    }
  })
  navButton.forEach(el => {
      el.addEventListener('click', () => {
        event.preventDefault()
        navClickHandler(el)
        menuClass.closeMenu()
  })
  })
  function navClickHandler (el) {
    const idname = el.href.replace(/^.*(?=\/)./gi, '')
    const leftBlock = document.querySelector(`#${idname}`)
    const rightBlock = document.querySelector(`#${idname}-scroll`)
    if (activeNav) {
      activeNav.classList.remove('nav-button--active')
    }
    nextBlockChange(activeMainBlock, rightBlock)
    mainBlockChange(activeHome, leftBlock)
    el.classList.add('nav-button--active')
    activeNav = el
    document.body.scrollIntoView()
  }

  function mainBlockChange(prevBlock, nextBlock) {
    prevBlock.style.setProperty('position', 'absolute')
    prevBlock.classList.remove('home__text-wrapper--active')
    nextBlock.style.setProperty('position', 'static')
    nextBlock.classList.add('home__text-wrapper--active')
    activeHome = nextBlock
  }
  function nextBlockChange(prevBlock, nextBlock) {
    if (nextBlock.classList.contains('black-theme')) {
      orderbutton.classList.add('order__button--active')
      changeTheme()
    } else {
      orderbutton.classList.remove('order__button--active')
      changeThemeBack()
    }
    prevBlock.hidden = true
    nextBlock.hidden = false
    activeMainBlock = nextBlock
  }
}




const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 2000,
  },
  navigation: {
      nextEl: ".mySwiper__button",
  },
});

const swiper2 = new Swiper(".projects__swiper", {
  slidesPerView: 1.2,
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 2000,
  },
  navigation: {
      nextEl: ".projects__button",
  },
  breakpoints: {
    // when window width is >= 640px
    650: {
      slidesPerView: 2.1,
      spaceBetween: 15
    }
  }
});


})






