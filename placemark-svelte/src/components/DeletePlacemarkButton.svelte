<script>
  import {createEventDispatcher, getContext } from "svelte";
  export let placemarkId;
  const placemarkService = getContext("PlacemarkService");
  const dispatch = createEventDispatcher();

  async function deleteplacemark() {
    const success = await placemarkService.deletePlacemark(placemarkId);
    dispatch("message", {
        success: true,
      });
  }

</script>

<div on:click={deleteplacemark} class="ui icon button">
  <i class="fas fa-trash" />
</div>