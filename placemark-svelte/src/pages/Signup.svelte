<script>
  import Navigator from "../components/Navigator.svelte";
  import { push } from "svelte-spa-router";
  import { getContext } from "svelte";

  let firstName = "";
  let lastName = "";
  let email = "";
  let password = "";
  let error = "";

  const placemarkService = getContext("PlacemarkService");

  async function signup() {
    let success = await placemarkService.signup(
      firstName,
      lastName,
      email,
      password
    );
    if (success) {
      push("/login");
    } else {
      firstName = "";
      lastName = "";
      email = "";
      password = "";
      error = "Error while signing up";
    }
  }
</script>

<Navigator />

<section class="section">
  <h1 class="title">Sign up</h1>
  <form on:submit|preventDefault={signup} class="box">
    <label class="label" for="firstName">Name</label>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <div class="control has-icons-left">
            <input
              bind:value={firstName}
              type="text"
              placeholder="Please enter your first name"
              class="input"
              name="firstName"
            />
            <span class="icon is-small is-left">
              <i class="fa fa-user" />
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input
              bind:value={lastName}
              type="text"
              placeholder="Please enter your last name"
              class="input"
              name="lastName"
            />
            <span class="icon is-small is-left">
              <i class="fa fa-user" />
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label" for="email">E-Mail</label>
      <div class="control has-icons-left">
        <input
          bind:value={email}
          type="email"
          placeholder="Please input your e-mail"
          class="input"
          name="email"
        />
        <span class="icon is-small is-left">
          <i class="fa fa-lock" />
        </span>
      </div>
    </div>
    <div class="field">
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
            <i class="fa fa-at" />
          </span>
        </div>
      </div>
      <div class="field">
        <button class="button is-link"> Sign up </button>
      </div>
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
