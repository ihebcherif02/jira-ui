import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from 'src/app/Board';
import { Lead } from 'src/app/Lead';
import { Project } from 'src/app/Project';

@Injectable({
  providedIn: 'root'
})
export class JiraService {

  baseUrl: string = "http://localhost:8080/jira";

  constructor(private http: HttpClient) { }


  getLeadById(id: string) {
    return this.http.get<Lead>(this.baseUrl + `/lead/${id}`);
  }

  getProjectById(id: string) {
    return this.http.get<Project>(this.baseUrl + `/project/${id}`);
  }

  getMyProjects() {
    return this.http.get<Project[]>(this.baseUrl + `/projects/all`);
  }

  getBoardsByProjectId(id: string):Observable<any> {
    return this.http.get(this.baseUrl + `/project/${id}/board`);
  }

  getSprintByBoardId(id: string):Observable<any> {
    return this.http.get(this.baseUrl + `/board/${id}/sprint`);
  }

  getBoardById(id: string):Observable<any> {
    return this.http.get(this.baseUrl + `/board/${id}`);
  }

  getSprintById(id: string):Observable<any> {
    return this.http.get(this.baseUrl + `/sprint/${id}`);
  }

  getIssuesBySprintId(id: string):Observable<any> {
    return this.http.get(this.baseUrl + `/sprint/${id}/issues`);
  }

  updateIssue(id: string , issue: any) {
    return this.http.patch(this.baseUrl + `/issue/${id}`, issue);
  }

  updateIssueSummary(id: string , issue: any) {
    return this.http.put(this.baseUrl + `/issue/${id}/summary`, issue);
  }

  assignIssueToUser(issueId : string , userId: string){
    return this.http.put(this.baseUrl + `/issue/${issueId}/assignee/${userId}`, {});
  }

  getDevelopersByProjectId(id: string):Observable<any> {
    return this.http.get(this.baseUrl + `/project/${id}/members`);
  }

}
