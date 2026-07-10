import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { from, interval, map, take } from 'rxjs';

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
      map((fruit) => fruit.toUpperCase())
    ).subscribe({
      next: (v) => {console.log(v)}
    })

    // interval(1000).pipe(
    //   take(this.fruits.length),
    //   map(i => this.fruits[i].toUpperCase())
    // ).subscribe({
    //   next: v => console.log(v)
    // })
  }
}
