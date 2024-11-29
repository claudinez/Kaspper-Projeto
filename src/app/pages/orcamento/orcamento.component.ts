import { Component,  AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

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


export class OrcamentoComponent  implements AfterViewInit{
  @ViewChild('nomeInput') nomeInput: ElementRef | undefined;
  clienteForm: FormGroup;
  projetoForm: FormGroup;
  clienteCadastrado = false;
  projetos: any[] = [];
  palavrasFiltradas: string[] = [];
  mensagem: string = '';
  mensagemTipo: 'success' | 'error' = 'success';
  private readonly apiUrl = 'https://graph.facebook.com/v16.0/SEU_NUMERO_DE_TELEFONE/messages';
  private readonly token = 'SEU_TOKEN_DE_AUTENTICACAO';
isFormDisabled: any;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private http: HttpClient 

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
      linguagens: [[]], // Campo de linguagens como uma lista
      bancosDeDados: [[]], // Bancos de dados selecionados
      descricao: ['', []],
      duracao: ['', [Validators.required]],
      status: ['aberto', [Validators.required]],
    });
  }

  // Implementação do método ngAfterViewInit
  ngAfterViewInit(): void {
  if (this.nomeInput) {
    this.nomeInput.nativeElement.focus();
  }
}

   // Envia msg quando for urgente para whatsapp
   enviarMensagemWhatsApp() {
    // Captura o nome do cliente do formulário
    const nomeCliente = this.clienteForm.get('nome')?.value;
  
    // Personaliza a mensagem com o nome do cliente
    const mensagem = encodeURIComponent(
      `Olá Sr.(a) ${nomeCliente}, uma nova proposta foi marcada como urgente. Por favor, verifique imediatamente!`
    );
  
    const numeroWhatsApp = "5519991796458"; // Substitua pelo número do destinatário
  
    // Abre o WhatsApp com a mensagem personalizada
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
    
    // Tenta abrir o link
    const newWindow = window.open(url, "_blank");
  
    // Verifica se o pop-up foi bloqueado
    if (!newWindow) {
      alert("Pop-up bloqueado! Por favor, habilite pop-ups para este site.");
    }
  }

  // Check box para selecionar a linguagem requerida
  onCheckboxChange(event: any) {
    const linguagens = this.projetoForm.get('linguagens')?.value || [];
  
    if (event.target.checked) {
      linguagens.push(event.target.value);
    } else {
      const index = linguagens.indexOf(event.target.value);
      if (index > -1) {
        linguagens.splice(index, 1);
      }
    }
  
    this.projetoForm.get('linguagens')?.setValue(linguagens);
  }

  linguagensDisponiveis: string[] = ['PHP', 'CSS', 'HTML', 'Java', 'Angular', 'GO', 'React', 'typescript','Node.js',
                                     'Python', 'C#'];
  
  // Check box para selecionar a Banco de Dados 
  onBancoCheckboxChange(event: any) {const bancosDeDados = this.projetoForm.get('bancosDeDados')?.value || [];
    if (event.target.checked) {bancosDeDados.push(event.target.value);
      } else {const index = bancosDeDados.indexOf(event.target.value);
        if (index > -1) {bancosDeDados.splice(index, 1);
          }
        }
        this.projetoForm.get('bancosDeDados')?.setValue(bancosDeDados);
      }

  bancosDisponiveis: string[] = ['Oracle', 'SQLServer', 'PostgreSQL', 'MariaDB', 'DB2', 'MongoDB', 
                                 'Cassandra', 'SQLite'];

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
    const palavrasEspecificas = ['javascript', 'cobol','postgres', 'delphi', 'firebird', 'firebase', 'desktop','nosql','access']; // Coloque todas as palavras em minúsculo
  
    // Filtra palavras que estejam na lista específica, ignorando maiúsculas/minúsculas
    this.palavrasFiltradas = palavras.filter((palavra: string) =>
      palavrasEspecificas.includes(palavra.toLowerCase()) // Converte a palavra para minúsculo
    );
  }

  // 

  onDuracaoChange() {
    const duracao = this.projetoForm.get('duracao')?.value;
    if (duracao === 'urgente') {
      this.enviarMensagemWhatsApp();
    }
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

    // Adiciona projeto
    adicionarProjeto() {
      if (this.projetoForm.valid) {
        const projeto = this.projetoForm.value;
    
        // Adiciona o projeto à lista (simulando o salvamento no banco de dados)
        this.projetos.push(projeto);
        this.mensagem = 'Projeto salvo com sucesso!';
        this.mensagemTipo = 'success';
    
        // Reseta o formulário, preservando valores dos checkboxes
        this.projetoForm.reset({
          status: 'aberto',
          duracao: '',
          linguagens: [],
          bancosDeDados: [],
        });
    
        // Desabilita o formulário inteiro
        this.projetoForm.disable();
      } else {
        this.mensagem = 'Por favor, preencha todos os campos obrigatórios!';
        this.mensagemTipo = 'error';
      }
    }
     
  // Função para cancelar o cadastro do cliente
  cancelarCadastro() {
  this.clienteForm.reset();
  this.clienteForm.enable();
  this.clienteCadastrado = false;
  this.mensagem = '';
  }
}