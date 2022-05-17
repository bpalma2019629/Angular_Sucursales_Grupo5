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
import { InicioUsuarioComponent } from './components/inicio-usuario/inicio-usuario.component';
import { InicioAdminComponent } from './components/inicio-admin/inicio-admin.component';
import { UsuarioGuard } from './services/usuario.guard';
import { AdminGuard } from './services/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'inicio',  pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  { path: 'usuario',  component: InicioUsuarioComponent, canActivate: [UsuarioGuard]  ,children: [
    { path: 'productos', component: ProductosEmpresaComponent},
    { path: 'verProductos/:idSucursal', component: ProductosSucursalesComponent},
    {path: 'graficas', component: GraficasComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'editarUsuario', component: UsuarioEditarComponent },
  ]},
  { path: 'admin',  component: InicioAdminComponent, canActivate: [AdminGuard]  ,children: [
    { path: 'empresas', component: EmpresasComponent},
    { path: 'verSucursales/:idEmpresa', component: DashboardAdminComponent},
  ]}, 
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
