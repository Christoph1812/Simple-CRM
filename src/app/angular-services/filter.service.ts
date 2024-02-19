import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lead } from '../models/lead.class';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject = new BehaviorSubject<any[]>([]);
  private data: any[] = [];

  constructor() { }

  setFilter(filterFunction: (data: any) => boolean) {
    const filteredData = this.data.filter(filterFunction);
    this.filterSubject.next(filteredData);
  }

  getFilteredData() {
    return this.filterSubject.asObservable();
  }

  updateData(newData: any[]) {
    this.data = newData;
    this.filterSubject.next(newData);
  }
}




