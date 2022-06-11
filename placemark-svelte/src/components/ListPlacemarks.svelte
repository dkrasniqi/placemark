<script>
  import { push } from "svelte-spa-router";
  import {getContext} from "svelte";  
  import { onMount } from 'svelte';
  const placemarkService = getContext("PlacemarkService");

  let placemarks = [];

  onMount(() => {
		const result = placemarkService.getUserPlacemarks(localStorage.id);
    console.log(result);
    placemarks = result;
	})

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
    {#each placemarks as {name,description, lat, long, categorie, }}
      <tr>
        <td>
          {{name}}
        </td>
        <td>
          {{description}}
        </td>

        <td>
          {{lat}}
        </td>
        <td>
          {{long}}
        </td>
         <td>
          {{categorie}}
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
