// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
const Home = { template: '<home-view></home-view>' }
const Dolar = { template: '<view-table-dolar></view-table-dolar>'}
const Price = { template: '<view-table-price></view-table-price>'}
const Msg = { template: '<message-comp></message-comp>' }
const Tbl = { template: '<view-table-covid-19></view-table-covid-19>'}
const User = { template: '<div>User {{ $route.params.id }}</div>' }
const Pepe = { template: '<div>Hola Pepe</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/home', component: { template: '<home-view></home-view>' } },
    { path: '/dolar', component: { template: '<view-table-dolar></view-table-dolar>'} },
    { path: '/price', component: { template: '<view-table-price></view-table-price>'} },
    { path: '/msg', component: Msg },
    { path: '/covid', component: { template: '<view-table-covid-19></view-table-covid-19>'} },
    // dynamic segments start with a colon
    { path: '/user/:id', component: User },
    { path: '/pepe', component: Pepe }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
var app = new Vue({
    el: '#app',
    data: function() {
        return {
        items_app:[
            {name:"Vero", descript:"Musica", amount:200, paid:false},
            {name:"Romy", descript:"Secretaria", amount:100, paid:false},
            {name:"Lu", descript:"Tetona", amount:400, paid:true}
        ],
        // appName: 'Iniciando con Vuejs2',
        appNumber: 0,
        }
    },
    methods:{
        decNumber: function(){
            this.appNumber--;
        },
    },
    router
});

