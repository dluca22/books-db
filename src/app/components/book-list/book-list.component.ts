import { Component } from '@angular/core';
import { Book } from '../../../interfaces/Book';
import { BooksService } from 'src/app/services/books.service';



@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  // holds the bookList received from the BookService
  bookList: Book[] = []
  // add a variable to enable switching between list and grid style view
  viewStyle: "list" | "grid" = "grid"

  // does not want to accept other types if not any (string | number | undefined not working)
  // 2-way binding value for search input, is used in filter: pipe from "Ng2SearchPipeModule"
  query:any;

  // custom function assigned to the 3 buttons that set the query automatically switch between categories
  setQuery(value:string):void{
    this.query=value;
  }
  // clears the query on the "X" button
  clearQuery(){
    this.query= ''
  }

  setViewStyle(preference: "list" | "grid"){
    this.viewStyle = preference;
  }


    // button on each book component to delete from this component's view + call delete book on the BookService list
  deleteBook(id:number){
    this.bookList = this.bookList.filter(book => book.id !== id)
    this.booksService.deleteBook(id)
  }

  // onInit calls for the bookList from BookService
  // it either returns a new list from the .json, or if already has loaded it and updated it will return its local private copy
  ngOnInit(): void{
    this.booksService.getBooksList().subscribe(books => this.bookList = books)
  }

  constructor(private booksService: BooksService){}
}
