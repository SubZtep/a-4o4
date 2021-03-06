import { chopBottom, jitter, rnd, setColor } from "../utils"

AFRAME.registerGeometry("oak", {
  schema: {
    knot: {
      default: false,
    },
  },

  init(data) {
    let geo = new THREE.Geometry(),
      trunkHeight = rnd(7, 9),
      c1 = new THREE.Color(0x6c22b4),
      c2 = new THREE.Color(0x303c42),
      c3 = new THREE.Color(0x222233)

    c1.convertSRGBToLinear()
    c2.convertSRGBToLinear()
    c3.convertSRGBToLinear()

    let geoFoliage = data.knot
      ? new THREE.TorusKnotGeometry(10, 1.5, 67, 7, 8, 6).scale(0.2, 0.1, 0.1)
      : new THREE.SphereGeometry(2.0, 7, 8)

    setColor(geoFoliage, data.knot ? c1 : c2)
    geoFoliage.translate(0, trunkHeight, 0)
    geo.merge(geoFoliage)

    jitter(geoFoliage, 0.2)
    chopBottom(geoFoliage, -0.5)
    geoFoliage.computeFlatVertexNormals()

    let geoTrunk = new THREE.CylinderGeometry(rnd(0.1, 0.3), rnd(0.2, 0.4), trunkHeight, 32)
    setColor(geoTrunk, c3)
    geoTrunk.translate(0, trunkHeight / 2, 0)
    geo.merge(geoTrunk)

    this.geometry = geo
  },
})
