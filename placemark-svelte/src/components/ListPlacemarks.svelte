<script>
  import { push } from "svelte-spa-router";
  import { getContext } from "svelte";
  import DeletePlacemarkButton from "./DeletePlacemarkButton.svelte";
  const placemarkService = getContext("PlacemarkService");
  const user = JSON.parse(localStorage.placemark);

  let placemarks = [];

  getPlacemarks();

  export async function getPlacemarks() {
    const result = await placemarkService.getUserPlacemarks(user.id);
    placemarks = result;
  }
</script>

<table class="table is-fullwidth">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Categorie</th>
      <th />
      <th />
    </tr>
  </thead>
  <tbody>
    {#each placemarks as placemark}
      <tr>
        <td>
          {placemark.name}
        </td>
        <td>
          {placemark.description}
        </td>

        <td>
          {placemark.lat}
        </td>
        <td>
          {placemark.long}
        </td>
        <td>
          {placemark.categorie}
        </td>
        <td>
          <a href="#/placemark/{placemark._id}" class="ui icon button">
            <i class="fas fa-info" />
          </a>
        </td>
        <td>
          <DeletePlacemarkButton on:message={getPlacemarks} placemarkId={placemark._id} />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
