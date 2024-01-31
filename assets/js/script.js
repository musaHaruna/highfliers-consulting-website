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

// section 2

const carouselWrapperSection2 = document.querySelector(
  '.carousel-wrapper-section2'
)
const carouselSection2 = document.querySelector('.carousel-section2')
const firstCardWidthSection2 =
  carouselSection2.querySelector('.card-section2').offsetWidth
const arrowBtnsSection2 = document.querySelectorAll(
  '.carousel-wrapper-section2 i'
)
const carouselChildrensSection2 = [...carouselSection2.children]

let isDraggingSection2 = false,
  isAutoPlaySection2 = true,
  startXSection2,
  startScrollLeftSection2,
  timeoutIdSection2

let cardPerViewSection2 = Math.round(
  carouselSection2.offsetWidth / firstCardWidthSection2
)

carouselChildrensSection2
  .slice(-cardPerViewSection2)
  .reverse()
  .forEach((card) => {
    carouselSection2.insertAdjacentHTML('afterbegin', card.outerHTML)
  })

carouselChildrensSection2.slice(0, cardPerViewSection2).forEach((card) => {
  carouselSection2.insertAdjacentHTML('beforeend', card.outerHTML)
})

carouselSection2.classList.add('no-transition')
carouselSection2.scrollLeft = carouselSection2.offsetWidth
carouselSection2.classList.remove('no-transition')

arrowBtnsSection2.forEach((btn) => {
  btn.addEventListener('click', () => {
    carouselSection2.scrollLeft +=
      btn.id === 'leftSection2'
        ? -firstCardWidthSection2
        : firstCardWidthSection2
  })
})

const dragStartSection2 = (e) => {
  isDraggingSection2 = true
  carouselSection2.classList.add('dragging')
  startXSection2 = e.pageX
  startScrollLeftSection2 = carouselSection2.scrollLeft
}

const draggingSection2 = (e) => {
  if (!isDraggingSection2) return
  carouselSection2.scrollLeft =
    startScrollLeftSection2 - (e.pageX - startXSection2)
}

const dragStopSection2 = () => {
  isDraggingSection2 = false
  carouselSection2.classList.remove('dragging')
}

const infiniteScrollSection2 = () => {
  if (carouselSection2.scrollLeft === 0) {
    carouselSection2.classList.add('no-transition')
    carouselSection2.scrollLeft =
      carouselSection2.scrollWidth - 2 * carouselSection2.offsetWidth
    carouselSection2.classList.remove('no-transition')
  } else if (
    Math.ceil(carouselSection2.scrollLeft) ===
    carouselSection2.scrollWidth - carouselSection2.offsetWidth
  ) {
    carouselSection2.classList.add('no-transition')
    carouselSection2.scrollLeft = carouselSection2.offsetWidth
    carouselSection2.classList.remove('no-transition')
  }

  clearTimeout(timeoutIdSection2)
  if (!carouselWrapperSection2.matches(':hover')) autoPlaySection2()
}

const autoPlaySection2 = () => {
  if (window.innerWidth < 800 || !isAutoPlaySection2) return
  timeoutIdSection2 = setTimeout(
    () => (carouselSection2.scrollLeft += firstCardWidthSection2),
    2500
  )
}
autoPlaySection2()

carouselSection2.addEventListener('mousedown', dragStartSection2)
carouselSection2.addEventListener('mousemove', draggingSection2)
document.addEventListener('mouseup', dragStopSection2)
carouselSection2.addEventListener('scroll', infiniteScrollSection2)
carouselWrapperSection2.addEventListener('mouseenter', () =>
  clearTimeout(timeoutIdSection2)
)
carouselWrapperSection2.addEventListener('mouseleave', autoPlaySection2)

// three

const carouselWrapperSection3 = document.querySelector(
  '.carousel-wrapper-section3'
)
const carouselSection3 = document.querySelector('.carousel-section3')
const firstCardWidthSection3 =
  carouselSection3.querySelector('.card-section3').offsetWidth
const arrowBtnsSection3 = document.querySelectorAll(
  '.carousel-wrapper-section3 i'
)
const carouselChildrensSection3 = [...carouselSection3.children]

let isDraggingSection3 = false,
  isAutoPlaySection3 = true,
  startXSection3,
  startScrollLeftSection3,
  timeoutIdSection3

let cardPerViewSection3 = Math.round(
  carouselSection3.offsetWidth / firstCardWidthSection3
)

carouselChildrensSection3
  .slice(-cardPerViewSection3)
  .reverse()
  .forEach((card) => {
    carouselSection3.insertAdjacentHTML('afterbegin', card.outerHTML)
  })

carouselChildrensSection3.slice(0, cardPerViewSection3).forEach((card) => {
  carouselSection3.insertAdjacentHTML('beforeend', card.outerHTML)
})

