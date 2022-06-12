<script>
  import { push } from "svelte-spa-router";
  import {getContext} from "svelte";  
  const placemarkService = getContext("PlacemarkService");
  const user = JSON.parse(localStorage.placemark);

  let placemarks = [];

  getPlacemarks();

  async function  getPlacemarks(){
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
      <th></th>
      <th></th>
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
       <!---  <a href="/placemark/{{_id}}" class="ui icon button">
            <i class="fas fa-info"></i>
          </a>   -->
        </td>
        <td>
         <!--- <a href="/dashboard/deleteplacemark/{{_id}}" class="ui icon button">
            <i class="fas fa-trash"></i>
          </a> -->
        </td>
      </tr>
    {/each}
  </tbody>
</table>
