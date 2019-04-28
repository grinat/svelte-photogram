<script>
  import { getResponse } from "@curi/svelte"
  const response = getResponse()
</script>

<svelte:component this={$response.body.template}>
  <svelte:component this={$response.body.body} />
</svelte:component>
