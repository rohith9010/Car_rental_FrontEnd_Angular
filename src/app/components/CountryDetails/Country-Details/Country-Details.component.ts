import { Component, OnInit } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../../../../Services/CountriesService/Country.service';
import { ICountries } from '../../../../Interfaces/ICountries';

@Component({
  selector: 'app-Country-Details',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './Country-Details.component.html',
  styleUrls: ['./Country-Details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  constructor(private countryservice:CountryService) { }

  filteredList!: ICountries[];
  searchQuery!: string ;
  countriesList!:ICountries[];
  ngOnInit() {
    

    this.countryservice.getCountries().subscribe(res=> {
      this.countriesList=res;
      console.log(res);
      });
      
  }
  
  delete(id:number):void {
        if (confirm('Are you sure you want to delete this item?')){
          this.countryservice.deleteCountry(id).subscribe(()=>{
              console.log('Item deleted successfully');
              this.ngOnInit();
            },
          );
        }
    }
    search(): void {
      if (this.searchQuery.trim() ==='') {
        this.filteredList = [...this.countriesList];
      } else 
      {
        this.filteredList = this.countriesList.filter(country =>
          country.Country.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
        );
      }
    }

}