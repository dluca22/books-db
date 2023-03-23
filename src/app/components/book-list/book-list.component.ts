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

  // does not want to accept other types if not any (string | number | undefined not working)
  query:any;

  setQuery(value:string):void{
    this.query=value;
  }
  clearQuery(){
    this.query= ''
  }

  ngOnInit(): void{
    this.booksService.getBooksList().subscribe(books => this.bookList = books)
  }

  constructor(private booksService: BooksService){}
}
