import { Component, OnInit } from '@angular/core';
import { Paciente } from '../paciente';
import { DishService } from '../services/dish.service';
import { NullTemplateVisitor } from '@angular/compiler';
import { isDate } from 'util';
//import { Validations } from '../shared/validations';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  cities = ['Bogota', 'Medellin', 'Cali', 'Barranquilla', 'Pasto'];
  clinics = ['Calle 90', 'Santafe', 'Unicentro', 'Andino'];
  barrios = ['Rosales', 'San José de Bavaria', 'Usaquen', 'Cedritos'];
  marketings = ['TV', 'radio', 'calle', 'volante', 'recibo de servicios', 'un amigo'];
  comercials = ['com1', 'com2', 'com3'];
  maritals = ['soltero', 'casado', 'union libre', 'separado', 'viudo'];
  doctors = ['N/A', 'doc1', 'doc2', 'doc3'];
  formasdepago = ['N/A', 'Pronto pago', 'Financiado'];
  financieras = ['N/A', 'Colpatria', 'BBVA', 'Denticuotas'];

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
    clinic: this.clinics[0],
    comercial: '',
    doctorPV: '',
    importeFF: 0,
    DNIFF: null,
    financiera: this.financieras[0],
    estadoFF: '',
    formaPago: this.formasdepago[0],
    facturado: null,
    description: ''
  };

  constructor(private dishService: DishService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("Paciente: ", this.paciente);
    //this.dishService.getDishes()
    this.dishService.postDish(this.paciente)
      .subscribe(res => {
        // if (res.success) {
        //   this.dialogRef.close(res.success);          
        // }
        // else {
        //   console.log(res);
        // }
      },
      error => {
        console.log(error);
        //this.errMess = error
      })
  }

}
