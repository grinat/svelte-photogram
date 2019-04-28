<script>
import {getCurrentRoute} from '../../utils/router'
import {Rest} from '../../services/Rest'
import {photo} from '../../services/endpoints'
import { onMount } from 'svelte'
import Progress from '../../components/progress/Progress.svelte'
import PhotoCard from './components/PhotoCard.svelte'
import {store} from '../../stores'

const rest = new Rest(store)
const currRoute = getCurrentRoute()

let item = {}
let loading = true

onMount(async () => {
  const {data} = await rest.read(photo.view(currRoute.params.id))
  item = data
  loading = false
})
</script>

<Progress loading="{loading}"></Progress>

<div class="photo-view">
  {#if !loading}
  <div class="card centered mb-30">
    <PhotoCard item="{item}"></PhotoCard>
  </div>
  {/if}
</div>
