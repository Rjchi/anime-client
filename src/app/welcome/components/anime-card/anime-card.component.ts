import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.css'],
})
export class AnimeCardComponent {
  @Input() anime: any;

  constructor() {
    this.anime = {};
  }
}
