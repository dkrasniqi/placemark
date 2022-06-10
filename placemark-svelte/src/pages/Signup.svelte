<script>
import Navigator from "../components/Navigator.svelte";
import { push } from "svelte-spa-router";

let firstName ="";
let lastName ="";
let email = "";
let password = "";

async function signup() {
    push("/");
  }
</script>
<Navigator/>

<section class="section">
  <h1 class="title">Sign up</h1>
  <form on:submit|preventDefault={signup} action="/register" method="POST" class="box">
    <label class="label" for="firstName">Name</label>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <div class="control has-icons-left">
            <input bind:value={firstName} type="text" placeholder="Please enter your first name" class="input" name="firstName">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input bind:value={lastName} type="text" placeholder="Please enter your last name" class="input" name="lastName">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </div>
        </div>

      </div>
    </div>

    <div class="field">
      <label class="label" for="email">E-Mail</label>
      <div class="control has-icons-left">
        <input bind:value={email} type="email" placeholder="Please input your e-mail" class="input" name="email">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
      </div>
    </div>
    <div class="field">
    
    <div class="field">
      <label class="label" for="password">Password</label>
      <div class="control has-icons-left">
        <input bind:value={password} type="password" placeholder="*******" class="input" name="password">
        <span class="icon is-small is-left">
         <i class="fa fa-at"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <button class="button is-link">
        Sign up
      </button>
    </div>
  </form>
</section>


