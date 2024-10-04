import { Injectable } from '@angular/core';
import { NotFoundError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  shows = [
    { id: 1, name: 'אמפי שוני', date: '21.9.2024' },
    { id: 2, name: 'מועדון הברבי', date: '23.9.2024' },
    { id: 2, name: 'מועדון הברבי', date: '23.9.2024' },
    { id: 2, name: 'מועדון הברבי', date: '23.9.2024' },
    { id: 2, name: 'מועדון הברבי', date: '23.9.2024' },
    { id: 2, name: 'מועדון הברבי', date: '23.9.2024' },
    { id: 3, name: 'הצוללת', date: '24.9.2024' }
  ];

  constructor() { }

  getAllShows() {
    return this.shows
  }

  getShow(id: number) {
    var filtered = this.shows.filter(it => it.id == id)

    if (filtered.length != 1) {
      throw NotFoundError
    }

    return filtered[0]
  }
}
