import { rnd, setColor, sum } from "../utils"

AFRAME.registerComponent("tree-pine", {
  init() {
    let geo = new THREE.Geometry()
    let length = rnd(4, 6)
    let h = Array.from({ length }, () => rnd(2, 4))

    for (let i = 0; i < length - 2; i++) {
      let level = new THREE.ConeGeometry(1.5 + i * 0.5, h.pop(), 8)
      setColor(level, 0x009900)
      level.translate(0, sum(h) - h.length, 0)
      geo.merge(level)
    }

    let trunk = new THREE.CylinderGeometry(0.5, 0.5, h.pop())
    setColor(trunk, 0x0b0e02)
    trunk.translate(0, 0, 0)
    geo.merge(trunk)

    let tree = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true }))
    tree.castShadow = true
    this.el.setObject3D("mesh", tree)
  },
})
