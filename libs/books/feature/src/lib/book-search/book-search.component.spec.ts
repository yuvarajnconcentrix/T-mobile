import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createBook, SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let snackbar: MatSnackBar;
  let snackBarConfig: MatSnackBarConfig;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule, MatSnackBarModule],
      providers: [ { provide: MatSnackBar, useClass: MatSnackBarStub}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    snackbar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should showdialog(book) be known as function', () => {
    expect(typeof spyOn(component, 'showdialog')).toEqual('function');
  });

  it('should open snackbar when calling showdialog', () => {
    snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.duration = parseInt('3000', 0);
    const showdialogSPY = spyOn(component, 'showdialog').and.callThrough();
    spyOn(snackbar, 'open').and.callThrough();;
    const book = createBook('A');
    component.showdialog(book);
    expect(showdialogSPY).toHaveBeenCalledWith(book);
    expect(snackbar.open).toHaveBeenCalled();
  })
  
});

class MatSnackBarStub{
  open(title, action){
    return {
      onAction: () => of({})
    }
  }

}