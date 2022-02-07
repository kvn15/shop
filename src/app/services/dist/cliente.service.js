"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClienteService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var global_1 = require("./global");
var angular_jwt_1 = require("@auth0/angular-jwt");
var ClienteService = /** @class */ (function () {
    function ClienteService(_http) {
        this._http = _http;
        this.url = global_1.GLOBAL.url;
    }
    ClienteService.prototype.login_cliente = function (data) {
        var header = new http_1.HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'login_cliente', data, { headers: header });
    };
    ClienteService.prototype.obtener_cliente_guest = function (id, token) {
        var header = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
        return this._http.get(this.url + 'obtener_cliente_guest/' + id, { headers: header });
    };
    ClienteService.prototype.actualizar_perfil_cliente_guest = function (id, data, token) {
        var header = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
        return this._http.put(this.url + 'actualizar_perfil_cliente_guest/' + id, data, { headers: header });
    };
    // listar_clientes_filtro_admin(tipo:any, filtro:any, token: any): Observable<any> {
    //   let header = new HttpHeaders({
    //     'Content-Type': 'application/json', 'Authorization': token
    //   });
    //   return this._http.get<any>(this.url + 'listar_clientes_filtro_admin/'+tipo+'/'+filtro, { headers: header });
    // }
    ClienteService.prototype.isAuntenticate = function () {
        var token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        try {
            var helper = new angular_jwt_1.JwtHelperService();
            var decodedToken = helper.decodeToken(token);
            //Validar si el token a expirado
            if (helper.isTokenExpired(token)) {
                localStorage.clear();
                return false;
            }
            if (!decodedToken) {
                localStorage.clear();
                return false;
            }
        }
        catch (error) {
            localStorage.clear();
            return false;
        }
        return true;
    };
    ClienteService.prototype.obtener_config_public = function () {
        var header = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this._http.get(this.url + 'obtener_config_public', { headers: header });
    };
    ClienteService.prototype.listar_producto_publico = function (filtro) {
        var header = new http_1.HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this._http.get(this.url + 'listar_producto_publico/' + filtro, { headers: header });
    };
    ClienteService.prototype.agregar_carrito_cliente = function (data, token) {
        var header = new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
        return this._http.post(this.url + 'agregar_carrito_cliente', data, { headers: header });
    };
    ClienteService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ClienteService);
    return ClienteService;
}());
exports.ClienteService = ClienteService;
