import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrls: ['./anime-card.component.css'],
})
export class AnimeCardComponent {
  @Input() anime: any;

  constructor(private router: Router) {
    this.anime = {};
  }

  navigate(anime: string) {
    this.router.navigate([`/anime/detail/${anime}`]);
  }
}
