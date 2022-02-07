import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public token: any;
  public _id:any;
  public user:any = undefined;
  public user_lc:any = undefined
  public config_categoria:any = {}

  public op_cart:boolean = false;

  constructor(private _clienteServices: ClienteService, private _route: Router) {
    this.token = localStorage.getItem('token');
    this._id = localStorage.getItem('_id');


    if (this.token) {
      this._clienteServices.obtener_cliente_guest(this._id, this.token).subscribe(
        resp=> {
          this.user = resp.data;
          localStorage.setItem('user_data', JSON.stringify(this.user));
          if (localStorage.getItem('user_data')) {
            this.user_lc = JSON.parse(localStorage.getItem('user_data')!);
          }else{
            this.user_lc = undefined;
          }
        },err=>{
          this.user = undefined;
        }
      )
    }

    this._clienteServices.obtener_config_public().subscribe(
      resp=>{
        this.config_categoria = resp.data;
      }
    )

   }

  ngOnInit(): void {
  }

  cerrarSesion(){
    window.location.reload();
    localStorage.clear();
    this._route.navigate(['/'])
  }

  open_modalCart(){
    if (!this.op_cart) {
      this.op_cart = true;
      $('#cart').addClass('show');
    }else{
      this.op_cart = false;
      $('#cart').removeClass('show');
    }
  }

}
