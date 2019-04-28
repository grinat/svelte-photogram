<script>
  import { getNavigation } from "@curi/svelte"
  import { onDestroy } from 'svelte'
  import Link from "./Link.svelte"

  let isOpened = false

  function toggleMenu() {
    isOpened = !isOpened
  }

  // close menu on navigate
  const nav = getNavigation()
  const navSubs = nav.subscribe(() => {
     isOpened = false
  })

  onDestroy(() => {
     navSubs()
  })
</script>

<nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">

    <Link name='photo.feed' cssClass="navbar-item">(◕‿◕)</Link>

    <a
      on:click|preventDefault={toggleMenu}
      class="{isOpened ? 'is-active navbar-burger burger' : ' navbar-burger burger'}"
      role="button" href="#exp" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="{isOpened ? 'is-active navbar-menu' : ' navbar-menu'}">
    <div class="navbar-start">

      <Link name='photo.feed' cssClass="navbar-item">Feed</Link>

      <Link name='photo.create' cssClass="navbar-item">Add photo</Link>

    </div>
  </div>
</nav>

<style>
.navbar-brand{
margin-right: 15px;
}
</style>
