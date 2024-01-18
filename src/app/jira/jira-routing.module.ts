import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { ProjectComponent } from './components/project/project.component';
import { LeadComponent } from './components/lead/lead.component';
import { BoardComponent } from './components/board/board.component';
import { SprintComponent } from './components/sprint/sprint.component';

const routes: Routes = [
  { path: 'projects', component: ProjectTableComponent },
  { path: 'project/:id', component: ProjectComponent},
  { path: 'lead/:id', component: LeadComponent},
  { path: 'board/:id', component: BoardComponent },
  { path: 'sprint/:id', component: SprintComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JiraRoutingModule { }
