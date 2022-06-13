<script>
  export let placemarks = [];
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
          <a href="/#/placemark/{placemark._id}" class="ui icon button">
            <i class="fas fa-info"></i>
          </a>
        </td>
        <td>
          <a href="/#/admin/dashboard/deleteplacemark/{placemark._id}" class="ui icon button">
            <i class="fas fa-trash"></i>
          </a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
