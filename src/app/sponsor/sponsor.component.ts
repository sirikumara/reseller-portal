import { Component, NgModule, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sponsor } from './sponsor';
import { Location } from '@angular/common';
import { SponsorService } from './sponsor.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})

export class SponsorComponent implements OnInit {

  constructor(private location: Location, private sponsorService: SponsorService) { }

  //In child component
  @Input()
  sponsor: Sponsor = {
    name: '',
    companyName: '',
    companyRegCode: ''
  };

  commonMsg: string = "xxxxxxxxxxxxxx";

  ngOnInit(): void {
    if (history.state.data != null) {
      this.sponsor = history.state.data;
    }
  }

  onSave(): void {
    this.commonMsg = this.sponsorService.save({
      name: this.sponsor.name,
      companyName: this.sponsor.companyName,
      companyRegCode: this.sponsor.companyRegCode,
      requestId: 'admin-portal-req-1'
    }).pipe(catchError(e => { return this.commonMsg = e; })).subscribe();
  }

  onCancel(): void {
  }

  goBack(): void {
    this.location.back();
  }
}
