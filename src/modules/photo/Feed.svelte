<script>
import Link from "../../components/nav/Link.svelte"
import Progress from '../../components/progress/Progress.svelte'
import PhotoCard from './components/PhotoCard.svelte'
import {Rest} from '../../services/Rest'
import {photo} from '../../services/endpoints'
import { onMount } from 'svelte'
import {store} from '../../stores'

const rest = new Rest(store)

let items = []
let loading = true
let page = 1
let totalCount = 0
const perPage = 20

let canRemove = process.env.NODE_ENV === 'development'

async function handleRemove (row) {
  await rest.delete(photo.delete(row.id))
  items = items.filter(v => v.id !== row.id)
}

onMount(async () => {
	const {data} = await rest.read(photo.feed({
	  'per-page': perPage,
	  page
	}))
  items = data.data
  totalCount = data._meta.totalCount
  loading = false
})

let loadingNext = false
async function loadNext() {
  if (loadingNext) {
    return
  }

  page++
  loadingNext = true
  const {data} = await rest.read(photo.feed({
  	'per-page': perPage,
  	page
  }))
  loadingNext = false
  items = items.concat(data.data)
  totalCount = data._meta.totalCount
}

$: loadingNextCssClass = loadingNext ? 'is-loading centered button is-medium is-fullwidth' : 'centered button is-medium is-fullwidth'
$: canLoadNext = items.length < totalCount
</script>

<Progress loading="{loading}"></Progress>

<div class="photo-feed">
  {#if items.length === 0 && !loading}
  <div class="centered">nothing to show...</div>
  {/if}
  {#each items as item (item.id)}
  <div class="card centered mb-30">
    <Link name='photo.view' params="{{id: item.id}}">
      <PhotoCard item="{item}">
        <p slot="title" class="title is-4">
        {item.title}
        {#if canRemove}
          <a href="#remove" on:click|stopPropagation|preventDefault="{() => handleRemove(item)}">x</a>
        {/if}
        </p>
      </PhotoCard>
   </Link>
  </div>
  {/each}
  {#if canLoadNext}
  <button class="{loadingNextCssClass}" on:click="{loadNext}">Load next</button>
  {/if}
</div>
