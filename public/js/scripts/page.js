import Input from './input.js'
import Container from './container.js'
import { SampleData } from '../consts/sample.js'
import { Settings } from '../consts/settings.js'

export default function Page() {
  this.container = new Container()
  this.availableTags = {}

  this.inputHandler = function(tag, text) {
    this.container.addBullet(tag, text)
  }
  
  this.input = new Input(this.inputHandler.bind(this))

  this.el = document.createElement('div')
  this.page = document.createElement('div')

  this.install = function(host) {
    this.page.innerText = this.getCurrentPage()
    this.el.appendChild(this.page)
    this.input.install(this.el)
    this.container.install(this.el, this.getCurrentPage())
    host.appendChild(this.el)
    this.input.focus()
  }

  this.getCurrentPage = function() {
    return Settings.currentPage
  }

}
