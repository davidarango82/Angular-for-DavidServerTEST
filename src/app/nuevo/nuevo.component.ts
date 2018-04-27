import { Component, OnInit } from '@angular/core';
import { Paciente } from '../paciente';
import { DishService } from '../services/dish.service';
import { NullTemplateVisitor } from '@angular/compiler';
import { isDate } from 'util';
//import { Validations } from '../shared/validations';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
 
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  subscription: Subscription;

  cities = ['Bogota', 'Medellin', 'Cali', 'Barranquilla', 'Pasto'];
  clinics = ['calle90', 'santafe', 'unicentro', 'andino'];
  barrios = ['Otro','Rosales', 'San José de Bavaria', 'Usaquen', 'Cedritos'];
  marketings = ['TV', 'radio', 'calle', 'volante', 'recibo de servicios', 'un amigo'];
  comercials = ['com1', 'com2', 'com3'];
  maritals = ['soltero', 'casado', 'union libre', 'separado', 'viudo'];
  doctors = ['N/A', 'doc1', 'doc2', 'doc3'];
  formasdepago = ['N/A', 'Pronto pago', 'Financiado'];
  financieras = ['N/A', 'Colpatria', 'BBVA', 'Denticuotas'];
  tipoPVs = ['Primera Visita', 'Traslado'];
  estadoFFs = ['N/A', 'Prevision', 'Denegado', 'Imputado', 'Facturado']

  paciente: Paciente = {
    /** datos diligenciados por el paciente */
    id_num: null,
    name: '',
    lastName: '',
    phone: null,
    city: this.cities[0],
    barrio: this.barrios[0],
    address: '',
    sex: '',
    birthday: null,
    marital: this.maritals[0],
    email: '',
    marketing: '',
    /**datos diligenciados por clinica */
    datePV: '',
    historial: '',
    clinic: '',
    tipoPV: '',
    comercial: '',
    doctorPV: '',
    importeFF: 0,
    nombreFF: '',
    DNIFF: null,
    financiera: this.financieras[0],
    estadoFF: this.estadoFFs[0],
    formaPago: this.formasdepago[0],
    facturado: 0,
    description: '',
    campo1: '',
    campo2: ''
  };

  constructor(private dishService: DishService, private authService: AuthService, 
    private location: Location,) { }

  ngOnInit() {

    // this.subscription = this.authService.getUsername()
    //   .subscribe(name => { console.log(name); this.paciente.clinic = name; });   

  }

  onSubmit() {
    console.log("Paciente: ", this.paciente);
    //this.dishService.getDishes()
    this.dishService.postDish(this.paciente)
      .subscribe(res => {

        this.location.back();

      },
      error => {
        console.log(error);
        //this.errMess = error
      })
      
      // this.subscription.unsubscribe();
      // console.log("unsubscribed...");

      //this.ngOnInit();

  }

  getUser(){
    console.log("clicked!");
    this.subscription = this.authService.getUsername()
    .subscribe(name => { console.log(name); this.paciente.clinic = name; });
  }

}
