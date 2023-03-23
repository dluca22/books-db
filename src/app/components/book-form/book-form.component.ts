import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/interfaces/Book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  // this form might also be used in book/:id and be passed a book object
  @Input() book?: Book
  @Input() editMode?: boolean
  @Output() sendUpdate = new EventEmitter();


  // instance of reactive FormGroup
  bookForm!: FormGroup;
  errorMessage: boolean = false;
  submitted: boolean = false;

  // onInit sets the validation for this form (kinda like in django's modelForm??)
  // all fields required and pages have range 0-1500

  // ATTENZIONE - WEAK !! dom manipulation will allow disabled button to be re-enabled
  //
  ngOnInit(): void {

    // on init sets the validator constraint to be all required and pages 0-1500
    this.bookForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
      category: new FormControl('fantasy', Validators.required),
      pages: new FormControl(null, [Validators.required, Validators.max(1500), Validators.min(0)])
    })

    // but if an instance of book gets passed we can pre-fill/patch the values with data from the book object
    if (this.book) {
      this.bookForm.patchValue({
        title: this.book.title,
        author: this.book.author,
        category: this.book.category,
        pages: this.book.pages,
      })
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      // if we're in edit mode, call editBook() + update parent's value
      if (this.editMode) {
        this.bookService.editBook(this.book!.id, this.bookForm.value)
        // after submitting the updates, send to parent (book-detail-component) the updated value to display in the view  (kinda like optimistic-UI updates in react router)
        this.sendUpdate.emit(this.bookForm.value)
      }
      // else normal/submit mode, sends data to addBook and reset form waiting for new insertion
      else {
        // resets the form and makes the "back" button appear
        this.bookService.addBook(this.bookForm.value);
        this.bookForm.reset()
        // used to display "indietro" button
        this.submitted = true
      }
      this.errorMessage = false
    } else {
      //if this bookForm is not valid (tampered HTML in devtools) sends error message and avoid any updates
      this.errorMessage = true
    }

  }
  constructor(private bookService: BooksService) { }
}
