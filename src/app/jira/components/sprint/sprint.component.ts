import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sprint } from 'src/app/sprints';
import { JiraService } from '../../services/jira.service';
import { Issue, Status, User } from '../../../issue';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  sprintId : string ="";
  sprint!: Sprint;
  issues: Issue[] = [];
  displayedSummary!: string;

  modifiedIssue!: Issue;

  editMode: Issue= {} as Issue;

  users: User[] = [{
    accountId: "63e25396491b20ef64bbf0f8",
    emailAddress: "ahmed.bahloul@talan.com"
  }];


  ToDo: Issue[] = [];
  InProgress: Issue[] = [];
  Done: Issue[] = [];

  draggedIssue!: any;
  srcDrop!: string;
  destDrop!: string;

  inProgress : Status = {
    id: "21",
    name: "In Progress"
  } as Status;

  toDo : Status = {
    id: "11",
    name: "To Do"
  } as Status;

  done : Status = {
    id: "31",
    name: "Done"
  } as Status;

  constructor(private route: ActivatedRoute, private jiraService: JiraService) { }

  ngOnInit(): void {
    this.sprintId = this.route.snapshot.paramMap.get('id') || "";

    this.getSprintById(this.sprintId);
    this.getIssuesBySprintId(this.sprintId);    

    this.getDevelopersByProjectId("10005");
    
  }

  getSprintById(id: string) {
  
    this.jiraService.getSprintById(id).subscribe({
      next: (data) => {
        this.sprint = data;
        console.log(this.sprint);

      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      }
    });
    }

    getIssuesBySprintId(id: string) {
      this.jiraService.getIssuesBySprintId(id).subscribe({
        next: (data) => {
          console.log(data);
          
          this.issues = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.ToDo = this.issues.filter(issue => issue.fields.status.name === "To Do");
          this.InProgress = this.issues.filter(issue => issue.fields.status.name === "In Progress");
          this.Done = this.issues.filter(issue => issue.fields.status.name === "Done");
        }
      });
    }

    dragStart(issue: Issue , src: string) {
      this.draggedIssue = issue;
      this.srcDrop = src;
    }

    drop(dest:string){    
        
      switch(this.srcDrop) {
        case "To Do":
          switch(dest) {            
            case "In Progress":
              if(this.draggedIssue){                
                let draggedIssueIndex = this.ToDo.indexOf(this.draggedIssue);
                this.ToDo.splice(draggedIssueIndex, 1);
                this.InProgress.push(this.draggedIssue);
                this.updateIssueStatus(this.draggedIssue, this.inProgress);
                this.draggedIssue = null;
                this.srcDrop = "";
              }
              break;
            case "Done":
              if(this.draggedIssue){
                let draggedIssueIndex = this.ToDo.indexOf(this.draggedIssue);
                this.ToDo.splice(draggedIssueIndex, 1);
                this.Done.push(this.draggedIssue);
                this.updateIssueStatus(this.draggedIssue, this.done);
                this.draggedIssue = null;
                this.srcDrop = "";
              }
              break;
          }
          break;
        case "In Progress":
          switch(dest) {
            case "To Do":
              if(this.draggedIssue){                
                let draggedIssueIndex = this.InProgress.indexOf(this.draggedIssue);
                this.InProgress.splice(draggedIssueIndex, 1);
                this.ToDo.push(this.draggedIssue);
                this.updateIssueStatus(this.draggedIssue, this.toDo);
                this.draggedIssue = null;
                this.srcDrop = "";
              }
              break;
            case "Done":
              if(this.draggedIssue){
                let draggedIssueIndex = this.InProgress.indexOf(this.draggedIssue);
                this.InProgress.splice(draggedIssueIndex, 1);
                this.Done.push(this.draggedIssue);
                this.updateIssueStatus(this.draggedIssue, this.done);
                this.draggedIssue = null;
                this.srcDrop = "";
              }
              break;
          }
          break;
        case "Done":
          switch(dest) {
            case "To Do":
              if(this.draggedIssue){
                let draggedIssueIndex = this.Done.indexOf(this.draggedIssue);
                this.Done.splice(draggedIssueIndex, 1);
                this.ToDo.push(this.draggedIssue);
                this.updateIssueStatus(this.draggedIssue, this.toDo);
                this.draggedIssue = null;
                this.srcDrop = "";
              }
              break;
            case "In Progress":
              if(this.draggedIssue){                
                let draggedIssueIndex = this.Done.indexOf(this.draggedIssue);
                this.Done.splice(draggedIssueIndex, 1);
                this.InProgress.push(this.draggedIssue);
                this.updateIssueStatus(this.draggedIssue, this.inProgress);
                this.draggedIssue = null;
                this.srcDrop = "";
              }
              break;
          }
          break;
        default:
          break;
      }
    }
  dragEnd() {
    this.draggedIssue = null;
  }


  updateIssueStatus(issue: Issue, status: Status) {
    issue.fields.status = status;
    this.jiraService.updateIssue(issue.id, issue).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      }
    });
  }


  sliceSummary(issue: Issue) {
    if(issue.fields.summary.length < 55){
      return issue.fields.summary;
    }else{
      return issue.fields.summary.slice(0, 55) + '...';
    }
  }

  editModee(issue: Issue) {
    this.editMode = issue;
  }

  handleInput(issue: Issue,event: any) {
    console.log(event.target.value);
    console.log(issue);
    issue.fields.summary = event.target.value;
    this.modifiedIssue = issue;
    }

  saveSummary() {
    this.jiraService.updateIssueSummary(this.modifiedIssue.id, this.modifiedIssue).subscribe({
      next: (data) => {
        console.log(data);
        this.editMode = {} as Issue;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      }
    });

  }


  stopEditing() {
    this.editMode = {} as Issue;
  }

  assignIssueToUser(issueId : string , userId: string){
    this.jiraService.assignIssueToUser(issueId, "63e25396491b20ef64bbf0f8").subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      }
    });
  }

  getDevelopersByProjectId(id: string) {
    this.jiraService.getDevelopersByProjectId(id).subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
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
