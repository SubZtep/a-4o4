import { Entity } from "aframe"
import { rnd } from "../utils"

AFRAME.registerSystem("zoo", {
  init() {
    this.throttledRelease = AFRAME.utils.throttle(this.release, 500, this)
  },

  release() {
    let pool = this.sceneEl.components.pool__bird
    if (pool && pool.availableEls.length > 0) {
      let kacsa: Entity = this.el.components.pool__bird.requestEntity()
      if (kacsa) {
        // @ts-ignore
        kacsa.object3D.el.setAttribute("position", `${rnd(-5, 5)} ${rnd(3, 5)} ${rnd(-6, -3)}`)
        kacsa.play()
      }
    }
  },

  tick() {
    this.throttledRelease()
  },
})