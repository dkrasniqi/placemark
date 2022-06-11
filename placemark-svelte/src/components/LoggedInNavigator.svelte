<script>
  import logo from "../assets/logo.png";
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
          <a id="dashboard" class="button" href="/#/dashboard"> Dashboard </a>
          <a id="settings" class="button" href="/#/settings">Settings</a>
          <a id="logout" class="button" href="/#/logout"> Logout </a>
        </div>
      </div>
    </div>
  </div>
</nav>
