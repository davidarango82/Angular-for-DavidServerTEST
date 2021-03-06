import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class SearchComponent implements OnInit {

  name: string;
  lastName: string;
  dishes: Dish[];
  errMess: string;

  constructor(private dishService: DishService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {

    this.name = "";

  }

  runSearch(){
    this.dishService.searchDishesbyName(this.name)
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
    
  }

}