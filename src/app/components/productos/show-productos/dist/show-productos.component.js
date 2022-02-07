"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShowProductosComponent = void 0;
var core_1 = require("@angular/core");
var global_1 = require("src/app/services/global");
var ShowProductosComponent = /** @class */ (function () {
    function ShowProductosComponent(_route, _guestService, _clienteService) {
        var _this = this;
        this._route = _route;
        this._guestService = _guestService;
        this._clienteService = _clienteService;
        this.producto = {};
        this.producto_recomendado = [];
        this.carrito = {
            variedad: '',
            cantidad: 1
        };
        this.btn_cart = false;
        this._route.params.subscribe(function (param) {
            _this.slug = param['slug'];
            _this._guestService.obtener_producto_publico_slug(_this.slug).subscribe(function (resp) {
                _this.producto = resp.data;
                _this._guestService.listar_producto_recomendado_publico(_this.producto.categoria).subscribe(function (response) {
                    _this.producto_recomendado = response.data;
                });
            });
        });
        this.url = global_1.GLOBAL.url;
        this.token = localStorage.getItem('token');
    }
    ShowProductosComponent.prototype.ngOnInit = function () {
        setTimeout(function () {
            tns({
                container: '.cs-carousel-inner',
                controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
                navPosition: "top",
                controlsPosition: "top",
                mouseDrag: !0,
                speed: 600,
                autoplayHoverPause: !0,
                autoplayButtonOutput: !1,
                navContainer: "#cs-thumbnails",
                navAsThumbnails: true,
                gutter: 15
            });
            //declaramos el zoom
            var e = document.querySelectorAll(".cs-gallery");
            if (e.length) {
                for (var t = 0; t < e.length; t++) {
                    lightGallery(e[t], { selector: ".cs-gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
                }
            }
            //inicializar sllider de productos recomendados
            tns({
                container: '.cs-carousel-inner-two',
                controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
                navPosition: "top",
                controlsPosition: "top",
                mouseDrag: !0,
                speed: 600,
                autoplayHoverPause: !0,
                autoplayButtonOutput: !1,
                nav: false,
                controlsContainer: "#custom-controls-related",
                responsive: {
                    0: {
                        items: 1,
                        gutter: 20
                    },
                    480: {
                        items: 2,
                        gutter: 24
                    },
                    700: {
                        items: 3,
                        gutter: 24
                    },
                    1100: {
                        items: 4,
                        gutter: 30
                    }
                }
            });
        }, 500);
    };
    ShowProductosComponent.prototype.agregar_producto = function () {
        var _this = this;
        if (this.carrito.variedad) {
            if (this.carrito.cantidad <= this.producto.stock) {
                var data = {
                    producto: this.producto._id,
                    cliente: localStorage.getItem('_id'),
                    cantidad: this.carrito.cantidad,
                    variedad: this.carrito.variedad
                };
                this.btn_cart = true;
                this._clienteService.agregar_carrito_cliente(data, this.token).subscribe(function (resp) {
                    if (resp.data == undefined) {
                        iziToast.show({
                            title: 'ERROR',
                            titleColor: '#ff0000',
                            color: '#fff',
                            "class": 'text-danger',
                            position: 'topRight',
                            message: 'El producto ya existe en el carrito'
                        });
                        _this.btn_cart = false;
                    }
                    else {
                        console.log(resp);
                        iziToast.show({
                            title: 'SUCCESS',
                            titleColor: '#1DC74C',
                            color: '#fff',
                            "class": 'text-success',
                            position: 'topRight',
                            message: 'Se agrego el producto al Carrito'
                        });
                        _this.btn_cart = false;
                    }
                });
            }
            else {
                iziToast.show({
                    title: 'ERROR',
                    titleColor: '#ff0000',
                    color: '#fff',
                    "class": 'text-danger',
                    position: 'topRight',
                    message: 'La maxima cantidad disponible es: ' + this.producto.stock
                });
            }
        }
        else {
            iziToast.show({
                title: 'ERROR',
                titleColor: '#ff0000',
                color: '#fff',
                "class": 'text-danger',
                position: 'topRight',
                message: 'Seleccione una variedad de producto'
            });
        }
    };
    ShowProductosComponent = __decorate([
        core_1.Component({
            selector: 'app-show-productos',
            templateUrl: './show-productos.component.html',
            styleUrls: ['./show-productos.component.css']
        })
    ], ShowProductosComponent);
    return ShowProductosComponent;
}());
exports.ShowProductosComponent = ShowProductosComponent;
