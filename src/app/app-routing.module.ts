import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OrcamentoComponent } from './pages/orcamento/orcamento.component';
import { ConsultaOrcamentoComponent } from './pages/consulta-orcamento/consulta-orcamento.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Página principal
  { path: 'home', component: HomeComponent }, //Página principal
  { path: 'orcamento', component: OrcamentoComponent }, // Página de orçamento
  { path: 'consulta-orcamento', component: ConsultaOrcamentoComponent }, //consulta orcamento
  { path: '**', redirectTo: '' }, // Redirecionamento padrão para home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
