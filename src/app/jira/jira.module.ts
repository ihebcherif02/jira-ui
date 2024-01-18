import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JiraRoutingModule } from './jira-routing.module';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ProjectComponent } from './components/project/project.component';
import { LeadComponent } from './components/lead/lead.component';
import { BoardComponent } from './components/board/board.component';
import { SprintComponent } from './components/sprint/sprint.component';
import { DragDropModule } from 'primeng/dragdrop';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProjectTableComponent, ProjectComponent, LeadComponent, BoardComponent, SprintComponent],
  imports: [
    CommonModule,
    JiraRoutingModule,
    HttpClientModule,
    TableModule,
    CardModule,
    DragDropModule,
    TooltipModule,
    FormsModule
  ]
})
export class JiraModule { }
