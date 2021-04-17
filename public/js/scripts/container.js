import { SampleData } from '../consts/sample.js'
import Bullet from './bullet.js'
import { Tags } from './tag.js'

export default function Container() {
  this.el = document.createElement('ul')
  this.el.style.paddingInlineStart = '0px'

  this.install = function (host, currentPage) {
    // const bullets = this.getBulletsForPage(currentPage)
    const bullets = []
    this.setup(bullets)
    this.getFirestoreBulletsForPage(currentPage)
    host.appendChild(this.el)
  }

  this.setup = function (bullets) {
    this.bullets = bullets
    this.clearBullets()
    bullets.forEach((bullet, index) => {
      bullet.setIndex(index)
      this.el.appendChild(bullet.toHTML())
    })
  }

  this.clearBullets = function() {
    while (this.el.firstChild) {
      this.el.removeChild(this.el.lastChild);
    }
  }

  this.addBullet = function(tag, text) {
    const bullet = new Bullet(this.bulletHandler.bind(this)).setTag(tag).setText(text).install()
    this.bullets.unshift(bullet)
    this.setup(this.bullets)
  }

  this.removeBullet = function(index) {
    if (index != null) {
      this.bullets.splice(index, 1)
      this.setup(this.bullets)
    } 
  }

  this.getBulletsForPage = function(page) {
    const saved = SampleData.pages[page]
    return saved.map((data) => {
      const tag = Tags.getTag(data.tag)
      return new Bullet(this.bulletHandler.bind(this)).setTag(tag).setText(data.text).install()
    })
  }

  this.getFirestoreBulletsForPage = function(page) {
    fetch(`api/users/macallan/pages/${page}`)
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        const bullets = json.bullets.map((data) => {
          const tag = Tags.getTag(data.tag)
          return new Bullet(this.bulletHandler.bind(this)).setTag(tag).setText(data.text).install()
        })
        this.setup(bullets)
      }.bind(this))
  }

  this.bulletHandler = function(index) {
    // For now this only removes the bullet but this function could be modified to do actions
    this.removeBullet(index)
  }

}
