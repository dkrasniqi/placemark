<script>
  import logo from "../assets/logo.png";
  const user = JSON.parse(localStorage.placemark);
</script>

<nav class="navbar">
  <div class="navbar-brand">
    <div class="column">
      <a href="/#/dashboard">
        <img src={logo} alt="logo" >
      </a>
    </div>
  </div>
  <div class="navbar-menu" id="navMenu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          {#if user.role === "admin"}
          <a id="admin-dashboard" class="button" href="/#/admin/dashboard">Admin Dashbooard</a>
          {/if}
          <a id="dashboard" class="button" href="/#/dashboard">Dashboard</a>
          <a id="map" class="button" href="/#/map">Map</a>
          <a id="charts" class="button" href="/#/charts">Charts</a>
          <a id="settings" class="button" href="/#/settings">Settings</a>
          <a id="logout" class="button" href="/#/logout"> Logout </a>
        </div>
      </div>
    </div>
  </div>
</nav>
