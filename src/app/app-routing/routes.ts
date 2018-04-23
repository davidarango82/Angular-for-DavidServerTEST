import { Routes } from '@angular/router';

import { AppComponent } from '../app.component';
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { FavoritesComponent } from '../favorites/favorites.component';
//ruta para modulo Nuevo Paciente
import { NuevoComponent } from '../nuevo/nuevo.component';
import { SearchComponent } from '../search/search.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  {path: 'aboutus', component: AboutComponent},
  { path: 'menu',     component: MenuComponent },
  { path: 'favorites',     component: FavoritesComponent },
  { path: 'contactus',     component: ContactComponent },
  { path: 'dishdetail/:id',     component: DishdetailComponent },
  //ruta para modulo Nuevo Paciente
  { path: 'nuevo',     component: NuevoComponent },
  { path: 'search', component: SearchComponent},
  { path: '', redirectTo: '/menu', pathMatch: 'full' }
];