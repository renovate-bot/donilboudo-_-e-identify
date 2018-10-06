import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
 // { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'visitor-create', loadChildren: './pages/visitor-create/visitor-create.module#VisitorCreatePageModule' },
  { path: 'visitor-detail/:id', 
    loadChildren: './pages/visitor-detail/visitor-detail.module#VisitorDetailPageModule' 
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
