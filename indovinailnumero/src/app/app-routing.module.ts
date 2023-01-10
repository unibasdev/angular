import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiocaPartitaComponent } from './routes/gioca-partita/components/gioca-partita/gioca-partita.component';
import { NuovaPartitaComponent } from './routes/nuova-partita/components/nuova-partita/nuova-partita.component';
import { PartitaEsistenteGuard } from './guard/partita-esistente.guard';
import { ListaPartiteComponent as StoricoComponent } from './routes/storico/components/storico/lista-partite.component';

const routes: Routes = [
  { path: '', redirectTo: '/nuova', pathMatch: 'full' },
  { path: 'nuova', component: NuovaPartitaComponent },
  { path: 'gioca', component: GiocaPartitaComponent, canActivate: [PartitaEsistenteGuard] },
  { path: 'storico', component: StoricoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
