<script>
  import ListPlacemarks from "../components/ListPlacemarks.svelte";
  import AddPlacemark from "../components/AddPlacemark.svelte";
  import LoggedInNavigator from "../components/LoggedInNavigator.svelte";
  import PlacemarkMap from "../components/PlacemarkMap.svelte";
  import { getContext } from "svelte";
  import {push} from "svelte-spa-router";

  const loggedInUser = localStorage.getItem("placemark");
  const placemarkService = getContext("PlacemarkService");
  let placemarkMap = null;
  let listPlacemarks = null;


  if(!loggedInUser){
    push("/login");
  };



  function addedPlacemark(event) {
    placemarkMap.addPlacemarkMarker(event.detail.placemark);
    listPlacemarks.getPlacemarks();
  }
  
</script>

<LoggedInNavigator/>
<section class="section columns is-hcentered">
  <div class="column has-text-centered">
    <PlacemarkMap bind:this={placemarkMap}/>
  </div>
  <div class="column">
    <AddPlacemark on:message={addedPlacemark}/>
    <ListPlacemarks bind:this={listPlacemarks}/>
    <br>
  </div>
  <br>
</section>

