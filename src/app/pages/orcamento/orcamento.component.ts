import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

// Valida o email no dominio
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
  palavrasFiltradas: string[] = [];
  mensagem: string = '';
  mensagemTipo: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
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
      descricao: ['', [Validators.required]],
      duracao: ['', [Validators.required]],
      status: ['aberto', [Validators.required]],
    });
  }

  // Método para contar os caracteres digitados no campo
  contarCaracteres(campo: string): void {
    const campoControl = this.clienteForm.get(campo);
    if (campoControl) {
      console.log(`${campo}: ${campoControl.value.length} caracteres`);
    }
  }

  // Método para dividir as palavras
  filtrarPalavras(): void {
    const descricao = this.projetoForm.get('descricao')?.value || '';
    const palavras: string[] = descricao.split(/[\s,]+/); // Divide a descrição em palavras
  
    // Lista de palavras específicas que você deseja filtrar
    const palavrasEspecificas = ['linguagem','angular', 'java', 'typescript','javascript','php','html', 'css','react','node.js','python',
                                 'postgres', 'oracle', 'mysql', 'web', 'desktop']; // Coloque todas as palavras em minúsculo
  
    // Filtra palavras que estejam na lista específica, ignorando maiúsculas/minúsculas
    this.palavrasFiltradas = palavras.filter((palavra: string) =>
      palavrasEspecificas.includes(palavra.toLowerCase()) // Converte a palavra para minúsculo
    );
  }
  
  // adiciona cliente
  adicionarCliente() {
    const emailControl = this.clienteForm.get('email');
    if (this.clienteForm.valid && emailControl?.valid) {
      this.mensagem = 'Cliente salvo com sucesso!';
      this.mensagemTipo = 'success';
      this.clienteCadastrado = true;
      this.clienteForm.disable();
    } else {
      this.mensagem = emailControl?.invalid
        ? 'Por favor, insira um e-mail válido.'
        : 'Por favor, preencha todos os campos obrigatórios.';
      this.mensagemTipo = 'error';
    }
  }

  //adiciona projeto
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

  //cancela cadastro
  cancelarCadastro() {
    this.clienteForm.reset();
    this.clienteForm.enable();
    this.clienteCadastrado = false;
    this.mensagem = '';
  }
}
