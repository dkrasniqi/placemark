<script>
  import LoggedInNavigator from "../components/LoggedInNavigator.svelte";
  import { push } from "svelte-spa-router";
  import { getContext } from "svelte";
  const placemarkService = getContext("PlacemarkService");

  const loggedInUser = localStorage.getItem("placemark");
  
  console.log(loggedInUser);
  if (!loggedInUser) {
    push("/login");
  }
  const user = JSON.parse(localStorage.placemark);

  let newFirstName, newLastName;
  let oldPass,
    newPass,
    newPassConfirm = "";
  let oldMail,
    newMail,
    newMailConfirm = "";
  let error = "";

  async function changeName() {
    const success = await placemarkService.changeName(
      user.id,
      newFirstName,
      newLastName
    );
    if (success) {
      push("/settings");
    } else {
      newFirstName = "";
      newLastName = "";
      error = "Error while changing name";
    }
  }
  async function changeMail() {
    const success = await placemarkService.changeMail(
      user.id,
      oldMail,
      newMail,
      newMailConfirm
    );
    if (success) {
      push("/settings");
    } else {
      oldMail = "";
      newMail = "";
      newFirstName = "";
      error = "Error while changing Mail";
    }
  }
  async function changePass() {
    const success = await placemarkService.changePass(
      user.id,
      oldPass,
      newPass,
      newPassConfirm
    );
    if (success) {
      push("/settings");
    } else {
      oldPass = "";
      newPass = "";
      newPassConfirm = "";
      error = "Error while changing Password";
    }
  }
</script>

<LoggedInNavigator />

<section class="section ">
  <h1 class="title">User Settings</h1>
  <form on:submit|preventDefault={changeName} class="box">
    <label for="newFirstName" class="label">Name</label>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <input
            bind:value={newFirstName}
            class="input"
            type="text"
            placeholder="New first name"
            name="newFirstName"
          />
        </div>
        <div class="field">
          <input
            bind:value={newLastName}
            class="input"
            type="text"
            placeholder="New last name"
            name="newLastName"
          />
        </div>
      </div>
    </div>
    <div class="field is-grouped">
      <button class="button is-link">Change name</button>
    </div>
  </form>

  <form on:submit|preventDefault={changeMail} class="box">
    <label for="oldMail" class="label">E-Mail</label>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <input
            bind:value={oldMail}
            class="input"
            type="text"
            placeholder="Enter your old email"
            name="oldMail"
          />
        </div>
        <div class="field">
          <input
            bind:value={newMail}
            class="input"
            type="text"
            placeholder="Enter your new email"
            name="newMail"
          />
        </div>
        <div class="field">
          <input
            bind:value={newMailConfirm}
            class="input"
            type="text"
            placeholder="Repeat your new email"
            name="newMailConfirm"
          />
        </div>
      </div>
    </div>
    <div class="field is-grouped">
      <button class="button is-link">Change E-Mail</button>
    </div>
  </form>

  <form on:submit|preventDefault={changePass} class="box">
    <label for="oldPass" class="label">Password</label>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <input
            bind:value={oldPass}
            class="input"
            type="password"
            placeholder="Enter your old password"
            name="oldPass"
          />
        </div>
        <div class="field">
          <input
            bind:value={newPass}
            class="input"
            type="password"
            placeholder="Repeat your new password"
            name="newPass"
          />
        </div>
        <div class="field">
          <input
            bind:value={newPassConfirm}
            class="input"
            type="password"
            placeholder="Repeat your new password"
            name="newPassConfirm"
          />
        </div>
      </div>
    </div>
    <div class="field is-grouped">
      <button class="button is-link">Change Password</button>
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
