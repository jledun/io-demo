import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// local components
import { ExempleWebComponent } from './exemple-web/exemple-web.component';
import { ExempleFullscreenComponent } from './exemple-fullscreen/exemple-fullscreen.component';

const routes: Routes = [
  {path: 'exemple-web', component: ExempleWebComponent},
  {path: 'exemple-fullscreen', component: ExempleFullscreenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
