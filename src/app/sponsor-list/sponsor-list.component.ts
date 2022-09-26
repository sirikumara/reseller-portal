import { Component, OnInit } from '@angular/core';
import { Sponsor } from '../sponsor/sponsor';
import { SponsorService } from '../sponsor/sponsor.service';

@Component({
  selector: 'app-sponsor-list',
  templateUrl: './sponsor-list.component.html',
  styleUrls: ['./sponsor-list.component.css']
})
export class SponsorListComponent implements OnInit {

  sponsorList: Sponsor[] = [];
  // In Parent component
  selectedSponsor: Sponsor = {
    id: 0,
    name: '',
    companyName: '',
    companyRegCode: ''
  }

  isEditing: boolean = false;
  constructor(private sponsorService: SponsorService) { }

  ngOnInit(): void {
    this.sponsorList = this.sponsorService.getSponsorList();
  }

  onEdit(rowSponsor: Sponsor): void {
    this.isEditing = true;
    this.selectedSponsor = rowSponsor
  }

  hadelIsEditingEvent(event: any): void {
    this.isEditing = event;
  }

}
