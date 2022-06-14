<script>
import LoggedInNavigator from "../components/LoggedInNavigator.svelte";
import PlacemarkMap from "../components/PlacemarkMap.svelte";
import SideMap from "../components/SideMap.svelte";
import {push} from "svelte-spa-router";

const loggedInUser = localStorage.getItem("placemark");
if(!loggedInUser){
    push("/login");
  };

  const mapFirst ="placemark-regensburg";

 const secondMapOptions =  {
    location: {lat: 49.216123, lng: 12.664151},
    zoom: 8,
    minZoom: 1,
  };

</script>

<LoggedInNavigator/>
<section class="section columns is-hcentered">
  <div class="column has-text-centered">
    <PlacemarkMap />
  </div>
  <div class="column">
    <SideMap/>
  </div>
  <br>
</section>

