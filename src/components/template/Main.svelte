<script>
  import { getNavigation } from "@curi/svelte"
  import { onDestroy } from 'svelte'
  import NavLink from '../nav/NavLinks.svelte'
  import Message from '../message/Message.svelte'
  import {store} from '../../stores'

  // listen errors
  let error
  const errSubs = store.error.subscribe(value => {
      error = value
  })

  // reset error on nav changed
  const nav = getNavigation()
  const navSubs = nav.subscribe(() => {
    store.error.resetError()
  })

  onDestroy(() => {
    errSubs()
    navSubs()
  })
</script>

<NavLink />
<main>
  <section class="hero">
    {#if error}
    <Message text="{error}"/>
    {:else}
    <div class="hero-body">
      <slot></slot>
    </div>
    {/if}
  </section>
</main>
