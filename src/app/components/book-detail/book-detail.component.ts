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


    // switched back to the observable in the bookService (from http-branch)
    this.booksService.getBook(bookId).subscribe(book => this.book = book)
  }

  // ActivatedRoute allows use of route.snapshot.paramMap
  constructor(private booksService: BooksService,
    private route: ActivatedRoute){}
}
