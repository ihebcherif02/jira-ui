import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/Board';
import { JiraService } from '../../services/jira.service';
import { Sprint } from 'src/app/sprints';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boardId: string = "";
  board: Board = {} as Board;
  sprints: Sprint[] = [];

  constructor(private route: ActivatedRoute, private jiraService: JiraService) { }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id') || "";
    this.getSprintByBoardId(this.boardId);
  }


  getSprintByBoardId(id: string) {
    this.jiraService.getSprintByBoardId(id).subscribe({
      next: (data) => {
        console.log(data);
        this.sprints = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('completed');
      }
    });
  }

  getBoardById(id: string) {
    this.jiraService.getBoardById(id).subscribe({
      next: (data) => {
        this.board = data;
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
