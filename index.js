class ClickOutside {
  constructor (cb, incomingElements = null, elementsTriggers = null) {
    this.cb = cb
    this.elements =
      typeof incomingElements === 'object' && incomingElements !== null
        ? [...incomingElements]
        : [...document.querySelectorAll('[data-click-outside]')]

    this.triggers =
      typeof elementsTriggers === 'object' && elementsTriggers !== null
        ? [...elementsTriggers]
        : [...document.querySelectorAll('[data-click-outside-trigger]')]

    this.clickOutSideEvents = this.elements?.map(element => {
      const event = new Event('clickOutSideElement', {
        bubbles: true,
        detail: { element: () => element }
      })
      element?.dispatchEvent(event)
      return event
    })

    this.evt = e => {
      if (!this.elements?.length || !this.triggers?.length) {
        return
      }
      const element = this.elements?.find(el =>
        el?.classList?.contains('active')
      )
      const elementTrigger = this.triggers?.find(el =>
        el?.classList?.contains('active')
      )
      if (e.target !== element && e.target !== elementTrigger) {
        if (typeof this.cb === 'function') {
          this.cb(element, elementTrigger)
        }
      }
    }
  }

  destroy () {
    document.removeEventListener('click', this.evt, false)
  }

  init () {
    document.addEventListener('click', this.evt, false)
  }

  nothing () {}
}

export { ClickOutside }
