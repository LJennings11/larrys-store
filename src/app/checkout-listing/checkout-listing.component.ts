import { Component, OnInit, Input } from '@angular/core';
import {Checkout} from '../checkout'

@Component({
  selector: 'app-checkout-listing',
  templateUrl: './checkout-listing.component.html',
  styleUrls: ['./checkout-listing.component.css']
})
export class CheckoutListingComponent implements OnInit {

  @Input() transactions:Checkout[] = []

  constructor() { }

  ngOnInit() {
  }

}
