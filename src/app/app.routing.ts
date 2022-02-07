import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { AuthGuard } from './guards/auth.guard';
import { IndexProductosComponent } from './components/productos/index-productos/index-productos.component';
import { ShowProductosComponent } from './components/productos/show-productos/show-productos.component';
import { CarritoComponent } from './components/carrito/carrito.component';

const appRoute : Routes = [
  {path: '',component: InicioComponent},
  {path: 'login',component: LoginComponent},

  //proteger rutas si no esta autenticado
  {path: 'cuenta/perfil',component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'carrito',component: CarritoComponent, canActivate: [AuthGuard]},

  {path: 'productos',component: IndexProductosComponent },
  {path: 'productos/categoria/:categoria',component: IndexProductosComponent },
  {path: 'productos/:slug',component: ShowProductosComponent },

]

export const appRoutingProvider : any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
