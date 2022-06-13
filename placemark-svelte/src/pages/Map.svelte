<script>
import LoggedInNavigator from "../components/LoggedInNavigator.svelte";
import PlacemarkMap from "../components/PlacemarkMap.svelte";
import {push} from "svelte-spa-router";

const loggedInUser = localStorage.getItem("placemark");
if(!loggedInUser){
    push("/login");
  };

</script>

<LoggedInNavigator/>
<section class="section columns is-hcentered">
  <div class="column has-text-centered">
    <PlacemarkMap/>
  </div>
  <br>
</section>
