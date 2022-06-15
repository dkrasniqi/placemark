<script>
  // @ts-nocheck

  import LoggedInNavigator from "../components/LoggedInNavigator.svelte";
  import ChartByCategories from "../components/ChartByCategories.svelte";
  import { push } from "svelte-spa-router";
  import { getContext, onMount } from "svelte";
  import { loop_guard } from "svelte/internal";
  const placemarkService = getContext("PlacemarkService");
  const user = JSON.parse(localStorage.placemark);

  const loggedInUser = localStorage.getItem("placemark");

  if (!loggedInUser) {
    push("/login");
  }

  let selected;

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
</script>

<LoggedInNavigator />

<div class="columns">
  <div class="column box has-text-centered">
    {#if selected === "line"}
      <ChartByCategories value="line" />
    {/if}
    {#if selected === "bar"}
      <ChartByCategories value="bar" />
    {/if}
    {#if selected === "axis-mixed"}
      <ChartByCategories value="axis-mixed" />
    {/if}
    {#if selected === "pie"}
      <ChartByCategories value="pie" />
    {/if}
    {#if selected === "percentage"}
      <ChartByCategories value="percentage" />
    {/if}

    <div class="field">
      <label for="type" class="label">Select Chart Type</label>
      <div class="select">
        <select bind:value={selected} name="type">
          <option>bar</option>
          <option>line</option>
          <option>axis-mixed</option>
          <option>pie</option>
          <option>percentage</option>
        </select>
      </div>
    </div>
  </div>
</div>
