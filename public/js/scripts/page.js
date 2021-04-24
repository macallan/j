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
    this.container.install(this.el, this.getCurrentPage(), this.setPage.bind(this))
    host.appendChild(this.el)
    this.input.focus()
  }

  this.setPage = function(page) {
    this.page.innerText = page
    this.container.install(this.el, page, this.setPage.bind(this))
  }

  this.getCurrentPage = function() {
    return new Date().toISOString().slice(0,10)
  }

}
