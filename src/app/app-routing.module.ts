import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditVendedorComponent } from './components/add-edit-vendedor/add-edit-vendedor.component';
import { ListVendedorComponent } from './components/list-vendedor/list-vendedor.component';

const routes: Routes = [
  { path: 'add', component: AddEditVendedorComponent },
  { path: '', component: ListVendedorComponent },
  { path: 'edit/:id', component: AddEditVendedorComponent },
  { path: '**', component: ListVendedorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
