import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JiraService } from '../../services/jira.service';
import { Project } from 'src/app/Project';
import { Board } from 'src/app/Board';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectId: string = "";
  project!: Project ;
  boards: Board[] = [];

  constructor(private route: ActivatedRoute, private jiraService: JiraService) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || "";
    
    this.getProjectById(this.projectId);
  }

  getProjectById(id: string) {
    this.jiraService.getProjectById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.project = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.getBoardsByProjectId(this.projectId);
      }
    });
  }

  getBoardsByProjectId(id: string) {
    this.jiraService.getBoardsByProjectId(id).subscribe({
      next: (data) => {
        this.boards = data;
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
