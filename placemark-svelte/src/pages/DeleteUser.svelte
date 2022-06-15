<script>
  import { getContext } from "svelte";
  import { push } from "svelte-spa-router";
  export let params = {};
  let userId = params.id;
  const placemarkService = getContext("PlacemarkService");

  deleteUser();

  async function deleteUser() {
    const success = await placemarkService.deleteUser(userId);
    push("/admin/dashboard");
  }
</script>
