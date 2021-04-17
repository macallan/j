import { Settings } from "../consts/settings.js"

export default function Bullet(bulletHandler) {
  this.index = null
  this.text = ''
  this.tagText = ''
  this.bulletHandler = bulletHandler

  this.el = document.createElement('li')
  this.textEl = document.createElement('div')
  this.textEl.style.margin = '5px'
  this.closeButton = document.createElement('button')
  this.closeButton.innerText = 'x'
  this.closeButton.style.backgroundColor = Settings.colors.red
  this.closeButton.style.margin = '5px'

  this.el.style.display = 'flex'
  this.el.style.flexDirection = 'row'
  this.el.appendChild(this.textEl)
  this.el.appendChild(this.closeButton)

  this.install = function() {
    this.closeButton.addEventListener('click', this.closeButtonClicked.bind(this))
    return this
  }

  this.setIndex = function(index) {
    this.index = index
    return this
  }

  this.setTag = function(tag) {
    this.tagText = tag.key
    this.tag = tag
    this.el.prepend(this.tag.getElement(false))
    return this
  }

  this.setText = function(text) {
    this.text = text
    this.textEl.innerText = text
    return this
  }

  this.toHTML = function() {
    return this.el
  }

  this.toJSON = function() {
    return {
      text: this.text,
      tag: this.tagText
    }
  }

  this.closeButtonClicked = function () {
    this.bulletHandler(this.index)
  }
}
