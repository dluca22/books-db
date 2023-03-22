import { Component, OnInit } from '@angular/core';
import { Book } from '../../../interfaces/Book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  bookList: Book[] = []

  ngOnInit(): void{
    // the return is an observable, not an array
    this.booksService.getBooksList().subscribe(books => this.bookList = books)
  }

  constructor(private booksService: BooksService){}
}
