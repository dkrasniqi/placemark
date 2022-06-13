<script>
  import Welcome from "./pages/Welcome.svelte";
  import Login from "./pages/Login.svelte";
  import Signup from "./pages/Signup.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import Settings from "./pages/Settings.svelte";
  import Placemark from "./pages/Placemark.svelte";
  import DeletePlacemark from "./pages/DeletePlacemark.svelte";
  import DeletePlacemarkAdmin from "./pages/DeletePlacemarkAdmin.svelte";
  import Admin from "./pages/Admin.svelte";
  import DeleteUser from "./pages/DeleteUser.svelte";
  import Map from "./pages/Map.svelte";


  import Router from "svelte-spa-router";
  import { PlacemarkService } from "./services/PlacemarkService.js"
  import { setContext} from "svelte";

  let routes = {
    "/": Welcome,
    "/login": Login,
    "/signup": Signup,
    "/logout": Welcome,
    "/dashboard": Dashboard,
    "/settings": Settings,
    "/placemark/:id": Placemark,
    "/dashboard/deleteplacemark/:id": DeletePlacemark,
    "/admin/dashboard/deleteplacemark/:id": DeletePlacemarkAdmin,
    "/admin/dashboard/deleteuser/:id": DeleteUser, 
    "/admin/dashboard": Admin,
    "/map": Map,
  
  }

  setContext("PlacemarkService", new PlacemarkService("https://calm-sierra-28993.herokuapp.com"));
</script>

<div class="container">
  <Router {routes}/>
</div>