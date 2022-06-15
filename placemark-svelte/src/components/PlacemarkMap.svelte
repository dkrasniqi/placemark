<script>
  import "leaflet/dist/leaflet.css";
  import { LeafletMap } from "../services/leaflet-map";
  import { getContext, onMount } from "svelte";

  const placemarkService = getContext("PlacemarkService");
  const user = JSON.parse(localStorage.placemark);

  export let mapConfig = {
    location: { lat: 49.002433, lng: 12.095984 },
    zoom: 11,
    minZoom: 1,
  };
  let map = null;

  onMount(async () => {
    map = new LeafletMap("placemark-map", mapConfig);
    map.showZoomControl();
    map.addLayerGroup("Landscape feature");
    map.addLayerGroup("National monumentum");
    map.addLayerGroup("Walking Trail");
    map.addLayerGroup("Bridge");
    map.addLayerGroup("Tree");
    map.addLayerGroup("Venue");
    map.addLayerGroup("Ringfort");
    map.addLayerGroup("Dolmen");
    map.addLayerGroup("River");
    map.addLayerGroup("Bog");
    map.addLayerGroup("Island");
    map.addLayerGroup("Forest");

    map.showLayerControl();
    const placemarks = await placemarkService.getUserPlacemarks(user.id);
    placemarks.forEach((placemark) => {
      addPlacemarkMarker(placemark);
    });
  });

  export function addPlacemarkMarker(placemark) {
    const str = `Name: ${placemark.name}, Description: ${placemark.description}, Categorie: ${placemark.categorie}`;
    map.addMarker(
      { lat: placemark.lat, lng: placemark.long },
      str,
      placemark.categorie
    );
    map.moveTo(11, { lat: placemark.lat, lng: placemark.long });
  }
</script>

<div class="box" id="placemark-map" style="height:800px" />
