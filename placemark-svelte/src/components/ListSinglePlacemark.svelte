<script>
  import {getContext} from "svelte";  
  export let id="";
  const placemarkService = getContext("PlacemarkService");
  const user = JSON.parse(localStorage.placemark);
  
  let placemark={};

  getPlacemark();

  async function  getPlacemark(){
    const result = await placemarkService.getPlacemarkById(id);
    placemark = result;
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
    </tr>
  </thead>
  <tbody>
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
      </tr>
    
  </tbody>
</table>
