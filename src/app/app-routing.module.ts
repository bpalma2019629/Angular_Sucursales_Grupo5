import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EmpresasComponent} from './components/empresas/empresas.component';
import { ProductosEmpresaComponent } from './components/productos-empresa/productos-empresa.component';
import{ GraficasComponent} from './components/graficas/graficas.component';
import { ProductosSucursalesComponent } from './components/productos-sucursales/productos-sucursales.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { UsuarioEditarComponent } from './components/usuario-editar/usuario-editar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'editarUsuario', component: UsuarioEditarComponent },
  { path: '', redirectTo: 'inicio',  pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'verSucursales/:idEmpresa', component: DashboardAdminComponent},
  { path: 'inicio', component: InicioComponent },
  { path: 'empresas', component: EmpresasComponent},
  { path: 'productos', component: ProductosEmpresaComponent},
  { path: 'verProductos/:idSucursal', component: ProductosSucursalesComponent},
  {path: 'graficas', component: GraficasComponent},
  { path: '**', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
