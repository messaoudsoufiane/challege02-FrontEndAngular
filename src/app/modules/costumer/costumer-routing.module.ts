import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostumerDashboardComponent } from './components/costumer-dashboard/costumer-dashboard.component';
import { PostCarComponent } from './components/post-car/post-car.component';

const routes: Routes = [
  {path:"dashboard",component:CostumerDashboardComponent},
  {path:"post-car",component:PostCarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostumerRoutingModule { }
