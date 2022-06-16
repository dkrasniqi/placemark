<script>
  import LoggedInNavigator from "../components/LoggedInNavigator.svelte";
  import ListPlacemarksAdmin from "../components/ListPlacemarksAdmin.svelte";
  import ListUsers from "../components/ListUsers.svelte";
  import { getContext } from "svelte";
  import { push } from "svelte-spa-router";

  const user = JSON.parse(localStorage.placemark);
  let users = [];
  let placemarks = [];
  const placemarkService = getContext("PlacemarkService");

  if (user.role !== "admin") {
    push("/dashboard");
  }
  getUsers();
  getPlacemarks();

  async function getUsers() {
    const response = await placemarkService.getAllUsers();
    if (response) {
      users = response;
    }
  }

  async function getPlacemarks() {
    const response = await placemarkService.getAllPlacemarks();
    if (response) {
      placemarks = response;
    }
  }
</script>

<LoggedInNavigator />
<section class="info-tiles">
  <div class="tile is-ancestor has-text-centered">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">{users.length}</p>
        <p class="subtitle">Users</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">{placemarks.length}</p>
        <p class="subtitle">Placemarks</p>
      </article>
    </div>
  </div>
</section>

<div class="columns">
  <div class="column">
    <ListUsers on:message={getUsers} {users} />
  </div>

  <div class="column">
    <ListPlacemarksAdmin on:message={getPlacemarks} {placemarks} />
  </div>
</div>
