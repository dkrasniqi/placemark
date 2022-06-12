<script>
  import LoggedInNavigator from "../components/LoggedInNavigator.svelte";
  import ListSinglePlacemark from "../components/ListSinglePlacemark.svelte"

  export let params = {}  ;
  let placemarkId = params.id
  
</script>
<LoggedInNavigator/>

<section class="section columns is-vcentered">
  <div class="column has-text-centered">
    <ListSinglePlacemark id={placemarkId}/>
  </div>
  <div class="column">
   <!-- {{> playlist-image }}-->
  </div>
</section>