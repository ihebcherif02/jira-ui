import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JiraService } from '../../services/jira.service';
import { Lead } from 'src/app/Lead';


@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  leadId: string = "";
  lead!: Lead;

  constructor(private route: ActivatedRoute, private jiraService: JiraService) { }

  ngOnInit(): void {
    this.leadId = this.route.snapshot.paramMap.get('id') || "";
    this.getLeadById(this.leadId);
  }


  getLeadById(id: string) {
    this.jiraService.getLeadById(id).subscribe({
      next: (data) => {
        this.lead = data;
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
