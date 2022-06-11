<script>
  export let error;
  console.log(error);
</script>

{#if error}

  <div class="notification is-danger">
    <p> There was a problem... </p>
    <ul>
        <li>{error.message}</li>
    </ul>
  </div>
{/if}