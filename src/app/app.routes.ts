import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { StartComponent } from './start/start.component';
import { CartComponent } from './cart/cart.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DetailsComponent } from './details/details.component';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { ListingComponent } from './listing/listing.component';
import { NonAdminOnly } from './non-admin-only';
import { AdminOnly } from './admin-only';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'main', pathMatch:'full' },
    { path: 'main', component: StartComponent },
    { path: 'transactions', component: TransactionsComponent, canActivate: [AdminOnly] },
    { path: 'cart', component: CartComponent, canActivate: [NonAdminOnly] },
    { path: 'manage', component: InventoryManagementComponent, canActivate: [AdminOnly] },
    { path: 'doSearch', redirectTo: 'search' },
    { path: 'search', component: ListingComponent },
    { path: 'item/:id', component: DetailsComponent }
];