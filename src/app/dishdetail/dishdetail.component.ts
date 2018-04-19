import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';
import { Dish } from '../shared/dish';
import { Paciente } from '../paciente';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true'/*,
   'style': 'display: block;'*/
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective;

  paciente: Paciente;
  dish: Dish;
  dishIds: String[];
  prev: String;
  next: String;
  errMess: string;
  visibility = 'shown';
  favorite: boolean = false;

  /** validation values */
  cities = ['Bogota', 'Medellin', 'Cali', 'Barranquilla', 'Pasto'];
  clinics = ['Calle 90', 'Santafe', 'Unicentro', 'Andino'];
  barrios = ['Otro', 'Rosales', 'San José de Bavaria', 'Usaquen', 'Cedritos'];
  marketings = ['TV', 'radio', 'calle', 'volante', 'recibo de servicios', 'un amigo'];
  comercials = ['Lisseth Lemus', 'Francisco Mora', 'Andres Ardila', 'Diego Garcia', 
  'Nubia Pinzon', 'Javier Tibaduiza', 'Alisson Mora', 'Liliana Reyes', 'Claudia Tamayo'];
  maritals = ['soltero', 'casado', 'union libre', 'separado', 'viudo'];
  doctors = ['N/A', 'Maria Suarez', 'Laura Roncancio', 'Manuel Manjarrez', 
  'Johanna Mendoza', 'Luz Quesada', 'Johan Basterrechea', 'Zulma Rojas',
  'Sebastian Rivera','Sandra Mancera', 'Diana Castillo', 'Diana Florez', 
  'Viviana Diaz', 'Catalina Monroy', 'Mauricio Montoya',
  'Tatiana Angulo', 'Ricardo Posada'];
  formasdepago = ['N/A', 'Pronto pago', 'Financiado'];
  financieras = ['N/A', 'Colpatria', 'BBVA', 'Denticuotas'];
  estadoFFs = ['prevision', 'imputado', 'facturado'];

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'comment': {
      'required':      'Comment is required.'
    }
  };

  commentForm: FormGroup;

  constructor(private dishservice: DishService,
    private favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {

    this.createForm();

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']); })
      .subscribe(dish => { 
          this.dish = dish; 
          this.setPrevNext(dish._id); 
          this.visibility = 'shown';
          this.favoriteService.isFavorite(this.dish._id)
            .subscribe(resp => { console.log(resp); this.favorite = resp.exists; },
                err => console.log(err));
        },
        errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: String) {
    if(this.dishIds) {
      let index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    }
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    console.log(this.commentForm.value);
    this.dishservice.postComment(this.dish._id, this.commentForm.value)
      .subscribe(dish => this.dish = dish);
    this.commentForm.reset({
      rating: 5,
      comment: ''
    });
    this.commentFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  addToFavorites() {
    console.log("Add to Favorites")
    if (!this.favorite)
      this.favoriteService.postFavorite(this.dish._id)
        .subscribe(favorites => { console.log(favorites); this.favorite = true; });
  }

  save() {
    console.log("Dish: ", this.dish);
    this.dishservice.updateDish(this.dish)
      .subscribe()
      this.goBack();
  }

}