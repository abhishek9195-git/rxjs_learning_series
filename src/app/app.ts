import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { filter, from } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  fruits = ['Apple', 'Banana', 'Orange', 'Guava', 'Grapes']
  ngOnInit() {
    from(this.fruits).pipe(
      filter((fruit: string) => fruit.length > 5)
    ).subscribe({
      next: (v) => console.log(v)
    })
  }
}
