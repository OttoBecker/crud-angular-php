import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';
import { FormularioProduto } from '../../models/produto';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-configuracao-produto',
  imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './configuracao-produto.component.html',
  styleUrl: './configuracao-produto.component.scss',
  providers: [ProdutoService, CategoriaService]
})
export class ConfiguracaoProdutoComponent implements OnInit {

  public id?: number | null = null;
  public formulario!: FormGroup;
  public categorias: Categoria[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.maxLength(200)]],
      quantidade: [1, [Validators.required, Validators.min(0)]],
      categoriaId: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.obterCategorias();
    this.activatedRoute.paramMap.subscribe(params => {
      const id: string | null = params.get('id');

      if (id) {
        this.id = +id;
        this.produtoService.obterProduto(this.id).subscribe((ret: FormularioProduto) => {
          this.formulario.patchValue(ret);
        });
      }
    });
  }

  public cadastrarOuAtualizar() {
    if (this.id === null) {
      this.cadastrar();
    } else {
      this.atualizar();
    }
  }

  public cadastrar() {
    const formulario: FormularioProduto = this.formulario.getRawValue();

    this.produtoService.cadastrarProduto(formulario).subscribe((ret: FormularioProduto) => {
      this.matSnackBar.open('Cadastrado com sucesso!', 'Fechar', { duration: 3000, panelClass: ['snackbar-success'] });
      this.router.navigate(['/configuracao-produto', ret.id]);
    }, error => {
      this.matSnackBar.open('Erro ao cadastrar produto!', 'Fechar', { duration: 3000, panelClass: ['snackbar-error'] });
    })
  }

  public atualizar() {
    const formulario: FormularioProduto = this.formulario.getRawValue();

    this.produtoService.atualizarProduto(formulario).subscribe(() => {
      this.matSnackBar.open('Atualizado com sucesso!', 'Fechar', { duration: 3000, panelClass: ['snackbar-success'] });
    }, error => {
      this.matSnackBar.open('Erro ao atualizar produto!', 'Fechar', { duration: 3000, panelClass: ['snackbar-error'] });
    })
  }

  public excluir() {
    const formulario: FormularioProduto = this.formulario.getRawValue();

    this.produtoService.excluirProduto(formulario.id).subscribe(() => {
      this.matSnackBar.open('Excluído com sucesso!', 'Fechar', { duration: 3000, panelClass: ['snackbar-success'] });
      this.router.navigate(['/configuracao-produto']);
    }, error => {
      this.matSnackBar.open('Erro ao excluir produto!', 'Fechar', { duration: 3000, panelClass: ['snackbar-error'] });
    })
  }

  public obterCategorias() {
    this.categoriaService.obterCategorias().subscribe((ret: Categoria[]) => {
      this.categorias = ret;
    })
  }

  public novoCadastro() {
    this.router.navigate(['/configuracao-produto']);
  }

  public voltar() {
    this.router.navigate(['/listagem-produtos']);
  }
}
