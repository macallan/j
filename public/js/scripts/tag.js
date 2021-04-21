import { Settings } from "../consts/settings.js"

export default function Tag(name, key) {
  this.name = name
  this.key = key
  this.color = Settings.colors.gold

  this.setColor = function(color) {
    this.color = color
    return this
  }

  this.getElement = function(input = true) {
    const tagEl = document.createElement('div')
    tagEl.setAttribute('id', input ? 'tag': '')
    tagEl.style.display = 'flex'
    tagEl.innerHTML = this.key ? `<div style='align-self:center'>${this.name}</div>` : ''
    tagEl.style.padding = '5px'
    tagEl.style.backgroundColor = this.color
    return tagEl
  }
  
}

// This is where I am putting static functions related to tags
export const Tags =  {
  availableTags: {
    'q': new Tag('Question', 'q').setColor(Settings.colors.lightBlue),
    't': new Tag('Todo', 't').setColor(Settings.colors.blue),
    'i': new Tag('Idea', 'i').setColor(Settings.colors.green),
    'e': new Tag('Event', 'e').setColor(Settings.colors.orange),
    'l': new Tag('Link', 'l').setColor(Settings.colors.purple),
    '-': new Tag('', '-').setColor(Settings.colors.brightPurple),
  },
  getTag: function (tag) {
    if (this.availableTags[tag]) {
      return this.availableTags[tag]
    } else {
      return new Tag(tag, tag)
    }
  }
}
