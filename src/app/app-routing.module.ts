import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { NewBookComponent } from './components/new-book/new-book.component';
import { BookListComponent } from './components/book-list/book-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/books', pathMatch: 'full'},
  {path: 'books', component: BookListComponent},
  {path: 'book/:id', component: BookDetailComponent},
  {path: 'new', component: NewBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
