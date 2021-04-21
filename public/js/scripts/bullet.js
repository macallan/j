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
    const tagEl = this.tag.getElement(false)
    this.el.prepend(tagEl)
    tagEl.addEventListener('click', this.tagButtonClicked.bind(this))
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
    // TODO make an action constant
    this.bulletHandler('REMOVE', this.index)
  }

  this.tagButtonClicked = function () {
    this.bulletHandler(this.tag.name.toUpperCase() + '_CLICKED', this.text)
    console.log(`Tag ${this.tag.name} clicked!`)
  }
}
