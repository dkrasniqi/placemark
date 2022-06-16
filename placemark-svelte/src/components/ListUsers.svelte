<script>
  import { createEventDispatcher } from "svelte";
  import DeleteUserButton from "./DeleteUserButton.svelte";
  const dispatch = createEventDispatcher(); 
  export let users = [];

  async function update(){
    dispatch("message", {
        success: true,
      });
  }
</script>

<table class="table is-fullwidth is-striped">
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>E-Mail</th>
      <th>Role</th>
      <th />
    </tr>
  </thead>
  <tbody>
    {#each users as user}
      <tr>
        <td>
          {user.firstName}
        </td>
        <td>
          {user.lastName}
        </td>

        <td>
          {user.email}
        </td>
        <td>
          {user.role}
        </td>
        <td>
         <DeleteUserButton on:message={update} userId={user._id}/>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
