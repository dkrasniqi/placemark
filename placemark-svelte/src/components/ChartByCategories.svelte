<script>
  // @ts-nocheck

  import Chart from "svelte-frappe-charts";
  import { getContext, onMount, afterUpdate } from "svelte";
  const placemarkService = getContext("PlacemarkService");
  const user = JSON.parse(localStorage.placemark);

  export let value;

  let data = {
    labels: [
      "Landscape feature",
      "National monumentum",
      "Walking Trail",
      "Bridge",
      "Tree",
      "Venue",
      "Ringfort",
      "Dolmen",
      "River",
      "Bog",
      "Island",
      "Forest",
    ],
    datasets: [
      {
        values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  onMount(async () => {
    let placemarks = await placemarkService.getUserPlacemarks(user.id);
    placemarks.forEach((placemark) => {
      if (placemark.categorie == "Landscape feature") {
        data.datasets[0].values[0] += 1;
      } else if (placemark.categorie == "National monumentum") {
        data.datasets[0].values[1] += 1;
      } else if (placemark.categorie == "Walking Trail") {
        data.datasets[0].values[2] += 1;
      } else if (placemark.categorie == "Bridge") {
        data.datasets[0].values[3] += 1;
      } else if (placemark.categorie == "Tree") {
        data.datasets[0].values[4] += 1;
      } else if (placemark.categorie == "Venue") {
        data.datasets[0].values[5] += 1;
      } else if (placemark.categorie == "Ringfort") {
        data.datasets[0].values[6] += 1;
      } else if (placemark.categorie == "Dolmen") {
        data.datasets[0].values[7] += 1;
      } else if (placemark.categorie == "River") {
        data.datasets[0].values[8] += 1;
      } else if (placemark.categorie == "Bog") {
        data.datasets[0].values[9] += 1;
      } else if (placemark.categorie == "Island") {
        data.datasets[0].values[10] += 1;
      } else if (placemark.categorie == "Forest") {
        data.datasets[0].values[11] += 1;
      }
    });
  });
</script>

<h1 class="title is-4">Your Placemarks by Categories</h1>
<Chart {data} type={value} />
