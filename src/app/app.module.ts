import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';

import { routing } from "./app.routing";
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { SidebarComponent } from './components/usuario/sidebar/sidebar.component';
import { IndexProductosComponent } from './components/productos/index-productos/index-productos.component';
import { ShowProductosComponent } from './components/productos/show-productos/show-productos.component';
import { CarritoComponent } from './components/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    PerfilComponent,
    SidebarComponent,
    IndexProductosComponent,
    ShowProductosComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
