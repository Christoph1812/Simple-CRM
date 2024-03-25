import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  /**
  * Filters the given items based on the provided filter option.
  * @param items The array of items to be filtered.
  * @param filterOption The filter option to be applied.
  * @returns The filtered array of items.
  */
  filterData(items: any[], filterOption: string): any[] {
    if (filterOption === 'noFilter') {
      return items;
    } else if (filterOption === 'priority') {
      return this.sortByPriority(items, 'priority');
    } else {
      return this.sortByInitialLetter(items, filterOption);
    }
  }


  /**
   * Sorts the items based on priority.
   * @param items The array of items to be sorted.
   * @param key The key to access the priority property.
   * @returns The sorted array of items.
   */
  private sortByPriority(items: any[], key: string): any[] {
    return items.sort((a, b) => {
      const priorityOrder: { [key: string]: number } = { 'high': 3, 'medium': 2, 'low': 1 };
      const priorityA = priorityOrder[a[key].toLowerCase()];
      const priorityB = priorityOrder[b[key].toLowerCase()];
      return priorityB - priorityA;
    });
  }


  /**
     * Sorts the items based on the initial letter of a specified property.
     * @param items The array of items to be sorted.
     * @param key The key to access the property for sorting.
     * @returns The sorted array of items.
     */
  private sortByInitialLetter(items: any[], key: string): any[] {
    return items.sort((a, b) => {
      const initialA = (a[key] as string).charAt(0).toUpperCase();
      const initialB = (b[key] as string).charAt(0).toUpperCase();
      return initialA.localeCompare(initialB);
    });
  }
}


