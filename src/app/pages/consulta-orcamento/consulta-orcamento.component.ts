import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importando Router

@Component({
  selector: 'app-consulta-orcamento',
  templateUrl: '../consulta-orcamento/consulta-orcamento.component.html',
  styleUrls: ['../consulta-orcamento/consulta-orcamento.component.css']
})
export class ConsultaOrcamentoComponent implements OnInit {
  numeroOrcamento: string = ''; // Armazena o número do orçamento
  nomeCliente: string = ''; // Armazena o nome do cliente
  telefone: string = ''; // Armazena o telefone
  orcamentoEncontrado: any = null; // Objeto para armazenar o orçamento encontrado
  
  constructor(private router: Router) { } // Injetando o serviço Router

  ngOnInit(): void {
    // Qualquer lógica de inicialização que você precise
  }

  buscarOrcamento() {
    // Simulação de busca do orçamento
    this.orcamentoEncontrado = {
      clienteNome: this.nomeCliente,
      numero: this.numeroOrcamento,
      status: 'Aberto',
      valor: 1000,
      descricao: 'Projeto de desenvolvimento web'
    };
      
  }
     // Método voltar corretamente implementado
  Voltar(): void {
    this.router.navigate(['../home']); // Navega para a página home
  }
}