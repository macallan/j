import Page from './scripts/page.js'

export default function Journal () {

  this.header = document.createElement('div')
  this.header.innerHTML = 'Journal!'

  this.page = new Page()

  this.install = function (host = document.body) {
    this.tag
    host.appendChild(this.header)
    this.page.install(host)
  }

  this.start = function () {
    console.log('the journal has been started')
  }
}
