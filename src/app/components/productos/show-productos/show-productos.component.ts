import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';
import { GuestService } from '../../../services/guest.service';
import { ClienteService } from '../../../services/cliente.service';

//declaramos nuestro slider de productos single
declare var tns:any;
declare var lightGallery:any;

declare var iziToast:any;

@Component({
  selector: 'app-show-productos',
  templateUrl: './show-productos.component.html',
  styleUrls: ['./show-productos.component.css']
})
export class ShowProductosComponent implements OnInit {

  public slug:any;
  public producto:any = {}
  public producto_recomendado:Array<any> = [];
  public url:any;
  public token:any;

  carrito:any = {
    variedad: '',
    cantidad: 1
  }

  public btn_cart:boolean = false;

  constructor(private _route:ActivatedRoute, private _guestService: GuestService, private _clienteService: ClienteService) {
    this._route.params.subscribe(
      param => {
        this.slug = param['slug'];
        this._guestService.obtener_producto_publico_slug(this.slug).subscribe(
          resp=>{
            this.producto = resp.data;
            this._guestService.listar_producto_recomendado_publico(this.producto.categoria).subscribe(
              response=> {
                this.producto_recomendado = response.data
              }
            )
          }
        )
      }
    )

    this.url = GLOBAL.url
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {

    setTimeout(() => {
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
        gutter: 15,
      });

      //declaramos el zoom

    var e = document.querySelectorAll(".cs-gallery");
    if (e.length){
      for (var t = 0; t < e.length; t++){
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

  }

  agregar_producto(){
    if (this.carrito.variedad) {
      if (this.carrito.cantidad <= this.producto.stock) {

        let data = {
          producto: this.producto._id,
          cliente: localStorage.getItem('_id'),
          cantidad: this.carrito.cantidad,
          variedad: this.carrito.variedad
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

      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#ff0000',
          color: '#fff',
          class: 'text-danger',
          position: 'topRight',
          message: 'La maxima cantidad disponible es: '+ this.producto.stock
        })
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'Seleccione una variedad de producto'
      })
    }
  }

}
