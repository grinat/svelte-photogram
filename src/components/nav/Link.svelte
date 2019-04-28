<a {...forward} href={url} on:click={handleClick} class="{cssClass}">
  <slot></slot>
</a>

<script>
    // based on: @curi/svelte/components/Link.svelte
    import { getContext } from "svelte"
    import { getRouter } from "@curi/svelte"

    // in test route not exist
    let router = getRouter() || {
      url () {}
    }

    const canNavigate = (event, target) => {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) &&
        (!target || target === "_self")
      )
    }

    export let name = undefined
    export let params = {}
    export let hash = undefined
    export let query = undefined
    export let state = null
    export let navigating = false
    export let forward = {}
    export let cssClass = ''

    $: url = router.url({ name, params, hash, query })
    $: target = forward.target

    function handleClick(event) {
      if (canNavigate(event, target)) {
        event.preventDefault()
        router.navigate({ url, state })
      }
    }
</script>
