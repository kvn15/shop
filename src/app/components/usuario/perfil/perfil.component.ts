import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';

declare var iziToast:any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public cliente: any = {
    genero: '',
    pais: ''
  };
  public _id:any;
  public token:any;

  constructor(private _clienteServices: ClienteService) {
    this.token = localStorage.getItem('token');
    this._id = localStorage.getItem('_id');
    if (this._id) {
      this._clienteServices.obtener_cliente_guest(this._id,this.token).subscribe(
        resp=>{
          this.cliente = resp.data
          this.cliente.password = '';
        }, err=>{
          console.log(err)
        }
      )
    }
  }

  ngOnInit(): void {
  }

  actualizar(actualizarForm: NgForm){
    if (actualizarForm.valid) {
      this._clienteServices.actualizar_perfil_cliente_guest(this._id, this.cliente, this.token).subscribe(
        resp=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#fff',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizo correctamente el perfil del cliente'
          })
        }, err=> {
          console.log(err);

        }
      )
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      })
    }
  }

}
