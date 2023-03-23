import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'src/interfaces/Book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent {

  // book might be undefined if not found in database
  book?: Book;

  ngOnInit(){
    // get the routeParam and retrieve the 'id' from it
    const routeParam = this.route.snapshot.paramMap
    const bookId = Number(routeParam.get('id'))

    // gets the book from the bookService by id:number
    // does not work for refreshing the page, must switch back to the observable and subscription from http-branch
    this.book = this.booksService.getBook(bookId)
  }

  // ActivatedRoute allows use of route.snapsoht.paramMap
  constructor(private booksService: BooksService,
    private route: ActivatedRoute){}
}
