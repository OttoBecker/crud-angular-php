import { Injectable } from '@angular/core';
import { FiltroProduto, FormularioProduto, ListaProduto } from '../models/produto';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProdutoService {

    private urlApi: string = 'http://localhost:8000/web/v1/produtos';

    constructor(
        private httpClient: HttpClient
    ) { }

    public obterProduto(id: number) {
        return this.httpClient.get<FormularioProduto>(`${this.urlApi}/${id}`);
    }

    public cadastrarProduto(formulario: FormularioProduto) {
        return this.httpClient.post<FormularioProduto>(`${this.urlApi}`, formulario);
    }

    public atualizarProduto(formulario: FormularioProduto) {
        return this.httpClient.put(`${this.urlApi}/${formulario.id}`, formulario);
    }

    public excluirProduto(id: number) {
        return this.httpClient.delete(`${this.urlApi}/${id}`);
    }

    public obterListaProdutos(filtro: FiltroProduto) {
        return this.httpClient.post<ListaProduto[]>(`${this.urlApi}/filtrar`, filtro);
    }
}
