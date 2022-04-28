import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { FormsModule } from '@angular/forms';
import { ProductosEmpresaComponent } from './components/productos-empresa/productos-empresa.component';
import { ChartsModule } from '@rinminase/ng-charts';
import { ProductosSucursalesComponent } from './components/productos-sucursales/productos-sucursales.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { UsuarioEditarComponent } from './components/usuario-editar/usuario-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    DashboardComponent,
    EmpresasComponent,
    ProductosEmpresaComponent,
    ProductosSucursalesComponent,
    NavbarComponent,
    GraficasComponent,
    DashboardAdminComponent,
    UsuarioEditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
