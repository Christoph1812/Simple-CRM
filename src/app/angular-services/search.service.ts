import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  search(items: any[], searchTerm: string, keys: string[]): any[] {
    console.log('start search')
    if (!searchTerm.trim()) {
      return items; // Wenn kein Suchbegriff vorhanden, gib alle Daten zurück
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item =>
      keys.some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm);
        } else {
          return false; // Wenn der Wert kein String ist, wird er nicht durchsucht
        }
      })
    );
  }
}

