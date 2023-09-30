import { catchError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AnimeServiceService } from 'src/app/services/anime-service.service';

@Component({
  selector: 'app-anime-info',
  templateUrl: './anime-info.component.html',
  styleUrls: ['./anime-info.component.css'],
})
export class AnimeInfoComponent implements OnInit {
  private anime: any;
  public name: string;
  public error: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _animeService: AnimeServiceService
  ) {
    this.name = '';
    this.error = false;
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.route.params.subscribe((params) => (this.name = params['anime']));
    if (this.name) {
      this.getAnimeDetail(this.name);
    }
  }

  getAnimeDetail(name: string) {
    try {
      this._animeService.getAnimeDetails(name).pipe(
        catchError((error) => {
          this.error = true;
          return [];
        })
      ).subscribe((data) => {
        this.anime = Object.values(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  get animeDetails() {
    if (this.anime) {
      return this.anime[0];
    } else {
      return [];
    }
  }

  navigate(episode: string) {
    this.router.navigate([`/see/${this.name}/${episode}`]);
  }
}
