"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_clienteServices, _router) {
        this._clienteServices = _clienteServices;
        this._router = _router;
        this.user = {};
        this.usuario = {};
        this.token = localStorage.getItem('token');
        if (this.token) {
            this._router.navigate(['/']);
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function (loginForm) {
        var _this = this;
        if (loginForm.valid) {
            var data = {
                email: this.user.email,
                password: this.user.password
            };
            this._clienteServices.login_cliente(data).subscribe(function (resp) {
                if (resp.data === undefined) {
                    iziToast.show({
                        title: 'ERROR',
                        titleColor: '#ff0000',
                        color: '#fff',
                        "class": 'text-danger',
                        position: 'topRight',
                        message: resp.message
                    });
                }
                else {
                    _this.usuario = resp.data;
                    localStorage.setItem('token', resp.token);
                    localStorage.setItem('_id', resp.data._id);
                    _this._router.navigate(['/']);
                }
            }, function (err) {
                console.log(err);
            });
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#ff0000',
                color: '#fff',
                "class": 'text-danger',
                position: 'topRight',
                message: 'Los datos del formulario no son validos'
            });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
