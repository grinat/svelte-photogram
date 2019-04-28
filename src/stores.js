import { writable } from 'svelte/store'

// helper function
const saveInLocalStorage = function (key, data) {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(data))
  }
}

const errorStore = function () {
  const { subscribe, set, update } = writable(null)

  return {
    subscribe,
    setError: (err) => update(() => err.toString()),
    resetError: () => set(null)
  }
}


class User {
  id = null
  openedNsfw = []
}

const userStore = function () {
  const USER_STORAGE = 'USER_STORAGE'
  let user = new User()

  // grab data form staorage
  if (typeof window !== 'undefined' && window.localStorage) {
    let saved = window.localStorage.getItem(USER_STORAGE) ? JSON.parse(window.localStorage.getItem(USER_STORAGE)) : null
    if (saved) {
      user = Object.assign(user, saved)
    }
  }

  const { subscribe, update } = writable(user)

  return {
    subscribe,
    addNsfw: (id) => update((u) => {
      u.openedNsfw.push(id)
      saveInLocalStorage(USER_STORAGE, u)
      return u
    })
  }
}

export const store = {
  error: errorStore(),
  user: userStore()
}
