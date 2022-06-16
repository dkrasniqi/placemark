<script>
  import {createEventDispatcher, getContext } from "svelte";
  export let userId;
  const dispatch = createEventDispatcher();
  const placemarkService = getContext("PlacemarkService");

  async function deleteUser() {
    const success = await placemarkService.deleteUser(userId);
    dispatch("message", {
        success: true,
    });
  }


</script>
<div on:click={deleteUser} class="ui icon button">
  <i class="fas fa-trash"/>
</div>
