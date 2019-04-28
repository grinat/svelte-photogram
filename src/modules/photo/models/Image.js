export class Image {
  blob = null
  src = ''
  nsfwScore = 100
  path = null
  title = ''
  createdAt = 0
  width = 0
  height = 0
  smallBase64 = ''

  getDto () {
    return {
      nsfwScore: this.nsfwScore,
      path: this.path,
      title: this.title,
      createdAt: +Date.now(),
      width: this.width,
      height: this.height,
      smallBase64: this.smallBase64
    }
  }
}
