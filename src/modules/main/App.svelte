<script>
  // Route example app: https://github.com/pshrmn/curi/tree/3f32147357f28ce87d77f207136c4878a29ea295/examples/svelte/basic
  import Router from "@curi/svelte/components/Router.svelte";
	import Root from './Root.svelte'

  export let router
</script>

<Router {router}>
  <Root />
</Router>
