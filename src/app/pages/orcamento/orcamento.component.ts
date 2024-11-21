import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Adicione isso
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailValido(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(control.value) ? null : { emailInvalido: true };
  };
}

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

  mensagem: string = ''; // Texto da mensagem
  mensagemTipo: 'success' | 'error' = 'success'; // Tipo da mensagem (sucesso ou erro)

  exibirMensagem(tipo: 'success' | 'error', texto: string): void {
    this.mensagemTipo = tipo; // Define o tipo (ex.: success ou error)
    this.mensagem = texto; // Define o texto da mensagem
    setTimeout(() => {
      this.mensagem = ''; // Remove a mensagem após 3 segundos
    }, 3000);
  }

  constructor(private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      sobrenome: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, emailValido()]],
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
    const emailControl = this.clienteForm.get('email');

    if (this.clienteForm.valid && emailControl?.valid) {
      this.mensagem = 'Cliente salvo com sucesso!';
      this.mensagemTipo = 'success';
      this.clienteCadastrado = true;

      // Desabilita o formulário de cliente
      this.clienteForm.disable();
    } else {
      if (emailControl?.invalid) {
        this.mensagem = 'Por favor, insira um e-mail válido.';
      } else {
        this.mensagem = 'Por favor, preencha todos os campos obrigatórios.';
      }
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
