import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, PreloadAllModules } from '@angular/router';

import { WarehousesComponent } from '../src/app/components/warehouses/warehouses.component';
import { WarehousesAddComponent} from '../src/app/components/warehouses/warehouses-add/warehouses-add.component';
import { WarehousesEditComponent } from '../src/app/components/warehouses/warehouses-edit/warehouses-edit.component';


import { ProductsComponent } from '../src/app/components/products/products.component';
import { ProductsAddComponent} from '../src/app/components/products/products-add/products-add.component';
import { ProductsEditComponent } from '../src/app/components/products/products-edit/products-edit.component';

import { InventoriesComponent } from '../src/app/components/inventories/inventories.component';
import { InventoriesAddComponent} from '../src/app/components/inventories/inventories-add/inventories-add.component';
import { InventoriesEditComponent } from '../src/app/components/inventories/inventories-edit/inventories-edit.component';










const appRoutes = [
   
    {
        path: 'Warehouses',
        component: WarehousesComponent,
        
    },
        {
        path: 'Warehouses/Add',
        component: WarehousesAddComponent,
   
    },
    {
        path: 'Warehouses/Edit/:id',
        component: WarehousesEditComponent,
     
    },
    {
        path: 'Products',
        component: ProductsComponent,
        
    },
    {
        path: 'Productds/Add',
        component: ProductsAddComponent,
        
    },
    {
        path: 'Products/Edit/:id',
        component: ProductsEditComponent,
    
    },
    {
        path: 'Inventories',
        component: InventoriesComponent
    },
    {
        path: 'Inventories/Edit/:id',
        component: InventoriesEditComponent,
     
    },
    {
        path: 'Inventories/Add',
        component: InventoriesAddComponent,
       
    {
        path: 'Inventories/Edit/:id',
        component: InventoriesEditComponent,
      //  canActivate: [ AuthGuard ]
    },
    {
        path: '', 
        redirectTo: '/Warehouses', 
        pathMatch: 'full' 
    },
    {
        path: '**', 
        component: WarehousesComponent,
    }

]

@NgModule({
    declarations: [
    
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(appRoutes) // { enableTracing: true, preloadingStrategy: PreloadAllModules })
    ],
    exports: [ RouterModule ],
    providers: []
  })
  
export class RoutingModule { }