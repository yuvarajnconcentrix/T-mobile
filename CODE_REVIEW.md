#Code Review Fixes

## Code smells and Improvements


1.we could use the suitable naming convention. For example, instead of using 'b' we use book.- Fixed in 'book-search.component.html',

2.use void type function doesn't  return anything usage of void if we  button click call function its does't return any value. - fixed 'book-search.component.ts'

3.If any observable is subscribed then it should be unsubscribed when the component destroy. to prevent these memory leaks. - fixed in book-search.component.ts

4.Using trackBy will result in Angular tracking which items have been added or removed according to the unique identifier and creating or destroying only the things that changed. It is okay to use trackBy in every ngFor if that is what you decide to do. It just isn't necessary and the performance gains will likely be negligible in small collections. - fixed in  book-search.component.html

5.we want use proper data type declartion.

6.we need to maintain proper test coverage in every component.

## Manual Accessibility issues ##

1.The <imag> tag should have the alternative text(alt), it helps screen readers to read the information fixed

2.Add the role="button" to the button element help older user agents that support WAI_ARIA but not HTML5.

3.Add the role="presentation" its hiding a decorative image; it is equivalent to giving the image null alt tex

## Ligouthouse issues

1.The aria-label attribute provides the text label for an object, such as a button. When a screen reader encounters the object. fixed


