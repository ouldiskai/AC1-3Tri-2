import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Orcamento {
  valorDiaria: number;
  quantidadeDias: number;
  valorTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  private storageInicializado = false;

  constructor(private storage: Storage) {
    this.inicializarStorage();
  }

  private async inicializarStorage() {
    await this.storage.create();
    this.storageInicializado = true;
  }

  async obterOrcamentos(): Promise<Orcamento[]> {
    if (!this.storageInicializado) await this.inicializarStorage();
    return (await this.storage.get('orcamentos')) || [];
  }

  async adicionarOrcamento(orcamento: Orcamento): Promise<void> {
    const orcamentos = await this.obterOrcamentos();
    orcamentos.push(orcamento);
    await this.storage.set('orcamentos', orcamentos);
  }

  async excluirOrcamento(indice: number): Promise<void> {
    const orcamentos = await this.obterOrcamentos();
    orcamentos.splice(indice, 1);
    await this.storage.set('orcamentos', orcamentos);
  }
}
