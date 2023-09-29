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
  private page: number;
  public currentPage: number;
  public itemsPerPage: number;

  constructor(private _animeService: AnimeServiceService) {
    this.listAnimes = [];
    this.page = 1;
    this.currentPage = 1;
    this.itemsPerPage = 15;
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getListAnimes(this.page);
  }

  getListAnimes(page: number) {
    try {
      this._animeService.getListAnimes(page).subscribe((data) => {
        if (this.page !== 1) {
          this.listAnimes = this.listAnimes.concat(data);
          // console.log('CONCAT: ', this.listAnimes);
        } else {
          this.listAnimes = Object.values(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  get Animes() {
    window.scroll(0, 0);
    if (this.listAnimes !== undefined && this.listAnimes.length !== 0) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.listAnimes.slice(startIndex, endIndex);
    }
    return [];
  }

  nextPage() {
    if (
      this.currentPage < Math.ceil(this.listAnimes.length / this.itemsPerPage)
    ) {
      this.currentPage++;
    }

    if (this.currentPage === this.lastPage) {
      if (this.page !== 4) {
        this.getListAnimes((this.page += 1));
      }
    }
  }

  get lastPage() {
    if (this.listAnimes) {
      return Math.ceil(this.listAnimes.length / this.itemsPerPage);
    }
    return 1;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
