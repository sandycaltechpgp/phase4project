import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Product } from 'src/app/Model/product';
import {NgForm} from '@angular/forms';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    if (this.api.isAuthenticated) {
      this.api.getProducts().subscribe(
        res => {
          this.products = res.oblist;
        }
      );
    }
  }

getSearchResults() {
    if (this.api.isAuthenticated) {
	const elem: HTMLInputElement =<HTMLInputElement>document.getElementById('search'); const value: string = elem.value;
      this.api.getSearchProducts(value).subscribe(
        res => {
          this.products = res.oblist;
        }
      );
    }
  }
  
 

  addToCart(e) {
    this.api.addToCart(e).subscribe(res => {
      console.log(res);
    })
  }
}
