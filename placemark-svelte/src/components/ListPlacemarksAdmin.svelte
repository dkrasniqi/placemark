<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import DeletePlacemarkButton from "./DeletePlacemarkButton.svelte";
  export let placemarks = [];

  async function update(){
    dispatch("message", {
        success: true,
      });
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
          <a href="/#/placemark/{placemark._id}" class="ui icon button">
            <i class="fas fa-info" />
          </a>
        </td>
        <td>
         <DeletePlacemarkButton on:message={update} placemarkId={placemark._id}/>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
