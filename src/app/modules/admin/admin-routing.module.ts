import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashbComponent } from './components/admin-dashb/admin-dashb.component';

const routes: Routes = [
  {path:"dashboard",component:AdminDashbComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
