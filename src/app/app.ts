import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { RouterOutlet } from '@angular/router';
import { combineLatest, map, tap } from 'rxjs';

interface IProduct {
  id: number,
  title: string,
  description: string,
  category: string
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormField],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  private readonly http = inject(HttpClient);
  private readonly BASE_URL = 'https://dummyjson.com'

  _model = signal({ category: 'beauty' });
  form = form(this._model)

  category$ = toObservable(this._model).pipe(map(v => v.category))
  products$ = this.http.get<{ products: IProduct[] }>(`${this.BASE_URL}/products`).pipe(map(v => v.products))

  ngOnInit() {

    combineLatest({
      category: this.category$,
      products: this.products$
    }).pipe(
      map(({category, products}) => {
        return products.filter((product) => product.category === category)
      })
    ).subscribe(products => {
      console.log(products);
    });

  }
}
