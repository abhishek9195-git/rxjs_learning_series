import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EMPTY, iif, interval, map, mergeMap, of, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  stream = new Subject<string>()
  fruits = ['Apple', 'Banana', 'Orange', 'Guava', 'Grapes']

  ngOnInit() {

    this.stream.subscribe({next: (v) => console.log(v)})

    interval(1000).pipe(
      mergeMap((i) => iif(
        () => i < this.fruits.length, 
        of(this.fruits[i]).pipe(tap(fruit => this.stream.next(fruit))), 
        EMPTY)
      )
    ).subscribe()

  }
}
