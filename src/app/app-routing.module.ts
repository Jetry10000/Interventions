import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ProblemeComponent } from './probleme/probleme.component';

const routes: Routes = [
  { path:'accueil', component:AcceuilComponent},
{ path:'probleme', component:ProblemeComponent},    
{ path:'', redirectTo:'accueil', pathMatch:'full'},
{ path:'**', redirectTo:'accueil', pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
