import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EmpresasComponent} from './components/empresas/empresas.component';
import { ProductosEmpresaComponent } from './components/productos-empresa/productos-empresa.component';
import{ GraficasComponent} from './components/graficas/graficas.component';
import { ProductosSucursalesComponent } from './components/productos-sucursales/productos-sucursales.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'inicio',  pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
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
