<script>
  import ListPlacemarks from "../components/ListPlacemarks.svelte";
  import AddPlacemark from "../components/AddPlacemark.svelte";
  import LoggedInNavigator from "../components/LoggedInNavigator.svelte";
  import { getContext } from "svelte";
  import {push} from "svelte-spa-router";

  const loggedInUser = localStorage.getItem("placemark");
  const placemarkService = getContext("PlacemarkService");

  if(!loggedInUser){
    push("/login");
  };
  
</script>

<LoggedInNavigator/>
<section class="section columns is-hcentered">
  <div class="column has-text-centered">
    <ListPlacemarks/>
  </div>
  <div class="column">
    <AddPlacemark/>
    <br>
    <!--{{> error}}-->
  </div>
  <br>
</section>

