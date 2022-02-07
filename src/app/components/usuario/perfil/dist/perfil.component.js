"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PerfilComponent = void 0;
var core_1 = require("@angular/core");
var PerfilComponent = /** @class */ (function () {
    function PerfilComponent(_clienteServices) {
        var _this = this;
        this._clienteServices = _clienteServices;
        this.cliente = {
            genero: '',
            pais: ''
        };
        this.token = localStorage.getItem('token');
        this._id = localStorage.getItem('_id');
        if (this._id) {
            this._clienteServices.obtener_cliente_guest(this._id, this.token).subscribe(function (resp) {
                _this.cliente = resp.data;
                _this.cliente.password = '';
            }, function (err) {
                console.log(err);
            });
        }
    }
    PerfilComponent.prototype.ngOnInit = function () {
    };
    PerfilComponent.prototype.actualizar = function (actualizarForm) {
        if (actualizarForm.valid) {
            this._clienteServices.actualizar_perfil_cliente_guest(this._id, this.cliente, this.token).subscribe(function (resp) {
                iziToast.show({
                    title: 'SUCCESS',
                    titleColor: '#1DC74C',
                    color: '#fff',
                    "class": 'text-success',
                    position: 'topRight',
                    message: 'Se actualizo correctamente el perfil del cliente'
                });
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
    PerfilComponent = __decorate([
        core_1.Component({
            selector: 'app-perfil',
            templateUrl: './perfil.component.html',
            styleUrls: ['./perfil.component.css']
        })
    ], PerfilComponent);
    return PerfilComponent;
}());
exports.PerfilComponent = PerfilComponent;
