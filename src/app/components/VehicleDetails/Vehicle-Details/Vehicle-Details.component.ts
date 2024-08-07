import { Component, OnInit } from '@angular/core';
import {MatIconModule } from '@angular/material/icon';
import {RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IVehicleModel } from '../../../../Interfaces/IVehicleModel';
import { IVehicleTypes } from '../../../../Interfaces/IVehicleTypes';
import { IVehicleFuel } from '../../../../Interfaces/IVehicleFuel';
import { IVehicleCapacity } from '../../../../Interfaces/IVehicleCapacity';
import { IState } from '../../../../Interfaces/IState';
import { VehicleModelServiceService } from '../../../../Services/VehicleModelservice/vehicle-model-service.service';
import { VehicleTypeService } from '../../../../Services/VehicleTypeService/VehicleType.service';
import { StateserviceService } from '../../../../Services/StateService/stateservice.service';
import { VehicleFuelService } from '../../../../Services/VehicleFuelService/VehicleFuel.service';
import { VehicleCapacityService } from '../../../../Services/VehicleCapacityService/VehicleCapacity.service';
import { IVehicles } from '../../../../Interfaces/IVehicles';
import { VehiclesService } from '../../../../Services/VehiclesService/Vehicles.service';
@Component({
  selector: 'app-Vehicle-Details',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,RouterLinkActive, MatIconModule,FormsModule,ReactiveFormsModule],
  templateUrl: './Vehicle-Details.component.html',
  styleUrls: ['./Vehicle-Details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  filteredVehiclesList:IVehicles[]=[];
  filteredModelList: IVehicleModel[]=[];
  searchQuery!: string;
  vehicleTypeList:IVehicleTypes[]=[];
  vehicleFuelList:IVehicleFuel[]=[];
  vehicleCapacityList:IVehicleCapacity[]=[];
  stateList:IState[]=[];
  vehiclesList!:IVehicles[];

  currentPage: number = 1;
  itemsPerPage: number = 8;
  showClearIcon: boolean = false;


  constructor(
    private modelservice : VehicleModelServiceService,
    private vehicleTypeservice : VehicleTypeService,
    private stateservice : StateserviceService,
    private vehiclefuelservice : VehicleFuelService,
    private vehiclecapacityservice : VehicleCapacityService,
    private vehiclesservice : VehiclesService) { }

  ngOnInit() {
    this.loadVehicles();
    this.loadVehicleTypes();
    this.loadVehicleFuel();
    this.loadVehicleCapacity();
    this.loadStates();
    this.loadModels();
  }

    loadVehicles():void {

      this.vehiclesservice.GetVehicles().subscribe(res=> {
        this.vehiclesList=res;
        console.log(res);
        this.filteredVehiclesList = [...this.vehiclesList];
        this.search();
      });
    }

    delete(id:number):void {
      if (confirm('Are you sure you want to delete this item?')){
        this.vehiclesservice.DeleteVehicles(id).subscribe(()=>{
            console.log('Item deleted successfully');
            this.ngOnInit();
          },
        );
      }
  }

  search(): void {
    const query = this.searchQuery?.trim().toLowerCase() || '';

        if (query === '') {
          this.filteredVehiclesList = [...this.vehiclesList];
        } else {
          this.filteredVehiclesList = this.vehiclesList.filter(vehicle =>
            vehicle.RegistrationNo.toLowerCase().includes(query)
          );
        }
        this.currentPage = 1;
  }
  getDisplayedVehicles(): IVehicles[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return (this.filteredVehiclesList || []).slice(startIndex, endIndex);
  }

  totalPages(): number[] {
    const totalItems = this.filteredVehiclesList?.length ?? 0;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getStateName(stateId: number): string {
    const state = this.stateList.find(s => s.StateNo === stateId);
    return state ? state.state : '';
  }

  getTypeName(typeId: number): string {
    const vehicleType = this.vehicleTypeList.find(t => t.TypeNo === typeId);
    return vehicleType ? vehicleType.Type : '';
  }

  getModelName(modelId: number): string {
    const vehicleModel = this.filteredModelList.find(m => m.ModelNo === modelId);
    return vehicleModel ? vehicleModel.Name : '';
  }

  getFuelName(fuelId: number): string {
    const vehicleFuel = this.vehicleFuelList.find(f => f.FuelNo === fuelId);
    return vehicleFuel ? vehicleFuel.Fuel : '';
  }

  getCapacityName(capacityId: number): string {
    const vehicleCapacity = this.vehicleCapacityList.find(c => c.CapacityNo === capacityId);
    return vehicleCapacity ? vehicleCapacity.Capacity.toString() : '';
  }

  loadVehicleTypes(): void {
    this.vehicleTypeservice.GetVehicleTypes().subscribe(res => {
      this.vehicleTypeList = res;
    });
  }

  loadVehicleFuel(): void {
    this.vehiclefuelservice.GetVehicleFuel().subscribe(res => {
      this.vehicleFuelList = res;
    });
  }

  loadVehicleCapacity(): void {
    this.vehiclecapacityservice.GetVehicleCapacity().subscribe(res => {
      this.vehicleCapacityList = res;
    });
  }

  loadStates(): void {
    this.stateservice.GetAllStates().subscribe(res => {
      this.stateList = res;
    });
  }

  loadModels(): void{
    this.modelservice.getVehicleModel().subscribe(res => {
      this.filteredModelList = res;
    });
  }

  trackByFn(index: number, item: IVehicles): number {
    return item.VehicleNo;
  }

}