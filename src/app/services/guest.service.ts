import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from 'src/app/services/global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  public url:any;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  obtener_producto_publico_slug(slug:any): Observable<any> {
    let header = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.get<any>(this.url + 'obtener_producto_publico_slug/'+slug, { headers: header });
  }

  listar_producto_recomendado_publico(categoria:any): Observable<any> {
    let header = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.get<any>(this.url + 'listar_producto_recomendado_publico/'+categoria, { headers: header });
  }

}
