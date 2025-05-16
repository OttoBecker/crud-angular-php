import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FiltroProduto, ListaProduto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria';
import { RouterModule } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listagem-produto',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, MatSnackBarModule],
  templateUrl: './listagem-produto.component.html',
  styleUrl: './listagem-produto.component.scss',
  providers: [ProdutoService, CategoriaService]
})
export class ListagemProdutoComponent implements OnInit {

  public filtro!: FormGroup;
  public produtos: ListaProduto[] = [];
  public categorias: Categoria[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private matSnackBar: MatSnackBar
  ) {
    this.filtro = this.formBuilder.group({
      nome: [null],
      quantidadeInicial: [null, Validators.min(0)],
      quantidadeFinal: [null, Validators.min(0)],
      categoriaId: [null]
    });


  }

  ngOnInit() {
    this.obterCategorias();
    this.filtrar();
  }

  public filtrar() {
    const filtro: FiltroProduto = this.filtro.getRawValue();

    this.produtoService.obterListaProdutos(filtro).subscribe((ret: ListaProduto[]) => {
      this.produtos = ret;
    })
  }

  public obterCategorias() {
    this.categoriaService.obterCategorias().subscribe((ret: Categoria[]) => {
      this.categorias = ret;
    })
  }

  public excluir(id: number) {
    this.produtoService.excluirProduto(id).subscribe((ret) => {
      this.filtrar();
      this.matSnackBar.open('Excluído com sucesso!', 'Fechar', { duration: 3000, panelClass: ['snackbar-success'] });
    }, error => {
      this.matSnackBar.open('Erro ao excluir produto!', 'Fechar', { duration: 3000, panelClass: ['snackbar-error'] });
    });
  }

}
