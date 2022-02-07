"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidebarComponent = void 0;
var core_1 = require("@angular/core");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(_clienteServices) {
        var _this = this;
        this._clienteServices = _clienteServices;
        this.user = undefined;
        this.user_lc = undefined;
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
    }
    SidebarComponent.prototype.ngOnInit = function () {
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.css']
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
