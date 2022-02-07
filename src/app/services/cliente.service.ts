import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url:any;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login_cliente(data:any): Observable<any> {
    let header = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post<any>(this.url + 'login_cliente',data, { headers: header });
  }

  obtener_cliente_guest(id:any, token: any): Observable<any> {
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this._http.get<any>(this.url + 'obtener_cliente_guest/'+id, { headers: header });
  }

  actualizar_perfil_cliente_guest(id:any,data:any, token: any): Observable<any> {
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this._http.put<any>(this.url + 'actualizar_perfil_cliente_guest/'+id,data, { headers: header });
  }

  // listar_clientes_filtro_admin(tipo:any, filtro:any, token: any): Observable<any> {
  //   let header = new HttpHeaders({
  //     'Content-Type': 'application/json', 'Authorization': token
  //   });
  //   return this._http.get<any>(this.url + 'listar_clientes_filtro_admin/'+tipo+'/'+filtro, { headers: header });
  // }

  public isAuntenticate():boolean{

    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token!);

      //Validar si el token a expirado
      if (helper.isTokenExpired(token)) {
        localStorage.clear();
        return false;
      }

      if (!decodedToken) {
        localStorage.clear();
        return false;
      }
    } catch (error) {
      localStorage.clear();
      return false;
    }

    return true;
  }

  obtener_config_public(): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<any>(this.url + 'obtener_config_public', { headers: header });
  }

  listar_producto_publico(filtro:any): Observable<any> {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<any>(this.url + 'listar_producto_publico/'+filtro, { headers: header });
  }

  agregar_carrito_cliente(data:any, token: any): Observable<any> {
    let header = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});
    return this._http.post<any>(this.url + 'agregar_carrito_cliente',data,{ headers: header });
  }

}
