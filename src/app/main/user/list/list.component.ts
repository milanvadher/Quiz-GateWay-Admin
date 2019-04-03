import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'app/api.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { merge, Observable, BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: fuseAnimations
})
export class ListComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns = ['mht_id', 'name', 'center', 'mobile', 'totalscore', 'isactive'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.api.getUsers().subscribe(data => {
      console.log('USERS ::: ** ::: ', data.data.users);
      this.dataSource = new MatTableDataSource(data.data.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

// bonus: 765
// center: "Simandhar City"
// createdAt: "2019-03-09T16:42:41.037Z"
// email: "mohit.niruma@gmail.com"
// fb_token: null
// isactive: true
// lives: 1
// mht_id: 29077
// mobile: "9924347186"
// name: "Mohit Agravat"
// onesignal_token: null
// question_id: 880
// totalscore: 1700
// updatedAt: "2019-03-09T16:42:41.037Z"
// user_group: "MBA"


const DATA = [
  {
    'id': '1',
    'name': 'Printed Dress',
    'handle': 'printed-dress',
    'description': 'Officia amet eiusmod eu sunt tempor voluptate laboris velit nisi amet enim proident et. Consequat laborum non eiusmod cillum eu exercitation. Qui adipisicing est fugiat eiusmod esse. Sint aliqua cupidatat pariatur mollit ad est proident reprehenderit. Eiusmod adipisicing laborum incididunt sit aliqua ullamco.',
    'categories': [
      'Dresses',
      'Women'
    ],
    'tags': [
      'dress',
      'printed'
    ],
    'images': [
      {
        'id': 1,
        'url': 'assets/images/ecommerce/product-image-placeholder.png',
        'type': 'image'
      },
      {
        'id': 2,
        'url': 'assets/images/etc/air-balloons.jpg',
        'type': 'image'
      },
      {
        'id': 3,
        'url': 'assets/images/etc/avenue.jpg',
        'type': 'image'
      },
      {
        'id': 4,
        'url': 'assets/images/etc/cactus.jpg',
        'type': 'image'
      },
      {
        'id': 5,
        'url': 'assets/images/etc/early-sunrise.jpg',
        'type': 'image'
      },
      {
        'id': 6,
        'url': 'assets/images/etc/mountain-lake.jpg',
        'type': 'image'
      },
      {
        'id': 7,
        'url': 'assets/images/etc/road-trip.jpg',
        'type': 'image'
      },
      {
        'id': 8,
        'url': 'assets/images/etc/snow.jpg',
        'type': 'image'
      },
      {
        'id': 9,
        'url': 'assets/images/etc/tropical-beach.jpg',
        'type': 'image'
      },
      {
        'id': 10,
        'url': 'assets/images/etc/mountain-sunset.jpg',
        'type': 'image'
      }
    ],
    'priceTaxExcl': 9.309,
    'priceTaxIncl': 10.24,
    'taxRate': 10,
    'comparedPrice': 19.90,
    'quantity': 3,
    'sku': 'A445BV',
    'width': '22cm',
    'height': '24cm',
    'depth': '15cm',
    'weight': '3kg',
    'extraShippingFee': 3.00,
    'active': true
  },
  {
    'id': '2',
    'name': 'Green Skirt',
    'handle': 'green-skirt',
    'description': 'Duis anim est non exercitation consequat. Ullamco ut ipsum dolore est elit est ea elit ad fugiat exercitation. Adipisicing eu ad sit culpa sint. Minim irure Lorem eiusmod minim nisi sit est consectetur.',
    'categories': [
      'Skirts',
      'Women'
    ],
    'tags': [
      'dress',
      'printed'
    ],
    'images': [
      {
        'id': 1,
        'url': 'assets/images/ecommerce/product-image-placeholder.png',
        'type': 'image'
      },
      {
        'id': 2,
        'url': 'assets/images/etc/air-balloons.jpg',
        'type': 'image'
      },
      {
        'id': 3,
        'url': 'assets/images/etc/avenue.jpg',
        'type': 'image'
      },
      {
        'id': 4,
        'url': 'assets/images/etc/cactus.jpg',
        'type': 'image'
      },
      {
        'id': 5,
        'url': 'assets/images/etc/early-sunrise.jpg',
        'type': 'image'
      },
      {
        'id': 6,
        'url': 'assets/images/etc/mountain-lake.jpg',
        'type': 'image'
      },
      {
        'id': 7,
        'url': 'assets/images/etc/road-trip.jpg',
        'type': 'image'
      },
      {
        'id': 8,
        'url': 'assets/images/etc/snow.jpg',
        'type': 'image'
      },
      {
        'id': 9,
        'url': 'assets/images/etc/tropical-beach.jpg',
        'type': 'image'
      },
      {
        'id': 10,
        'url': 'assets/images/etc/mountain-sunset.jpg',
        'type': 'image'
      }
    ],
    'priceTaxExcl': 22.381,
    'priceTaxIncl': 24.62,
    'taxRate': 10,
    'comparedPrice': 29.90,
    'quantity': 92,
    'sku': 'A445BV',
    'width': '22cm',
    'height': '24cm',
    'depth': '15cm',
    'weight': '3kg',
    'extraShippingFee': 3.00,
    'active': true
  }
];
