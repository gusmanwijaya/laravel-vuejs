/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue").default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

import Form from "vform";
import { HasError, AlertError } from "vform/src/components/bootstrap5";
window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

import Vue from "vue";
import VueRouter from "vue-router";
import DataUsers from "./components/pages/DataUsers.vue";
import DataLevel from "./components/pages/DataLevel.vue";

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

// Vue.component(
//     "example-component",
//     require("./components/ExampleComponent.vue").default
// );

const router = new VueRouter({
    routes
});

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: "#app",
    router
});
