require("./bootstrap");

window.Vue = require("vue").default;

import Form from "vform";
import { HasError, AlertError } from "vform/src/components/bootstrap5";
import Vue from "vue";
import VueRouter from "vue-router";
import DataUsers from "./components/pages/DataUsers.vue";
import DataLevel from "./components/pages/DataLevel.vue";
import Swal from "sweetalert2";
import VueProgressBar from "vue-progressbar";

// START: Form input vform
window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
// END: Form input vform

// START: Load data tanpa refresh page
let Refresh = new Vue();
window.Refresh = Refresh;
// END: Load data tanpa refresh page

// START: Sweetalert2
window.Swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000
});
window.Toast = Toast;
// END: Sweetalert2

// START: Vue-progressbar
Vue.use(VueProgressBar, {
    color: "rgb(143, 255, 199)",
    failedColor: "red",
    thickness: "5px",
    transition: {
        speed: "0.2s",
        opacity: "0.6s",
        termination: 300
    },
    autoRevert: true,
    location: "top",
    inverse: false
});
// END: Vue-progressbar

// START: Vue-router
Vue.use(VueRouter);

const routes = [
    {
        path: "/data-users",
        name: "DataUsers",
        component: DataUsers
    },
    {
        path: "/data-level",
        name: "DataLevel",
        component: DataLevel
    },
    {
        path: "/",
        name: "ExampleComponent",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(
                /* webpackChunkName: "about" */ "./components/ExampleComponent.vue"
            )
    }
];

// START: Contoh default route vue
// Vue.component(
//     "example-component",
//     require("./components/ExampleComponent.vue").default
// );
// END: Contoh default route vue

const router = new VueRouter({
    routes
});

// END: Vue-router

const app = new Vue({
    el: "#app",
    router
});
