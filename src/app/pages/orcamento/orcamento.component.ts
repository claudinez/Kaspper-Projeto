import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent {
  clienteForm: FormGroup;
  projetoForm: FormGroup;
  clienteCadastrado = false;
  projetos: any[] = [];

  mensagem: string = '';
  mensagemTipo: string = '';

  constructor(private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      sobrenome: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(100)]],
      telefone: ['', [Validators.required]],
      cargo: ['', [Validators.maxLength(25)]],
    });

    this.projetoForm = this.fb.group({
      nomeProjeto: ['', Validators.required],
      categoria: [''],
      duracao: ['', [Validators.required]],
      status: ['aberto', [Validators.required]], // deleta fixo valor
    });
  }

  // Função para contar caracteres
  contarCaracteres(campo: string): void {
    const valorCampo = this.clienteForm.get(campo)?.value || '';  // Obtém o valor do campo
    console.log(`Contando caracteres do campo ${campo}: ${valorCampo.length} caracteres.`);
  }

  adicionarCliente() {
    if (this.clienteForm.valid) {
      this.mensagem = 'Cliente salvo com sucesso!';
      this.mensagemTipo = 'success';
      this.clienteCadastrado = true;

      // Desabilita o formulário de cliente
      this.clienteForm.disable();
    } else {
      this.mensagem = 'Por favor, preencha todos os campos obrigatórios.';
      this.mensagemTipo = 'error';
    }
  }

  adicionarProjeto() {
    if (this.projetoForm.valid) {
      this.projetos.push(this.projetoForm.value);
      this.mensagem = 'Projeto salvo com sucesso!';
      this.mensagemTipo = 'success';
      this.projetoForm.reset({ status: 'aberto' });
    } else {
      this.mensagem = 'Por favor, preencha todos os campos obrigatórios!';
      this.mensagemTipo = 'error';
    }
  }

  cancelarCadastro() {
    // Reseta o formulário de cliente e reabilita os campos
    this.clienteForm.reset();
    this.clienteForm.enable();
    this.clienteCadastrado = false;
    this.mensagem = '';
  }
}
