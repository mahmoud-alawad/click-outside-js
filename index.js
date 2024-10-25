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
        const event = new Event('onClickOutSide', {
          bubbles: true,
          detail: { element: () => element }
        })
        element?.dispatchEvent(event)

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
