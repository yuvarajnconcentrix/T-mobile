import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  subscribtion: Subscription = new Subscription()

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    public matSnackBar: MatSnackBar
  ) {}
  

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.subscribtion.add(this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    }))
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book): void {
    this.store.dispatch(addToReadingList({ book }));
    this.showdialog(book);
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  showdialog(book: Book) {
    const matSnackBarRef = this.matSnackBar.open('Added', 'Undo', {
      duration: 3000
    });

    this.subscribtion.add(matSnackBarRef.onAction().subscribe(() => {
      const item: ReadingListItem = {
        bookId: book.id,
        ...book
      }
      this.store.dispatch(removeFromReadingList({ item }))
    }));
  }

  searchBooks(): void {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  trackByFn(book: Book){
    return book.id
  }
  
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe()
  }
}
