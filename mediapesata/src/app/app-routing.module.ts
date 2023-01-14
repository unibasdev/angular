import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNonTrovataComponent } from './components/pagina-non-trovata/pagina-non-trovata.component';
import { AuthGuard } from './guard/auth.guard';
import { EsameEditComponent } from './routes/esame-edit/esame-edit/esame-edit.component';
import { LoginComponent } from './routes/login/login/login.component';
import { StudenteComponent } from './routes/studente/studente/studente.component';
import { StudentiComponent } from './routes/studenti/studenti/studenti.component';
import { EsameResolver } from './service/resolver/esame.resolver';
import { StudenteResolver } from './service/resolver/studente.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/studenti', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'studenti', component: StudentiComponent, canActivate: [AuthGuard] },
  { path: 'studenti/new', component: StudenteComponent, canActivate: [AuthGuard] },
  {
    path: 'studenti/:idSt', component: StudenteComponent, canActivate: [AuthGuard],
    resolve: { studente: StudenteResolver }
  },
  {
    path: 'studenti/:idSt/edit', component: StudenteComponent, canActivate: [AuthGuard],
    resolve: { studente: StudenteResolver }
  },
  {
    path: 'studenti/:idSt/esami/new', component: EsameEditComponent, canActivate: [AuthGuard],
    resolve: { studente: StudenteResolver }
  },
  {
    path: 'studenti/:idSt/esami/:idEs/edit', component: EsameEditComponent, canActivate: [AuthGuard],
    resolve: { studente: StudenteResolver, esame: EsameResolver }
  },
  { path: '**', component: PaginaNonTrovataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
