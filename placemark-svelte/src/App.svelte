<script>
  import Welcome from "./pages/Welcome.svelte";
  import Login from "./pages/Login.svelte";
  import Signup from "./pages/Signup.svelte";

  import Router from "svelte-spa-router";
  import { PlacemarkService } from "./services/PlacemarkService.js"
  import { setContext} from "svelte";

  let routes = {
    "/": Welcome,
    "/login": Login,
    "/signup": Signup,
  }

  setContext("PlacemarkService", new PlacemarkService("http://localhost:4000"));
</script>

<div class="container">
  <Router {routes}/>
</div>