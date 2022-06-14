<script>
  import {getContext} from "svelte"; 
  const imageservice = getContext("ImageService");
  const user = JSON.parse(localStorage.placemark);

  let files;
  export let placemarkid;
  
  async function upload(){
    console.log("inside funciton")
    console.log("inside upload;")
    console.log("file:" + files[0]);
    const url = await imageservice.uploadImage(files[0])
    if (Object.keys(files[0]).length > 0) {
         
        }
    

  }


</script>
<div class="card">
  <div class="card-image">
    <figure class="image is-256x256">
     <!-- <img src={playlist.img}>-->
    </figure>
  </div>
  <div class="card-content">
    <form on:submit|preventDefault={upload} enctype="multipart/form-data">
      <div id="file-select" class="file has-name is-fullwidth">
        <label class="file-label"> 
          <input bind:files class="file-input" name="imagefile" type="file" accept="image/png, image/jpeg">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
              
            </span>
            <span class="file-label">
              Choose a file…
            </span>
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