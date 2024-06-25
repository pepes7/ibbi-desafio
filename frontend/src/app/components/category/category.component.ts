import { Component, OnInit } from '@angular/core';
import {Category} from "../../interfaces/category";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../interfaces/product";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  ngOnInit(): void {
  }
}
