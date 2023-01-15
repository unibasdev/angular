import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from './routes/task/task.component';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {AuthGuard} from './service/guard/auth.guard';
import {TaskResolver} from "./service/resolver/task.resolver";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/task',
        pathMatch: 'full'
      },
      {
        path: 'task',
        component: TaskComponent,
        children: [
          {
            path: ':id',
            resolve: {task: TaskResolver},
            component: TaskComponent
          }
        ]
      }
    ]
  },
  // lazy loading
  {
    path: 'login',
    loadChildren: () => import('./routes/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./routes/help/help.module').then(m => m.HelpModule)
  },
  // otherwise redirect to PageNotFound
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
