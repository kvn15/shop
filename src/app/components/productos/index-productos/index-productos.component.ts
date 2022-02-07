import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { GLOBAL } from 'src/app/services/global';
import { ActivatedRoute } from '@angular/router';
declare var noUiSlider:any;
declare var jQuery: any;
declare var $:any;

declare var iziToast:any;

@Component({
  selector: 'app-index-productos',
  templateUrl: './index-productos.component.html',
  styleUrls: ['./index-productos.component.css']
})
export class IndexProductosComponent implements OnInit {

  public config_categoria:any = {};
  public filter_categoria:string = '';
  public productos: Array<any> = [];
  public filter_producto: any = '';
  public filter_cat_productos:any = 'todos'

  public load_data:boolean = true;

  //url de api
  public url:any;

  //parametro url por categoria
  public route_categoria:any;

  //propiedades para la paginacion
  public page: any = 1;
  public pageSize: any = 15;

  //ordenar productos
  public ordenar_por:string = 'Defecto';
  public token:any;
  public btn_cart:boolean = false;

  carrito:any = {
    variedad: '',
    cantidad: 1
  }


  constructor(private _clienteService: ClienteService, private _actived: ActivatedRoute) {

    this.url = GLOBAL.url;
    this.token = localStorage.getItem('token')

    this._clienteService.obtener_config_public().subscribe(
      resp=>{
        this.config_categoria = resp.data;
      }
    )

    //OBTENER PARAMETROS CATEGORIAS
    this._actived.params.subscribe(
      param => {
        this.route_categoria = param['categoria']
        if (this.route_categoria) {
          this._clienteService.listar_producto_publico('').subscribe(
            resp => {
              this.productos = resp.data;
              this.productos = this.productos.filter( item => item.categoria.toLowerCase() === this.route_categoria)
              this.load_data = false;
            }, err=>{

            }
          )
        }else{
          this._clienteService.listar_producto_publico('').subscribe(
            resp => {
              this.productos = resp.data;
              this.load_data = false;
            }, err=>{

            }
          )
        }
      }
    )


  }

  ngOnInit(): void {
    var slider : any = document.getElementById('slider');
    noUiSlider.create(slider, {
        start: [0, 1000],
        connect: true,
        range: {
            'min': 0,
            'max': 1000
        },
        tooltips: [true,true],
        pips: {
          mode: 'count',
          values: 5,

        }
    })

    slider.noUiSlider.on('update', function (values:any) {
        $('.cs-range-slider-value-min').val(values[0]);
        $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size','11px');
  }

  buscar_categoria(){
    if (this.filter_categoria) {
      var search = new RegExp(this.filter_categoria, 'i');
      this.config_categoria.categorias = this.config_categoria.categorias.filter(
        (item:any) =>  search.test(item.titulo)
      );
    }else{
      this._clienteService.obtener_config_public().subscribe(
        resp=>{
          this.config_categoria = resp.data;
        }
      )
    }
  }

  buscar_producto(){
    this._clienteService.listar_producto_publico(this.filter_producto).subscribe(
      resp => {
        this.productos = resp.data;
        this.load_data = false;
      }, err=>{

      }
    )
  }

  buscar_precio(){

    this._clienteService.listar_producto_publico(this.filter_producto).subscribe(
      resp => {
        this.productos = resp.data;
        let min = parseInt($('.cs-range-slider-value-min').val());
        let max = parseInt($('.cs-range-slider-value-max').val());

        this.productos = this.productos.filter(
          (item:any)=> {
            return item.precio  >= min && item.precio <= max;
          }
        )
      }, err=>{

      }
    )

  }

  buscar_por_categoria(){
    if (this.filter_cat_productos === 'todos') {
      this._clienteService.listar_producto_publico(this.filter_producto).subscribe(
        resp => {
          this.productos = resp.data;
          this.load_data = false;
        }, err=>{

        }
      )
    }else{
      this._clienteService.listar_producto_publico(this.filter_producto).subscribe(
        resp => {
          this.productos = resp.data;
          this.productos = this.productos.filter( item => item.categoria === this.filter_cat_productos)
          this.load_data = false;
        }, err=>{

        }
      )
    }
  }

  reset_producto(){
    this.filter_producto = '';
    this._clienteService.listar_producto_publico('').subscribe(
      resp => {
        this.productos = resp.data;
        this.load_data = false;
      }, err=>{

      }
    )
  }

  orden_por(){

    if (this.ordenar_por == 'Defecto') {
      this._clienteService.listar_producto_publico('').subscribe(
            resp => {
              this.productos = resp.data;
              this.load_data = false;
            }, err=>{

            }
          )
    }else if (this.ordenar_por == 'Popularidad') {
      //con el metodo sort ordenas un array
      this.productos.sort(function(a:any,b:any){
        if (a.nventas < b.nventas) {
          return 1;
        }
        if (a.nventas > b.nventas) {
          return -1;
        }
        return 0;
      })
    }else if (this.ordenar_por == 'Mayor - menor precio') {
      this.productos.sort(function(a:any,b:any){
        if (a.precio < b.precio) {
          return 1;
        }
        if (a.precio > b.precio) {
          return -1;
        }
        return 0;
      })
    }else if (this.ordenar_por == 'Menor - mayor precio') {
      this.productos.sort(function(a:any,b:any){
        if (a.precio > b.precio) {
          return 1;
        }
        if (a.precio < b.precio) {
          return -1;
        }
        return 0;
      })
    }else if (this.ordenar_por == 'A - Z') {
      this.productos.sort(function(a:any,b:any){
        if (a.titulo > b.titulo) {
          return 1;
        }
        if (a.titulo < b.titulo) {
          return -1;
        }
        return 0;
      })
    }else if (this.ordenar_por == 'Z - A') {
      this.productos.sort(function(a:any,b:any){
        if (a.titulo < b.titulo) {
          return 1;
        }
        if (a.titulo > b.titulo) {
          return -1;
        }
        return 0;
      })
    }

  }

  agregar_producto(producto: any){

    let variedad = (producto.variedades.length === 0) ? '' : producto.variedades[0].titulo

    let data = {
      producto: producto._id,
      cliente: localStorage.getItem('_id'),
      cantidad: '1',
      variedad: variedad
    }

    this.btn_cart = true;

    this._clienteService.agregar_carrito_cliente(data, this.token).subscribe(
      resp => {
        if (resp.data == undefined) {
          iziToast.show({
            title: 'ERROR',
            titleColor: '#ff0000',
            color: '#fff',
            class: 'text-danger',
            position: 'topRight',
            message: 'El producto ya existe en el carrito'
          })
          this.btn_cart = false;
        }else{
          console.log(resp)
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#fff',
            class: 'text-success',
            position: 'topRight',
            message: 'Se agrego el producto al Carrito'
          })

          this.btn_cart = false;
        }
      }
    )

  }

}
