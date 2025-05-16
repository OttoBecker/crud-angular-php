import { Routes } from '@angular/router';
import { ListagemProdutoComponent } from './components/listagem-produto/listagem-produto.component';
import { ConfiguracaoProdutoComponent } from './components/configuracao-produto/configuracao-produto.component';

export const routes: Routes = [
    { path: '', redirectTo: '/listagem-produtos', pathMatch: 'full' },
    { path: 'listagem-produtos', component: ListagemProdutoComponent },
    { path: 'configuracao-produto', component: ConfiguracaoProdutoComponent },
    { path: 'configuracao-produto/:id', component: ConfiguracaoProdutoComponent },
    { path: '**', redirectTo: '/listagem-produtos', pathMatch: 'full' }
];
