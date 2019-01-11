import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Warehouse } from '../../shared/models/warehouse';
import { WarehousesService } from '../../shared/services/warehouses.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})

export class WarehouseComponent implements OnInit {
@Input() warehouse: Warehouse;
  
  
  private _warehouses$: Observable<Warehouse[]>;

  searchText: string = ""; 

  constructor(
    private router: Router,
    private warehouseSvc: WarehousesService, 
    private snackSvc: MatSnackBar) { }


  ngOnInit() {
    this._warehouses$ = this.warehouseSvc.getwarehouses();
  }

  onDetails(id){
    console.log(id);
    this.router.navigate([`/warehouse/Details/${id}`]);
  }


  onEdit(idValue){
    console.log(idValue);
    this.router.navigate([`/warehouse/Edit/${idValue}`]);
  }

  onAdd(){
    this.router.navigate(['/warehouse/Add']);
  }
  

  filterCondition(warehouse: Warehouse) {
    return warehouse.warehouse_id.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1  || 
           warehouse.warehouse_name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
          
   }
  

}