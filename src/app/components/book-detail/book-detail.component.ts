import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'src/interfaces/Book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  // book might be undefined if not found in database
  book?: Book;


  setUpdates(updates:any){
    this.book = {...updates, id:this.book!.id}
  }



  ngOnInit(){
    console.log("run")

    // get the routeParam and retrieve the 'id' from it
    const routeParam = this.route.snapshot.paramMap
    const bookId = Number(routeParam.get('id'))
    // switched back to the observable in the bookService (from http-branch)
    this.booksService.getBook(bookId).subscribe(book => this.book = book)


    // fix the observable of the route to force refresh of the component after route changed
    // this.route.params.subscribe((value) => console.log(value['id']))
    // this.route.params.subscribe((value) => this.booksService.getBook(bookId).subscribe(book => this.book = value))
  }

  // ActivatedRoute allows use of route.snapshot.paramMap
  constructor(private booksService: BooksService,
    private route: ActivatedRoute){}
}
