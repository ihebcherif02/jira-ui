import { Component, OnInit } from '@angular/core';
import { Project } from '../../../Project';
import { HttpClient } from '@angular/common/http';
import { JiraService } from '../../services/jira.service';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {

  projects : Project[] = new Array<Project>();

  constructor(private http: HttpClient, private jiraService: JiraService) {

  }

  ngOnInit() {

    this.jiraService.getMyProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },

      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      }
    });
  }

}
