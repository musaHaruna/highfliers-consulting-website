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

const carouselWrapperSection4 = document.querySelector(
  '.carousel-wrapper-section4'
)
const carouselSection4 = document.querySelector('.carousel-section4')
const firstCardWidthSection4 =
  carouselSection4.querySelector('.card-section4').offsetWidth
const arrowBtnsSection4 = document.querySelectorAll(
  '.carousel-wrapper-section4 i'
)
const carouselChildrensSection4 = [...carouselSection4.children]

let isDraggingSection4 = false,
  isAutoPlaySection4 = true,
  startXSection4,
  startScrollLeftSection4,
  timeoutIdSection4

let cardPerViewSection4 = Math.round(
  carouselSection4.offsetWidth / firstCardWidthSection4
)

carouselChildrensSection4
  .slice(-cardPerViewSection4)
  .reverse()
  .forEach((card) => {
    carouselSection4.insertAdjacentHTML('afterbegin', card.outerHTML)
  })

carouselChildrensSection4.slice(0, cardPerViewSection4).forEach((card) => {
  carouselSection4.insertAdjacentHTML('beforeend', card.outerHTML)
})

carouselSection4.classList.add('no-transition')
carouselSection4.scrollLeft = carouselSection4.offsetWidth
carouselSection4.classList.remove('no-transition')

arrowBtnsSection4.forEach((btn) => {
  btn.addEventListener('click', () => {
    carouselSection4.scrollLeft +=
      btn.id === 'leftSection4'
        ? -firstCardWidthSection4
        : firstCardWidthSection4
  })
})

const dragStartSection4 = (e) => {
  isDraggingSection4 = true
  carouselSection4.classList.add('dragging')
  startXSection4 = e.pageX
  startScrollLeftSection4 = carouselSection4.scrollLeft
}

const draggingSection4 = (e) => {
  if (!isDraggingSection4) return
  carouselSection4.scrollLeft =
    startScrollLeftSection4 - (e.pageX - startXSection4)
}

const dragStopSection4 = () => {
  isDraggingSection4 = false
  carouselSection4.classList.remove('dragging')
}

const infiniteScrollSection4 = () => {
  if (carouselSection4.scrollLeft === 0) {
    carouselSection4.classList.add('no-transition')
    carouselSection4.scrollLeft =
      carouselSection4.scrollWidth - 2 * carouselSection4.offsetWidth
    carouselSection4.classList.remove('no-transition')
  } else if (
    Math.ceil(carouselSection4.scrollLeft) ===
    carouselSection4.scrollWidth - carouselSection4.offsetWidth
  ) {
    carouselSection4.classList.add('no-transition')
    carouselSection4.scrollLeft = carouselSection4.offsetWidth
    carouselSection4.classList.remove('no-transition')
  }

  clearTimeout(timeoutIdSection4)
  if (!carouselWrapperSection4.matches(':hover')) autoPlaySection4()
}

const autoPlaySection4 = () => {
  if (window.innerWidth < 800 || !isAutoPlaySection4) return
  timeoutIdSection4 = setTimeout(
    () => (carouselSection4.scrollLeft += firstCardWidthSection4),
    2500
  )
}
autoPlaySection4()

carouselSection4.addEventListener('mousedown', dragStartSection4)
carouselSection4.addEventListener('mousemove', draggingSection4)
document.addEventListener('mouseup', dragStopSection4)
carouselSection4.addEventListener('scroll', infiniteScrollSection4)
carouselWrapperSection4.addEventListener('mouseenter', () =>
  clearTimeout(timeoutIdSection4)
)
carouselWrapperSection4.addEventListener('mouseleave', autoPlaySection4)

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

const carouselWrapperSection5 = document.querySelector(
  '.carousel-wrapper-section5'
)
const carouselSection5 = document.querySelector('.carousel-section5')
const firstCardWidthSection5 =
  carouselSection5.querySelector('.card-section5').offsetWidth
const arrowBtnsSection5 = document.querySelectorAll(
  '.carousel-wrapper-section5 i'
)
const carouselChildrensSection5 = [...carouselSection5.children]

let isDraggingSection5 = false,
  isAutoPlaySection5 = true,
  startXSection5,
  startScrollLeftSection5,
  timeoutIdSection5

let cardPerViewSection5 = Math.round(
  carouselSection5.offsetWidth / firstCardWidthSection5
)

carouselChildrensSection5
  .slice(-cardPerViewSection5)
  .reverse()
  .forEach((card) => {
    carouselSection5.insertAdjacentHTML('afterbegin', card.outerHTML)
  })

carouselChildrensSection5.slice(0, cardPerViewSection5).forEach((card) => {
  carouselSection5.insertAdjacentHTML('beforeend', card.outerHTML)
})

carouselSection5.classList.add('no-transition')
carouselSection5.scrollLeft = carouselSection5.offsetWidth
carouselSection5.classList.remove('no-transition')

arrowBtnsSection5.forEach((btn) => {
  btn.addEventListener('click', () => {
    carouselSection5.scrollLeft +=
      btn.id === 'leftSection5'
        ? -firstCardWidthSection5
        : firstCardWidthSection5
  })
})

const dragStartSection5 = (e) => {
  isDraggingSection5 = true
  carouselSection5.classList.add('dragging')
  startXSection5 = e.pageX
  startScrollLeftSection5 = carouselSection5.scrollLeft
}

const draggingSection5 = (e) => {
  if (!isDraggingSection5) return
  carouselSection5.scrollLeft =
    startScrollLeftSection5 - (e.pageX - startXSection5)
}

const dragStopSection5 = () => {
  isDraggingSection5 = false
  carouselSection5.classList.remove('dragging')
}

const infiniteScrollSection5 = () => {
  if (carouselSection5.scrollLeft === 0) {
    carouselSection5.classList.add('no-transition')
    carouselSection5.scrollLeft =
      carouselSection5.scrollWidth - 2 * carouselSection5.offsetWidth
    carouselSection5.classList.remove('no-transition')
  } else if (
    Math.ceil(carouselSection5.scrollLeft) ===
    carouselSection5.scrollWidth - carouselSection5.offsetWidth
  ) {
    carouselSection5.classList.add('no-transition')
    carouselSection5.scrollLeft = carouselSection5.offsetWidth
    carouselSection5.classList.remove('no-transition')
  }

  clearTimeout(timeoutIdSection5)
  if (!carouselWrapperSection5.matches(':hover')) autoPlaySection5()
}

const autoPlaySection5 = () => {
  if (window.innerWidth < 800 || !isAutoPlaySection5) return
  timeoutIdSection5 = setTimeout(
    () => (carouselSection5.scrollLeft += firstCardWidthSection5),
    2500
  )
}
autoPlaySection5()

carouselSection5.addEventListener('mousedown', dragStartSection5)
carouselSection5.addEventListener('mousemove', draggingSection5)
document.addEventListener('mouseup', dragStopSection5)
carouselSection5.addEventListener('scroll', infiniteScrollSection5)
carouselWrapperSection5.addEventListener('mouseenter', () =>
  clearTimeout(timeoutIdSection5)
)
carouselWrapperSection5.addEventListener('mouseleave', autoPlaySection5)
