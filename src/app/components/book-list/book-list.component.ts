import { Component } from '@angular/core';
import { Book } from '../../../interfaces/Book';
import { BooksService } from 'src/app/services/books.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  bookList: Book[] = []

  ngOnInit(): void{
    // the return is an observable, not an array
    this.booksService.getBooksList().subscribe(books => this.bookList = books)
  }

  constructor(private booksService: BooksService){}
}
