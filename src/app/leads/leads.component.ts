import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogAddLeadComponent } from './dialog-add-lead/dialog-add-lead.component';
import { Lead } from '../models/lead.class';
import { FilterService } from '../angular-services/filter.service';
import { MatTableDataSource } from '@angular/material/table';
import { firebaseData } from '../firebase-services/firebaseData.service';
import { SearchService } from '../angular-services/search.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  displayedColumns: string[] = ['company', 'location', 'priority']; //  columes to be displayed in the table
  filterOption: string = 'noFilter'; // currently selected filter option
  searchTerm: string = ''; // search term entered by user
  dataSource: MatTableDataSource<Lead> = new MatTableDataSource<Lead>(); // data source for the table
  originalData: Lead[] = []; // Store original data

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private filterService: FilterService,
    private searchService: SearchService,
    private firebaseData: firebaseData
  ) { }

  /**
 * Initializes the component.
 * Retrieves lead data and applies the filter or search.
 */
  ngOnInit() {
    this.firebaseData.getLeadsObservable().subscribe((leads: Lead[]) => {
      this.originalData = leads; // Initialize original data
      this.dataSource.data = leads;
      this.filterOrSearch();
    });
  }

  /**
   * Applies the current filter to the leads and updates the data source.
   */
  filterOrSearch() {
    let filteredData = this.originalData;

    if (this.searchTerm.trim() !== '') {
      filteredData = this.searchService.search(filteredData, this.searchTerm, ['companyName', 'location', 'priority']);
    }

    if (this.filterOption !== 'noFilter') {
      filteredData = this.filterService.filterData(filteredData, this.filterOption);
    }

    this.dataSource.data = filteredData;
  }


  /**
   * Handles the change of filter value.
   * Updates the filter value and applies the filter again.
   * @param filterOption The new filter value.
   */
  getFilterValue(filterOption: string) {
    this.filterOption = filterOption;
    this.filterOrSearch();
  }


  /**
    * Navigates to the details of a lead.
    * @param customerId The ID of the lead whose details are to be shown.
    */
  navigateToLeadsDetails(customerId: string) {
    this.router.navigate(['/lead', customerId]);
  }


  /**
   * Opens a dialog for adding a new lead.
   */
  openDialog() {
    this.dialog.open(DialogAddLeadComponent);
  }

}



