import { getRouter } from "@curi/svelte"

export function getCurrentRoute() {
  const router = getRouter()
  if (router) {
    return getRouter().current().response
  }
  return {
    params: {}
  }
}

export function goToRoute(routeObj = {}) {
  const router = getRouter()
  if (router) {
    const url = router.url(routeObj)
    router.navigate({url})
  }
}
