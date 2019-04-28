export const IMAGE_DOMAIN = 'https://faap-app.herokuapp.com'

export const PORT = process.env.PORT || 3344

export const ROOT_API = (function () {
  if (process.env.NODE_ENV === 'test') {
    return `http://localhost:${PORT}/faap/`
  }
  return 'https://faap-app.herokuapp.com/faap/'
})()

export const SCORE_API = (function () {
  if (process.env.NODE_ENV === 'test') {
    return `http://localhost:${PORT}/api/`
  }
  return 'https://adult-image-detector.herokuapp.com/api/'
})()

export const NSFW_BOUND = 0.3
