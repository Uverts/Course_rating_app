import { writable } from 'svelte/store'

export const username = writable(localStorage.getItem('username'))
export const authorization = writable(localStorage.getItem('authorization'))

username.subscribe(newVal => {
  if (newVal) {
    localStorage.setItem('username', newVal)
  } else {
    localStorage.removeItem('username')
  }
})

authorization.subscribe(newVal => {
  if (newVal) {
    localStorage.setItem('authorization', newVal)
  } else {
    localStorage.removeItem('authorization')
  }
})
