<script>
  import Navigator from "../components/Navigator.svelte";
  import { push } from "svelte-spa-router";
  import { getContext } from "svelte";

  let email = "";
  let password = "";
  let error = "";

  const placemarkService = getContext("PlacemarkService");

  async function login() {
    let success = await placemarkService.login(email, password);
    if (success) {
      push("/dashboard");
    } else {
      email = "";
      password = "";
      error = "E-Mail or password wrong";
    }
  }
</script>

<Navigator />

<section class="section">
  <h1 class="title">Log in</h1>
  <form
    on:submit|preventDefault={login}
    action="/login"
    method="POST"
    class="box"
  >
    <div class="field">
      <label class="label" for="email ">Email</label>
      <div class="control has-icons-left">
        <input
          bind:value={email}
          type="email"
          placeholder="youremail@gmail.com"
          class="input"
          name="email"
        />
        <span class="icon is-small is-left">
          <i class="fa fa-at" />
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label" for="password">Password</label>
      <div class="control has-icons-left">
        <input
          bind:value={password}
          type="password"
          placeholder="*******"
          class="input"
          name="password"
        />
        <span class="icon is-small is-left">
          <i class="fa fa-lock" />
        </span>
      </div>
    </div>
    <div class="field">
      <button class="button is-link"> Login </button>
    </div>
  </form>
  {#if error}
    <div class="notification is-danger">
      <p>There was a problem...</p>
      <ul>
        <li>{error}</li>
      </ul>
    </div>
  {/if}
</section>
