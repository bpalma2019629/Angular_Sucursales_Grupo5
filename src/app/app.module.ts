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

import { ProductosSucursalesComponent } from './components/productos-sucursales/productos-sucursales.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    DashboardComponent,
    EmpresasComponent,
    ProductosEmpresaComponent,
    ProductosSucursalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
