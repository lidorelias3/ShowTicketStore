import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ShowsService } from 'src/app/services/shows.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  id: number;
  show: any;

  constructor(private route: ActivatedRoute, private showsService: ShowsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'] || 0;
    }).unsubscribe();

    this.show = this.showsService.getShow(this.id)
  }
}
