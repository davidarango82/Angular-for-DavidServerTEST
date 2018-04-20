import { Injectable } from '@angular/core';
//revisar si Dish es necesario... o se cambia por Paciente
import { Dish } from '../shared/dish';
import { Paciente } from '../paciente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getDish(id: string): Observable<Dish> {
    return  this.http.get(baseURL + 'dishes/'+ id)
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
                    .map(dishes => dishes[0])
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getDishIds(): Observable<String[] | any> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish._id)})
      .catch(error => { return error; });
  }

  postComment(dishId: string, comment: any) {
    return this.http.post(baseURL + 'dishes/' + dishId + '/comments', comment)
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
    
  }

  postDish(paciente) {
    return this.http.post(baseURL + 'dishes', 
      { "id_num": paciente.id_num, "name": paciente.name, "lastName": paciente.lastName, 
      "phone": paciente.phone, "city": paciente.city, "barrio": paciente.barrio, 
      "address": paciente.address, "sex": paciente.sex, "birthday": paciente.birthday, 
      "marital": paciente.marital, "email": paciente.email, "marketing": paciente.marketing,
      "datePV": paciente.datePV, "clinic": paciente.clinic, "comercial": paciente.comercial, 
      "tipoPV": paciente.tipoPV,"doctorPV": paciente.doctorPV, "importeFF": paciente.importeFF, "DNIFF": paciente.DNIFF,
      "financiera": paciente.financiera, 
      "estadoFF": paciente.estadoFF, "formaPago": paciente.formaPago, "facturado": paciente.facturado,
      "description": paciente.description, "campo1":paciente.campo1, "campo2":paciente.campo2 })

        .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
  
  updateDish(dish) {
    return this.http.put(baseURL + 'dishes/' + dish._id, 
      { "id_num": dish.id_num, "name": dish.name, "lastName": dish.lastName, 
      "phone": dish.phone, "city": dish.city, "barrio": dish.barrio, 
      "address": dish.address, "sex": dish.sex, "birthday": dish.birthday, 
      "marital": dish.marital, "email": dish.email, "marketing": dish.marketing,
      "datePV": dish.datePV, "clinic": dish.clinic, "comercial": dish.comercial, 
      "tipoPV": dish.tipoPV, "doctorPV": dish.doctorPV, "importeFF": dish.importeFF, "DNIFF": dish.DNIFF,
      "financiera": dish.financiera, "estadoFF": dish.estadoFF, "formaPago": dish.formaPago,
      "facturado": dish.facturado, "description": dish.description, 
      "campo1":dish.campo1, "campo2":dish.campo2 })

        .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

}