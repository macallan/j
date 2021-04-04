import Tag, { Tags } from "./tag.js"

export default function Input(inputHandler) {
  this.el = document.createElement('div')
  this.tagEl = document.createElement('div')
  this.input = document.createElement('div')
  this.inputHandler = inputHandler

  this.fullText = ''
  this.tag = Tags.getTag(null)

  this.install = function(host) {
    this.setup()
    host.appendChild(this.el)
  }

  this.setup = function() {
    this.input.innerText = this.fullText
    this.input.classList.add('textareaElement')
    this.input.contentEditable = true
    // this.input.setAttribute('type', 'text')
    this.input.addEventListener('input', this.onInput.bind(this))
    this.input.addEventListener('keydown', this.onKeyDown.bind(this))
    this.input.style.transition = 'all ease-in-out 0.6s'

    this.el.style.display = 'flex'
    this.el.style.flexDirection = 'row'
    this.el.appendChild(this.tag.getElement())
    this.el.appendChild(this.input)
  }

  this.focus = function() {
    this.input.focus()
  }

  this.clearInput = function() {
    this.setTag(null)
    this.input.innerHTML = null
  }

  this.setTag = function(value) {
    document.getElementById('tag').remove()
    this.tag = Tags.getTag(value)
    this.el.prepend(this.tag.getElement())
  }

  this.onInput = function(e) {
    if (this.input.innerText.length == 1 && this.tag.key === null) {
      this.setTag(this.input.innerText)
      this.fullText = this.fullText + this.tag
      this.input.innerText = ''
    }
  }

  this.onKeyDown = function(e) {
    const key = e.key
    if (key === 'Backspace') {
      if (this.input.innerText.length === 0) {
        this.setTag(null)
      }
    } else if (key === 'Enter') {
      this.inputHandler(this.tag, this.input.innerText)
      this.clearInput()
      e.preventDefault()
    }
  }
} 
