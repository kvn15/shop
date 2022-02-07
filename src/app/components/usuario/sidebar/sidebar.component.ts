import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public token:any;
  public _id:any;
  public user:any = undefined;
  public user_lc:any = undefined;

  constructor(private _clienteServices: ClienteService) {
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

  }

  ngOnInit(): void {
  }

}
