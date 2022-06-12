<script>
  import { push } from "svelte-spa-router";
  import {getContext} from "svelte";  
  const placemarkService = getContext("PlacemarkService");

  let name ="";
  let description ="";
  let lat  ="";
  let long ="";
  let categorie="";
  let error ="";
  const credentials = JSON.parse(localStorage.placemark);

  async function addplacemark(){
    let success = await placemarkService.addPlacemark(name, description, lat, long, categorie, credentials.id);
    if(success){
    push("/dashboard");
  }
  else{
    name ="";
    description="";
    lat = "";
    long ="";
    categorie ="";
    error="Error while adding placemark";
  }

  }

</script>



<form on:submit|preventDefault={addplacemark} class="box">
    <div class="field">
      <label for="name" class="label">Placemark Name</label>
      <input bind:value={name} class="input" type="text" placeholder="Enter placemark name" name="name">
    </div>
    <div class="field">
      <label for="description "class="label">Placemark Description</label>
      <input bind:value={description} class="input" type="text" placeholder="Enter placemark name" name="description">
    </div>
    <div class="field">
      <label for="lat" class="label">Placemark Lat</label>
      <input bind:value={lat} class="input" type="text" placeholder="Enter Latitude" name="lat">
    </div>
    <div class="field">
      <label for="long" class="label">Placemark Long</label>
      <input bind:value={long} class="input" type="text" placeholder="Enter Longitude" name="long">
    </div>
    <div class="field">
      <label for="categorie" class="label">Placemark Categorie</label>
      <div class="select">
        <select bind:value={categorie} name="categorie">
          <option>Landscape feature</option>
          <option>National monumentum</option>
          <option>Walking Trail</option>
          <option>Bridge</option>
          <option>Tree</option>
          <option>Venue</option>
          <option>Ringfort</option>
          <option>Dolmen</option>
          <option>River</option>
          <option>Bog</option>
          <option>Island</option>
          <option>Forest</option>
        </select>
      </div>
    </div>

    <button class="button is-link">Add Placemark</button>
  </form>

  {#if error}

  <div class="notification is-danger">
    <p> There was a problem... </p>
    <ul>
        <li>{error}</li>
    </ul>
  </div>
{/if}