carouselSection3.classList.add('no-transition')
carouselSection3.scrollLeft = carouselSection3.offsetWidth
carouselSection3.classList.remove('no-transition')

arrowBtnsSection3.forEach((btn) => {
  btn.addEventListener('click', () => {
    carouselSection3.scrollLeft +=
      btn.id === 'leftSection3'
        ? -firstCardWidthSection3
        : firstCardWidthSection3
  })
})

const dragStartSection3 = (e) => {
  isDraggingSection3 = true
  carouselSection3.classList.add('dragging')
  startXSection3 = e.pageX
  startScrollLeftSection3 = carouselSection3.scrollLeft
}

const draggingSection3 = (e) => {
  if (!isDraggingSection3) return
  carouselSection3.scrollLeft =
    startScrollLeftSection3 - (e.pageX - startXSection3)
}

const dragStopSection3 = () => {
  isDraggingSection3 = false
  carouselSection3.classList.remove('dragging')
}

const infiniteScrollSection3 = () => {
  if (carouselSection3.scrollLeft === 0) {
    carouselSection3.classList.add('no-transition')
    carouselSection3.scrollLeft =
      carouselSection3.scrollWidth - 2 * carouselSection3.offsetWidth
    carouselSection3.classList.remove('no-transition')
  } else if (
    Math.ceil(carouselSection3.scrollLeft) ===
    carouselSection3.scrollWidth - carouselSection3.offsetWidth
  ) {
    carouselSection3.classList.add('no-transition')
    carouselSection3.scrollLeft = carouselSection3.offsetWidth
    carouselSection3.classList.remove('no-transition')
  }

  clearTimeout(timeoutIdSection3)
  if (!carouselWrapperSection3.matches(':hover')) autoPlaySection3()
}

const autoPlaySection3 = () => {
  if (window.innerWidth < 800 || !isAutoPlaySection3) return
  timeoutIdSection3 = setTimeout(
    () => (carouselSection3.scrollLeft += firstCardWidthSection3),
    2500
  )
}
autoPlaySection3()

carouselSection3.addEventListener('mousedown', dragStartSection3)
carouselSection3.addEventListener('mousemove', draggingSection3)
document.addEventListener('mouseup', dragStopSection3)
carouselSection3.addEventListener('scroll', infiniteScrollSection3)
carouselWrapperSection3.addEventListener('mouseenter', () =>
  clearTimeout(timeoutIdSection3)
)
carouselWrapperSection3.addEventListener('mouseleave', autoPlaySection3)

var btnContainer = document.getElementById('btnContainer')

function handleScroll1() {
  var scrollPosition = window.scrollY || document.documentElement.scrollTop

  if (scrollPosition > 50) {
    btnContainer.classList.add('loaded')
  } else {
    btnContainer.classList.remove('loaded')
  }
}

window.addEventListener('scroll', handleScroll1)

var serviceCards = document.querySelectorAll('.service-card1')

function handleScroll() {
  var scrollPosition = window.scrollY || document.documentElement.scrollTop

  serviceCards.forEach(function (card) {
    if (scrollPosition > card.offsetTop - window.innerHeight + 200) {
      card.classList.add('show')
    } else {
      card.classList.remove('show')
    }
  })
}

window.addEventListener('scroll', handleScroll)

var serviceCardsV2 = document.querySelectorAll('.service-card-v2')

function handleScroll2() {
  var scrollPosition = window.scrollY || document.documentElement.scrollTop

  if (scrollPosition > 1900) {
    serviceCardsV2.forEach(function (card) {
      card.classList.add('show')
    })
  } else {
    serviceCardsV2.forEach(function (card) {
      card.classList.remove('show')
    })
  }
}

window.addEventListener('scroll', handleScroll2)

document.addEventListener('DOMContentLoaded', function () {
  const galleryCards = document.querySelectorAll('.gallery-card')

  galleryCards.forEach(function (card) {
    card.addEventListener('click', function () {
      const modalContent = document.getElementById('modal-content')
      modalContent.innerHTML = card.querySelector('.card-text.desc').innerHTML

      const modal = document.getElementById('modal')
      modal.style.display = 'block'

      // Hide body scroll
      document.body.style.overflow = 'hidden'

      // Add zoomIn animation class
      modalContent.classList.remove('zoomOut')
      modalContent.classList.add('zoomIn')
    })
  })
})

function closeModal() {
  const modal = document.getElementById('modal')
  const modalContent = document.getElementById('modal-content')

  // Add zoomOut animation class
  modalContent.classList.remove('zoomIn')
  modalContent.classList.add('zoomOut')

  // Restore body scroll after the animation completes
  setTimeout(function () {
    modal.style.display = 'none'
    document.body.style.overflow = 'auto'
  }, 300) // Assuming the animation duration is 0.3 seconds
}
