import axios from 'axios'
import {common} from "./endpoints"

export class Rest {
  #store = null

  constructor (store) {
    if (!store) {
      throw Error('store required')
    }
    this.#store = store
  }

  delete (url) {
    return axios.delete(url)
  }

  read (url) {
    return axios.get(url).catch(e => {
      this.#store.error.setError(e)
      return Promise.reject(e)
    })
  }

  create (url, data = {}) {
    return axios.post(url, data)
  }

  uploadFile (blob) {
    const data = new FormData()
    data.append('file', blob)

    return axios.post(common.upload(), data).then(({data: {file}}) => {
      return file
    })
  }

  getImageScoring (blob) {
    const data = new FormData()
    data.append('image', blob)

    return axios.post(common.nsfwScore(), data)
  }
}
