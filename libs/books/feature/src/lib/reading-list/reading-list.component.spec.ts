import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createReadingListItem, SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let snackbar: MatSnackBar;
  let snackBarConfig: MatSnackBarConfig;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule, MatSnackBarModule],
      providers: [ { provide: MatSnackBar, useClass: MatSnackBarStub}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    snackbar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should showdialog(book) be known as function', () => {
    expect(typeof spyOn(component, 'showdialog')).toEqual('function');
  });

  it('should open snackbar when calling showdialog', () => {
    snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.duration = parseInt('3000', 0);
    const showdialogSPY = spyOn(component, 'showdialog').and.callThrough();
    spyOn(snackbar, 'open').and.callThrough();;
    const item = createReadingListItem('A');
    component.showdialog(item);
    expect(showdialogSPY).toHaveBeenCalledWith(item);
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