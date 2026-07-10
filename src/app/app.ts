import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  sub$ = new BehaviorSubject<string>('Initial value')

  ngOnInit() {
    this.sub$.subscribe({
      next: (value) => {console.log('Subscriber 1: ', value)}
    })

    this.sub$.next('A')

    this.sub$.subscribe({
      next: (value) => {console.log('Subscriber 2: ', value)}
    })
  }

}
