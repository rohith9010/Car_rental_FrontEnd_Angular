import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { IVehicleMake_ } from '../../Interfaces/IVehicleMake_';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleMakeService {
  mode1!:IVehicleMake_;
  private apiUrl = 'https://localhost:7028/api/VehicleMake';
 
  constructor(private http: HttpClient) { }
  

  getVehicleMake():Observable<IVehicleMake_[]>
  {
    return this.http.get<IVehicleMake_[]>(this.apiUrl);
  }
  AddVehicleMake(model:IVehicleMake_):Observable<IVehicleMake_>{
    return this.http.post<IVehicleMake_>(this.apiUrl , model);
  }
  getById(id: number):Observable<IVehicleMake_> {
    return this.http.get<IVehicleMake_>(`${this.apiUrl}/${id}`);
  }
  updateVehicleMake(model: IVehicleMake_):Observable<IVehicleMake_>{
    return this.http.put<IVehicleMake_>(`${this.apiUrl}/${model.MakeNo}`,model);
  }
  deleteVehicleMake(id: number): Observable<IVehicleMake_> {
    return this.http.delete<IVehicleMake_>(`${this.apiUrl}/${id}`);
  }

}