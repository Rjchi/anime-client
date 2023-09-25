import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AnimeServiceService } from 'src/app/services/anime-service.service';

@Component({
  selector: 'app-anime-info',
  templateUrl: './anime-info.component.html',
  styleUrls: ['./anime-info.component.css'],
})
export class AnimeInfoComponent implements OnInit {
  private anime: any;
  public name: string;

  constructor(
    private route: ActivatedRoute,
    private _animeService: AnimeServiceService
  ) {
    this.name = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.name = params['anime']));
    if (this.name) {
      this.getAnimeDetail(this.name);
    }
  }

  getAnimeDetail(name: string) {
    try {
      this._animeService.getAnimeDetails(name).subscribe((data) => {
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
}
