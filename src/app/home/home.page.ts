import { Component, OnInit } from '@angular/core';
import { OrcamentoService, Orcamento } from '../services/orcamento';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  // Variável para controlar qual tela exibir (1, 2, 3 ou 4)
  telaAtual: number = 1;

  // Dados do formulário atual
  valorDiaria: number = 0;
  quantidadeDias: number = 1; // Padrão inicial do ion-range
  valorTotal: number = 0;

  // Lista para armazenar o histórico buscado do Storage
  orcamentos: Orcamento[] = [];

  constructor(private orcamentoService: OrcamentoService) {}

  async ngOnInit() {
    await this.carregarOrcamentos();
  }

  async carregarOrcamentos() {
    this.orcamentos = await this.orcamentoService.obterOrcamentos();
  }

  // Avança para a Tela 2 e calcula o valor final
  continuarOrcamento() {
    this.valorTotal = this.valorDiaria * this.quantidadeDias;
    this.telaAtual = 2;
  }

  // Confirma a reserva e persiste no Storage (Avança para a Tela 3)
  async confirmarReserva() {
    const novoOrcamento: Orcamento = {
      valorDiaria: this.valorDiaria,
      quantidadeDias: this.quantidadeDias,
      valorTotal: this.valorTotal
    };

    await this.orcamentoService.adicionarOrcamento(novoOrcamento);
    await this.carregarOrcamentos(); // Atualiza a lista local
    this.telaAtual = 3;
  }

  // Remove o orçamento do Storage na Tela 4
  async excluirOrcamento(indice: number) {
    await this.orcamentoService.excluirOrcamento(indice);
    await this.carregarOrcamentos();
  }

  // Volta para a Tela 1 limpando as informações passadas
  novaReserva() {
    this.valorDiaria = 0;
    this.quantidadeDias = 1;
    this.valorTotal = 0;
    this.telaAtual = 1;
  }

  // Navegação direta entre telas
  mudarTela(numeroTela: number) {
    this.telaAtual = numeroTela;
  }
}
