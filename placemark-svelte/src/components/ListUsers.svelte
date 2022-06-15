<script>
  export let users = [];
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
          <a
            href="#/admin/dashboard/deleteuser/{user._id}"
            class="ui icon button"
          >
            <i class="fas fa-trash" />
          </a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
