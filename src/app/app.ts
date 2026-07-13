import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

    private readonly http = inject(HttpClient);
    private readonly BASE_URL = 'https://dummyjson.com'
    
    category = signal('beauty');
    category$ = toObservable(this.category);
    products$ = this.http.get(`${this.BASE_URL}/products/category/${this.category()}`)

    ngOnInit() {

        combineLatest({
            category: this.category$,
            products: this.products$
        })
        .subscribe({
            next: (response) => {
                console.log(response)
            } 
        })
    }



}