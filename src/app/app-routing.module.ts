import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
=======
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule)
  },
  {
>>>>>>> e9ece910c7c1d0cd06be99300c8cd2486f9604b2
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () =>
      import('./tab4/tab4.module').then((m) => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () =>
      import('./tab5/tab5.module').then((m) => m.Tab5PageModule)
  },
  {
    path: '**',
<<<<<<< HEAD
    redirectTo: 'tabs'
=======
    redirectTo: 'login'
>>>>>>> e9ece910c7c1d0cd06be99300c8cd2486f9604b2
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
