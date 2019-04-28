<script>
import Message from '../../components/message/Message.svelte'
import BrowserImageManipulation from 'browser-image-manipulation'
import {Rest} from '../../services/Rest'
import {photo} from '../../services/endpoints'
import {goToRoute} from '../../utils/router'
import {IMAGE_DOMAIN} from '../../config'
import {Image} from './models/Image.js'
import {store} from '../../stores'

const image = new Image()
const iM = new BrowserImageManipulation()
const rest = new Rest(store)

let error = null
let isUploading = false
let isProcess = false
let hasImage = false

function onChangeFile(evt) {
  if (!(evt.target && evt.target.files && evt.target.files[0])) {
    return
  }

  processImage(evt.target.files[0])
}

function onFileDrop(evt) {
  if (!(evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files[0])) {
    return
  }

  processImage(evt.dataTransfer.files[0])
}

async function processImage (file) {
  if (isProcess) {
    return
  }

  isProcess = true
  error = null
  const prevSrc = image.src
  try {
    const {blob, base64, width, height, smallBase64} = await convertImage(file)
    image.src = base64
    image.width = width
    image.height = height

    const {data: {open_nsfw_score: score}} = await rest.getImageScoring(blob)

    image.nsfwScore = score
    image.blob = blob
    image.smallBase64 = smallBase64
    hasImage = true
  } catch (e) {
    image.src = prevSrc
    console.error(e)
    error = e.toString()
  } finally {
    isProcess = false
  }
}

async function convertImage(file) {
  await iM.loadBlob(file).toSquare(500)

  const blob = await iM.saveAsBlob()

  // heroku dont save files
  // after dyno restart, all files droped
  // use base64 on image load error
  const base64 = await iM.saveAsImage()

  const canvas = await iM.saveAsCanvas()
  const width = canvas.width
  const height = canvas.height

  const smallBase64 = await iM.toSquare(128).saveAsImage()

  return {blob, base64, width, height, smallBase64}
}

$: submitDisabled = isProcess || isUploading || !hasImage
$: imageProcessing = isProcess || isUploading

async function handleForm() {
  if ($submitDisabled) {
    return
  }

  isUploading = true
  try {
    // upload image to server
    const uploadInfo = await rest.uploadFile(image.blob)

    // set absolute path
    image.path = IMAGE_DOMAIN + uploadInfo.relativeUrl

    // create model on server
    const {data: {id}} = await rest.create(photo.create(), image.getDto())

    goToRoute({name: 'photo.view', params: {id}})
  } catch (e) {
    console.error(e)
    error = e.toString()
  } finally {
    isUploading = false
  }
}

function onDragEnd() {}

function onDragStart() {}

let imageInput
function onLabelClick() {
  imageInput.click()
}
</script>

{#if error}
   <Message text="{error}" isCloseable on:close="{() => error = null}"/>
{/if}

<div class="photo-create container centered">
<form on:submit|preventDefault="{handleForm}">
  <div class="field">
    <div class="control">
      <input bind:value={image.title} required minlength="2" maxlength="100" class="input" type="text" placeholder="Image title">
    </div>
  </div>
  <div class="field">
    <figure
      class="uploader image is-square"
      on:drag|stopPropagation|preventDefault="{onDragEnd}"
      on:dragover|stopPropagation|preventDefault="{onDragStart}"
      on:dragstart|stopPropagation|preventDefault="{onDragStart}"
      on:dragenter|stopPropagation|preventDefault="{onDragStart}"
      on:dragend|stopPropagation|preventDefault="{onDragEnd}"
      on:dragleave|stopPropagation|preventDefault="{onDragEnd}"
      on:drop|stopPropagation|preventDefault="{onFileDrop}"
    >
      <label on:click="{onLabelClick}" class="{imageProcessing ? 'centered-hw is-image-processing' : 'centered-hw'}">
      {#if imageProcessing}
      wait...
      {:else if !hasImage}
      click to select or drop image
      {/if}
      </label>
      <img src={image.src} alt="">
      <input bind:this={imageInput} on:change={onChangeFile} title="" type="file" name="image" accept="image/*">
    </figure>
  </div>
  <div class="field">
    <div class="control centered-text">
      <button type="submit" class="button is-link" disabled="{submitDisabled}">Save</button>
    </div>
  </div>
</form>
</div>

<style>
.uploader{
position: relative;
border: 1px solid #eeeeee;
}

.uploader input[type="file"]{
position: absolute;
top:0;
left: 0;
opacity: 0;
display: block;
width: 100%;
height: 100%;
}

.uploader label{
z-index: 100;
}

.uploader label.is-image-processing{
background: #fff;
border: 2px solid #fff;
border-radius: 12px;
min-width: 50px;
}
</style>
