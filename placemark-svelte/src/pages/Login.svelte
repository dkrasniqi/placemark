<script>
import Navigator from "../components/Navigator.svelte";
import { push } from "svelte-spa-router";

let email ="";
let password ="";

async function login() {
    push("/donate");
  }

</script>

<Navigator />

<section class="section">
  <h1 class="title">Log in</h1>
  <form on:submit|preventDefault={login} action="/login" method="POST" class="box">
    <div class="field">
      <label class="label"  for="email ">Email</label>
      <div class="control has-icons-left">
        <input bind:value={email} type="email" placeholder="youremail@gmail.com" class="input" name="email">
        <span class="icon is-small is-left">
          <i class="fa fa-at"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label" for="password">Password</label>
      <div class="control has-icons-left">
        <input bind:value={password} type="password" placeholder="*******" class="input" name="password">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <button class="button is-link">
        Login
      </button>
    </div>
  </form>

</section>

