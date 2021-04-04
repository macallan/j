import { Settings } from './consts/settings.js'
import Page from './scripts/page.js'

export default function Journal () {

  this.header = document.createElement('div')
  this.header.innerHTML = Settings.title

  this.page = new Page()

  this.install = function (host = document.body) {
    host.appendChild(this.header)
    this.page.install(host, this.availableTags)
  }

  this.start = function () {
    console.log('the journal has been started')
  }
}
