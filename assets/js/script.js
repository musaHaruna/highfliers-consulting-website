'use strict'

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback)
    }
  } else {
    elem.addEventListener(type, callback)
  }
}

/**
 * navbar toggle
 */

const navbar = document.querySelector('[data-navbar]')
const navToggler = document.querySelector('[data-nav-toggler]')
const navLinks = document.querySelectorAll('[data-nav-link]')

const toggleNavbar = () => navbar.classList.toggle('active')

addEventOnElem(navToggler, 'click', toggleNavbar)

const closeNavbar = () => navbar.classList.remove('active')

addEventOnElem(navLinks, 'click', closeNavbar)

/**
 * header & back top btn active when scroll down to 100px
 */

const header = document.querySelector('[data-header]')
const backTopBtn = document.querySelector('[data-back-top-btn]')

const headerActive = function () {
  if (window.scrollY > 100) {
    header.classList.add('active')
    backTopBtn.classList.add('active')
  } else {
    header.classList.remove('active')
    backTopBtn.classList.remove('active')
  }
}

addEventOnElem(window, 'scroll', headerActive)

/**
 * filter function
 */
function showTab(tabId) {
  // Hide all tabs
  var tabs = document.getElementsByClassName('tab-content')
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].style.display = 'none'
  }

  // Remove 'active' class from all buttons with the class 'tab-btn'
  var buttons = document.getElementsByClassName('tab-btn')
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active')

    // Remove 'white' class from btn-icon and btn-text
    var btnIcon = buttons[i].querySelector('.btn-icon')
    var btnText = buttons[i].querySelector('.btn-text')
    if (btnIcon) {
      btnIcon.classList.remove('active-icon')
    }
    if (btnText) {
      btnText.classList.remove('active-text')
    }
  }

  // Show the selected tab
  var selectedTab = document.getElementById(tabId)
  if (selectedTab) {
    selectedTab.style.display = 'block'

    // Add 'active' class to the corresponding tab-btn
    var correspondingButton = document.querySelector(
      '[onclick="showTab(\'' + tabId + '\')"]'
    )
    if (correspondingButton) {
      correspondingButton.classList.add('active')

      // Select elements with the classes 'btn-icon' and 'btn-text' from the corresponding tab-btn
      var btnIcon = correspondingButton.querySelector('.btn-icon')
      var btnText = correspondingButton.querySelector('.btn-text')

      // Add 'white' class to the selected elements
      if (btnIcon) {
        btnIcon.classList.add('active-icon')
      }

      if (btnText) {
        btnText.classList.add('active-text')
      }
    }
  }
}

function toggleContent(contentId, button) {
  var content = document.getElementById(contentId)
  var card = document.querySelector('.see-more-card')

  content.classList.toggle('content-hidden')

  if (content.classList.contains('content-hidden')) {
    button.textContent = 'Show More'
    card.classList.add('height')
  } else {
    button.textContent = 'Show Less'
    card.classList.remove('height')
  }
}

// Show the "Our Mission" tab initially
showTab('our-mission')

const wrapper = document.querySelector('.wrapper')
const carousel = document.querySelector('.carousel')
const firstCardWidth = carousel.querySelector('.card').offsetWidth
const arrowBtns = document.querySelectorAll('.wrapper i')
const carouselChildrens = [...carousel.children]

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
  })

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML('beforeend', card.outerHTML)
})

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add('no-transition')
carousel.scrollLeft = carousel.offsetWidth
carousel.classList.remove('no-transition')

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    carousel.scrollLeft += btn.id == 'left' ? -firstCardWidth : firstCardWidth
  })
})

const dragStart = (e) => {
  isDragging = true
  carousel.classList.add('dragging')
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX
  startScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
  if (!isDragging) return // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
}

const dragStop = () => {
  isDragging = false
  carousel.classList.remove('dragging')
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add('no-transition')
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth
    carousel.classList.remove('no-transition')
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add('no-transition')
    carousel.scrollLeft = carousel.offsetWidth
    carousel.classList.remove('no-transition')
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId)
  if (!wrapper.matches(':hover')) autoPlay()
}

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500)
}
autoPlay()

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('mousemove', dragging)
document.addEventListener('mouseup', dragStop)
carousel.addEventListener('scroll', infiniteScroll)
wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId))
wrapper.addEventListener('mouseleave', autoPlay)
