<script>
  import 'leaflet/dist/leaflet.css';
  import {LeafletMap} from '../services/leaflet-map';
  import {getContext, onMount} from "svelte";

  const placemarkService = getContext("PlacemarkService");
  const user = JSON.parse(localStorage.placemark);

  
  export let mapConfig = {
    location: {lat: 49.216123, lng: 12.664151},
    zoom: 13,
    minZoom: 1,
  };
  
  let mapSecond = null;

  onMount(async () => {
    mapSecond = new LeafletMap("second-map", mapConfig);
    mapSecond.showZoomControl();
    mapSecond.addLayerGroup('Landscape feature');
    mapSecond.addLayerGroup('National monumentum');
    mapSecond.addLayerGroup('Walking Trail');
    mapSecond.addLayerGroup('Bridge');
    mapSecond.addLayerGroup('Tree');
    mapSecond.addLayerGroup('Venue');
    mapSecond.addLayerGroup('Ringfort');
    mapSecond.addLayerGroup('Dolmen');
    mapSecond.addLayerGroup('River');
    mapSecond.addLayerGroup('Bog');
    mapSecond.addLayerGroup('Island');
    mapSecond.addLayerGroup('Forest');

    mapSecond.showLayerControl();
    const placemarks = await placemarkService.getUserPlacemarks(user.id);
    placemarks.forEach(placemark => {
      addPlacemarkMarker(placemark);
      
    });
  });
  

  export function addPlacemarkMarker(placemark) {
    const str = `Name: ${placemark.name}, Description: ${placemark.description}, Categorie: ${placemark.categorie}`;
    mapSecond.addMarker({lat: placemark.lat, lng: placemark.long}, str, placemark.categorie);
    mapSecond.moveTo(11, {lat: placemark.lat, lng: placemark.long});
  }
</script>

<div class="box" id="second-map" style="height:800px">
</div>