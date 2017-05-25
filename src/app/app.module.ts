import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ItemListingComponent } from './item-listing.component/item-listing.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MdButtonModule, MdCheckboxModule} from '@angular/material';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {ReactiveFormsModule} from '@angular/forms';

import {StuffService} from './stuff.service'
import {CartService} from './cart.service'
import {ErrorService} from './error.service'

import 'hammerjs';
import { UserService } from './user.service';
import { ItemComponent } from './item/item.component';

import { NonAdminOnly } from './non-admin-only';
import { AdminOnly } from './admin-only';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';
import { SignInComponent } from './sign-in/sign-in.component';
import { OverviewComponent } from './overview/overview.component';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { ListingComponent } from './listing/listing.component';
import { DetailsComponent } from './details/details.component';
import { SignedInComponent } from './signed-in/signed-in.component';
import { StartComponent } from './start/start.component';
import { CartComponent } from './cart/cart.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CheckoutListingComponent } from './checkout-listing/checkout-listing.component'

@NgModule({
  declarations: [
    AppComponent,
    ItemListingComponent,
    ItemComponent,
    SignInComponent,
    OverviewComponent,
    InventoryManagementComponent,
    ListingComponent,
    DetailsComponent,
    SignedInComponent,
    StartComponent,
    CartComponent,
    TransactionsComponent,
    CheckoutListingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,    
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StuffService,CartService,UserService,ErrorService,NonAdminOnly,AdminOnly],
  bootstrap: [AppComponent]
})
export class AppModule { }
