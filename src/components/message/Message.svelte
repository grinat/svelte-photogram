<script>
import { createEventDispatcher } from 'svelte'

const dispatch = createEventDispatcher()

export let type = 'danger'
export let title = 'Oops'
export let text = ''

export let isCloseable = false

let cssClass = `message is-${type} centered mt-30`
let wrapperClass = `sv-message ${isCloseable ? 'is-closeable' : ''}`

</script>

<div class="{wrapperClass}">
  <div class="{cssClass}">
      <div class="message-header">
        <p>{title}</p>
        {#if isCloseable}
        <button on:click="{() => dispatch('close')}" class="delete" aria-label="delete"></button>
        {/if}
      </div>
      <div class="message-body">
        {text}
      </div>
  </div>
</div>

<style>
.is-closeable{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(64, 64, 64, 0.57);
  z-index: 100;
  left: 0;
  top: 0;
}
</style>
