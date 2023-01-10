import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiocaPartitaComponent } from './components/gioca-partita/gioca-partita.component';
import { NuovaPartitaComponent } from './components/nuova-partita/nuova-partita.component';
import { PartitaEsistenteGuard } from './guard/partita-esistente.guard';

const routes: Routes = [
  // { path: '', redirectTo: '/nuova', pathMatch: 'full' },
  { path: '', redirectTo: '/gioca', pathMatch: 'full' },
  { path: 'nuova', component: NuovaPartitaComponent },
  { path: 'gioca', component: GiocaPartitaComponent, canActivate: [PartitaEsistenteGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
