import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:any = {};
  public usuario:any = {};
  public token:any;

  constructor(private _clienteServices: ClienteService, private _router: Router) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this._router.navigate(['/'])
    }
   }

  ngOnInit(): void {
  }

  login(loginForm: NgForm){
    if (loginForm.valid) {
      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._clienteServices.login_cliente(data).subscribe(
        resp => {
          if (resp.data === undefined) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#ff0000',
              color: '#fff',
              class: 'text-danger',
              position: 'topRight',
              message: resp.message
            })
          }else{
            this.usuario = resp.data

            localStorage.setItem('token', resp.token);
            localStorage.setItem('_id', resp.data._id)

            this._router.navigate(['/']);
          }
        },err => {
          console.log(err);

        })
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
