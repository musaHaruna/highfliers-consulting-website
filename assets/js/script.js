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


// Show the "Our Mission" tab initially
showTab('our-mission')

addEventOnElem(filterBtns, 'click', filter)
