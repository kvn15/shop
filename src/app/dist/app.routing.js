"use strict";
exports.__esModule = true;
exports.routing = exports.appRoutingProvider = void 0;
var router_1 = require("@angular/router");
var inicio_component_1 = require("./components/inicio/inicio.component");
var login_component_1 = require("./components/login/login.component");
var perfil_component_1 = require("./components/usuario/perfil/perfil.component");
var auth_guard_1 = require("./guards/auth.guard");
var index_productos_component_1 = require("./components/productos/index-productos/index-productos.component");
var show_productos_component_1 = require("./components/productos/show-productos/show-productos.component");
var carrito_component_1 = require("./components/carrito/carrito.component");
var appRoute = [
    { path: '', component: inicio_component_1.InicioComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    //proteger rutas si no esta autenticado
    { path: 'cuenta/perfil', component: perfil_component_1.PerfilComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'carrito', component: carrito_component_1.CarritoComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'productos', component: index_productos_component_1.IndexProductosComponent },
    { path: 'productos/categoria/:categoria', component: index_productos_component_1.IndexProductosComponent },
    { path: 'productos/:slug', component: show_productos_component_1.ShowProductosComponent },
];
exports.appRoutingProvider = [];
exports.routing = router_1.RouterModule.forRoot(appRoute);
