<script>
  import { getContext, onMount } from "svelte";
  const placemarkService = getContext("PlacemarkService");
  const user = JSON.parse(localStorage.placemark);

  let files;
  export let placemarkid;
  let images;

  onMount(async () => {
    updateImages();
  });

  async function updateImages(){
    console.log("inside of update")
    images = await placemarkService.getPlacemarkImages(placemarkid);
  }


  async function upload() {
    const response = await placemarkService.uploadPicture(
      placemarkid,
      files[0]
    );
    updateImages();
  }

  
</script>

<div class="card">
  <div class="card-image">
    <figure class="image is-256x256">
      {#if images}
        {#each images as image, i}
          <img src={image} alt="your upload"/>
        {/each}
      {/if}
    </figure>
  </div>
  <div class="card-content">
    <form on:submit|preventDefault={upload} enctype="multipart/form-data">
      <div id="file-select" class="file has-name is-fullwidth">
        <label class="file-label">
          <input
            bind:files
            class="file-input"
            name="imagefile"
            type="file"
            accept="image/png, image/jpeg"
          />
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload" />
            </span>
            <span class="file-label"> Choose a file… </span>
          </span>
          <span class="file-name">
            {#if files}
              {files[0].name}
            {/if}
          </span>
        </label>
        <button type="submit" class="button is-info">Upload</button>
      </div>
    </form>
  </div>
</div>
