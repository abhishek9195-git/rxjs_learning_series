import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { interval, Observable, of, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  subscription!: Subscription
  counter$ = signal(0)

  obs$ = new Observable<number>((observer) => {
    let counter = 1;
    const interval = setInterval(() => {
      observer.next(counter++)
    }, 1000);

    return {
      unsubscribe: () => {
        console.log('==> clear interval', interval)
        clearInterval(interval)
      }
    }
  })

  startTimer() {
    this.subscription = this.obs$.subscribe((value) => {
      this.counter$.set(value)
    })
  }

  stopTimer() {
    this.subscription?.unsubscribe()
  }
}
