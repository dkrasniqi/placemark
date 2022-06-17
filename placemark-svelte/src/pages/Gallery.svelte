<script>
  import { divIcon } from "leaflet";
  import { getContext, onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import LoggedInNavigator from "../components/LoggedInNavigator.svelte";
  const placemarkService = getContext("PlacemarkService");
  const user = JSON.parse(localStorage.placemark);
  let placemarks = null;
  const loggedInUser = localStorage.getItem("placemark");

  if (!loggedInUser) {
    push("/login");
  }
 

  onMount(async () => {
    placemarks = await placemarkService.getUserPlacemarks(user.id);
    console.log(placemarks);
  });


</script>

<LoggedInNavigator/>
<section class="section columns is-hcentered">
  
  {#if placemarks}
    {#each placemarks as placemark}
      {#each placemark.img as image }
      <div class="column">
      <div class="card">
        <div class="card-image">
          <figure class="image is-256x256">
            <img src={image} alt="your upload"/>
          </figure>
        </div>    
      </div>   
    </div>
      {/each}
    {/each}
  {/if}

</section>

  
