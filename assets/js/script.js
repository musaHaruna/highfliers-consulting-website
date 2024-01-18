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

function showTab(tabName) {
  const tabs = document.querySelectorAll('.our-services')
  tabs.forEach((tab) => (tab.style.display = 'none'))

  const activeButton = document.querySelector('.filter-btn.active')
  if (activeButton) {
    activeButton.classList.remove('active')
    activeButton.parentElement.style.backgroundColor = '' // Remove background color
  }

  const selectedButton = document.querySelector(
    `button[data-filter-btn="${tabName}"]`
  )
  if (selectedButton) {
    selectedButton.classList.add('active')
    selectedButton.parentElement.style.backgroundColor = 'black' // Set background color to gold
  }

  const selectedTab = document.querySelector(`.grid-list.${tabName}`)
  if (selectedTab) {
    selectedTab.style.display = 'block'
  }
}


// Show the "Our Mission" tab initially
showTab('our-mission')

addEventOnElem(filterBtns, 'click', filter)
