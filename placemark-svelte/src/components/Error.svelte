<script>
  export let error ="";
</script>

{#if error}

  <div class="notification is-danger">
    <p> There was a problem... </p>
    <ul>
        <li>{error}</li>
    </ul>
  </div>
{/if}