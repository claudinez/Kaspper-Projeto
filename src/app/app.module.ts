import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { OrcamentoComponent } from './pages/orcamento/orcamento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaOrcamentoComponent } from './pages/consulta-orcamento/consulta-orcamento.component';  // Verifique o caminho correto

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrcamentoComponent,
    ConsultaOrcamentoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
