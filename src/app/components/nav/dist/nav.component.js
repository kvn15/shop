"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavComponent = void 0;
var core_1 = require("@angular/core");
var NavComponent = /** @class */ (function () {
    function NavComponent(_clienteServices, _route) {
        var _this = this;
        this._clienteServices = _clienteServices;
        this._route = _route;
        this.user = undefined;
        this.user_lc = undefined;
        this.config_categoria = {};
        this.op_cart = false;
        this.token = localStorage.getItem('token');
        this._id = localStorage.getItem('_id');
        if (this.token) {
            this._clienteServices.obtener_cliente_guest(this._id, this.token).subscribe(function (resp) {
                _this.user = resp.data;
                localStorage.setItem('user_data', JSON.stringify(_this.user));
                if (localStorage.getItem('user_data')) {
                    _this.user_lc = JSON.parse(localStorage.getItem('user_data'));
                }
                else {
                    _this.user_lc = undefined;
                }
            }, function (err) {
                _this.user = undefined;
            });
        }
        this._clienteServices.obtener_config_public().subscribe(function (resp) {
            _this.config_categoria = resp.data;
        });
    }
    NavComponent.prototype.ngOnInit = function () {
    };
    NavComponent.prototype.cerrarSesion = function () {
        window.location.reload();
        localStorage.clear();
        this._route.navigate(['/']);
    };
    NavComponent.prototype.open_modalCart = function () {
        if (!this.op_cart) {
            this.op_cart = true;
            $('#cart').addClass('show');
        }
        else {
            this.op_cart = false;
            $('#cart').removeClass('show');
        }
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'app-nav',
            templateUrl: './nav.component.html',
            styleUrls: ['./nav.component.css']
        })
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
