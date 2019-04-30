<script>
import * as moment from 'moment'
import {store} from '../../../stores'
import {NSFW_BOUND} from '../../../config'
const user = store.user

export let item = {}
export let cssClass = 'card centered'

$: isCanShow = item.nsfwScore < NSFW_BOUND || $user.openedNsfw.indexOf(item.id) > -1

function showNsfw(row) {
  store.user.addNsfw(row.id)
}

let showSmall = false
function onImageLoadError() {
  showSmall = true
}

const formatedDate = moment(item.createdAt, 'x').format('MMMM Do YYYY, H:mm')
</script>


  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <slot name="title">
          <p class="title is-4">{item.title}</p>
        </slot>
        <p class="subtitle is-6">{formatedDate}</p>
      </div>
    </div>
  </div>

  <div class="card-image">
    <figure class="image is-square">
      {#if isCanShow}
      <img on:error="{onImageLoadError}" src="{showSmall ? item.smallBase64 : item.path}" alt="{item.title}">
      {:else}
      <div class="centered-hw danger">
      is content may be nsfw
      <br>
      <a href="#show" on:click|stopPropagation|preventDefault="{() => showNsfw(item)}">show</a>
      </div>
      {/if}
    </figure>
  </div>

