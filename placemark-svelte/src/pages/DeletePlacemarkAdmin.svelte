<script>
  import { getContext } from "svelte";
  import { push } from "svelte-spa-router";
  export let params = {};
  let placemarkId = params.id;
  const placemarkService = getContext("PlacemarkService");

  deleteplacemark();

  async function deleteplacemark() {
    const success = await placemarkService.deletePlacemark(placemarkId);
    push("/admin/dashboard");
  }
</script>
