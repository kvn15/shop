"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexProductosComponent = void 0;
var core_1 = require("@angular/core");
var global_1 = require("src/app/services/global");
var IndexProductosComponent = /** @class */ (function () {
    function IndexProductosComponent(_clienteService, _actived) {
        var _this = this;
        this._clienteService = _clienteService;
        this._actived = _actived;
        this.config_categoria = {};
        this.filter_categoria = '';
        this.productos = [];
        this.filter_producto = '';
        this.filter_cat_productos = 'todos';
        this.load_data = true;
        //propiedades para la paginacion
        this.page = 1;
        this.pageSize = 15;
        //ordenar productos
        this.ordenar_por = 'Defecto';
        this.btn_cart = false;
        this.carrito = {
            variedad: '',
            cantidad: 1
        };
        this.url = global_1.GLOBAL.url;
        this.token = localStorage.getItem('token');
        this._clienteService.obtener_config_public().subscribe(function (resp) {
            _this.config_categoria = resp.data;
        });
        //OBTENER PARAMETROS CATEGORIAS
        this._actived.params.subscribe(function (param) {
            _this.route_categoria = param['categoria'];
            if (_this.route_categoria) {
                _this._clienteService.listar_producto_publico('').subscribe(function (resp) {
                    _this.productos = resp.data;
                    _this.productos = _this.productos.filter(function (item) { return item.categoria.toLowerCase() === _this.route_categoria; });
                    _this.load_data = false;
                }, function (err) {
                });
            }
            else {
                _this._clienteService.listar_producto_publico('').subscribe(function (resp) {
                    _this.productos = resp.data;
                    _this.load_data = false;
                }, function (err) {
                });
            }
        });
    }
    IndexProductosComponent.prototype.ngOnInit = function () {
        var slider = document.getElementById('slider');
        noUiSlider.create(slider, {
            start: [0, 1000],
            connect: true,
            range: {
                'min': 0,
                'max': 1000
            },
            tooltips: [true, true],
            pips: {
                mode: 'count',
                values: 5
            }
        });
        slider.noUiSlider.on('update', function (values) {
            $('.cs-range-slider-value-min').val(values[0]);
            $('.cs-range-slider-value-max').val(values[1]);
        });
        $('.noUi-tooltip').css('font-size', '11px');
    };
    IndexProductosComponent.prototype.buscar_categoria = function () {
        var _this = this;
        if (this.filter_categoria) {
            var search = new RegExp(this.filter_categoria, 'i');
            this.config_categoria.categorias = this.config_categoria.categorias.filter(function (item) { return search.test(item.titulo); });
        }
        else {
            this._clienteService.obtener_config_public().subscribe(function (resp) {
                _this.config_categoria = resp.data;
            });
        }
    };
    IndexProductosComponent.prototype.buscar_producto = function () {
        var _this = this;
        this._clienteService.listar_producto_publico(this.filter_producto).subscribe(function (resp) {
            _this.productos = resp.data;
            _this.load_data = false;
        }, function (err) {
        });
    };
    IndexProductosComponent.prototype.buscar_precio = function () {
        var _this = this;
        this._clienteService.listar_producto_publico(this.filter_producto).subscribe(function (resp) {
            _this.productos = resp.data;
            var min = parseInt($('.cs-range-slider-value-min').val());
            var max = parseInt($('.cs-range-slider-value-max').val());
            _this.productos = _this.productos.filter(function (item) {
                return item.precio >= min && item.precio <= max;
            });
        }, function (err) {
        });
    };
    IndexProductosComponent.prototype.buscar_por_categoria = function () {
        var _this = this;
        if (this.filter_cat_productos === 'todos') {
            this._clienteService.listar_producto_publico(this.filter_producto).subscribe(function (resp) {
                _this.productos = resp.data;
                _this.load_data = false;
            }, function (err) {
            });
        }
        else {
            this._clienteService.listar_producto_publico(this.filter_producto).subscribe(function (resp) {
                _this.productos = resp.data;
                _this.productos = _this.productos.filter(function (item) { return item.categoria === _this.filter_cat_productos; });
                _this.load_data = false;
            }, function (err) {
            });
        }
    };
    IndexProductosComponent.prototype.reset_producto = function () {
        var _this = this;
        this.filter_producto = '';
        this._clienteService.listar_producto_publico('').subscribe(function (resp) {
            _this.productos = resp.data;
            _this.load_data = false;
        }, function (err) {
        });
    };
    IndexProductosComponent.prototype.orden_por = function () {
        var _this = this;
        if (this.ordenar_por == 'Defecto') {
            this._clienteService.listar_producto_publico('').subscribe(function (resp) {
                _this.productos = resp.data;
                _this.load_data = false;
            }, function (err) {
            });
        }
        else if (this.ordenar_por == 'Popularidad') {
            //con el metodo sort ordenas un array
            this.productos.sort(function (a, b) {
                if (a.nventas < b.nventas) {
                    return 1;
                }
                if (a.nventas > b.nventas) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.ordenar_por == 'Mayor - menor precio') {
            this.productos.sort(function (a, b) {
                if (a.precio < b.precio) {
                    return 1;
                }
                if (a.precio > b.precio) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.ordenar_por == 'Menor - mayor precio') {
            this.productos.sort(function (a, b) {
                if (a.precio > b.precio) {
                    return 1;
                }
                if (a.precio < b.precio) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.ordenar_por == 'A - Z') {
            this.productos.sort(function (a, b) {
                if (a.titulo > b.titulo) {
                    return 1;
                }
                if (a.titulo < b.titulo) {
                    return -1;
                }
                return 0;
            });
        }
        else if (this.ordenar_por == 'Z - A') {
            this.productos.sort(function (a, b) {
                if (a.titulo < b.titulo) {
                    return 1;
                }
                if (a.titulo > b.titulo) {
                    return -1;
                }
                return 0;
            });
        }
    };
    IndexProductosComponent.prototype.agregar_producto = function (producto) {
        var _this = this;
        var variedad = (producto.variedades.length === 0) ? '' : producto.variedades[0].titulo;
        var data = {
            producto: producto._id,
            cliente: localStorage.getItem('_id'),
            cantidad: '1',
            variedad: variedad
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
    };
    IndexProductosComponent = __decorate([
        core_1.Component({
            selector: 'app-index-productos',
            templateUrl: './index-productos.component.html',
            styleUrls: ['./index-productos.component.css']
        })
    ], IndexProductosComponent);
    return IndexProductosComponent;
}());
exports.IndexProductosComponent = IndexProductosComponent;
