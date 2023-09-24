import { Component, OnInit } from '@angular/core';

/**--------------------------
 * | Traemos el servicio
 *--------------------------*/
import { AnimeServiceService } from '../../../services/anime-service.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
})
export class AnimeListComponent implements OnInit {
  private listAnimes: any[];

  constructor(private _animeService: AnimeServiceService) {
    this.listAnimes = [];
  }

  ngOnInit(): void {
    this.getListAnimes(1);
  }

  getListAnimes(page: number) {
    try {
      this._animeService.getListAnimes(page).subscribe((data) => {
        this.listAnimes.push(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  get Animes() {
    return this.listAnimes[0];
  }
}
