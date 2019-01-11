import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';


// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from '../app.routing';


import { MaterialModule } from './shared/material.module';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { ProductsComponent } from './components/products/products.component';
import { InventoriesComponent } from './components/inventories/inventories.component';
import { WarehousesAddComponent } from './components/warehouses/warehouses-add/warehouses-add.component';
import { WarehousesEditComponent } from './components/warehouses/warehouses-edit/warehouses-edit.component';
import { InventoriesAddComponent } from './components/inventories/inventories-add/inventories-add.component';
import { InventoriesEditComponent } from './components/inventories/inventories-edit/inventories-edit.component';
import { ProductsAddComponent } from './components/products/products-add/products-add.component';
import { ProductsEditComponent } from './components/products/products-edit/products-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    WarehousesComponent,
    ProductsComponent,
    InventoriesComponent,
    WarehousesAddComponent,
    WarehousesEditComponent,
    InventoriesAddComponent,
    InventoriesEditComponent,
    ProductsAddComponent,
    ProductsEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    HttpClientModule, 
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
