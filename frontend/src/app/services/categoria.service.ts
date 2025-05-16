import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlApi: string = 'http://localhost:8000/web/v1/categorias';

  constructor(
    private httpClient: HttpClient
  ) { }

  public obterCategorias() {
    const retorno = this.httpClient.get<Categoria[]>(this.urlApi);
    return retorno;
  }

}
