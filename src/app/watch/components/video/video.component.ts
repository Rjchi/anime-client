import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AnimeServiceService } from '../../../services/anime-service.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  private link: any;
  public sanitizedLink: SafeResourceUrl | undefined;
  public name: string;
  public episode: string;
  public anime: any;
  public currentPage: number;
  public loading: boolean;
  public exist: boolean;

  constructor(
    private _animeService: AnimeServiceService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.name = '';
    this.episode = '';
    this.loading = false;
    this.exist = true;
    this.currentPage = 0;
    this.sanitizedLink = undefined;
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.route.params.subscribe(
      (params) => (
        (this.name = params['anime']),
        (this.episode = params['episode']),
        (this.currentPage = parseInt(params['episode']))
      )
    );

    if (this.name && this.episode) {
      this.getLinkAnime(this.name, this.episode);
    }
  }

  getLinkAnime(name: string, episode: string) {
    try {
      console.log(episode);
      this._animeService.getLinkByAnime(name, episode).pipe(
        catchError((error) => {
          this.exist = false;
          return []
        })
      ).subscribe((data) => {
        this.link = Object.values(data);
        this.sanitizeLink();
      });
      this._animeService.getAnimeDetails(name).subscribe((data) => {
        this.anime = Object.values(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  sanitizeLink() {
    if (this.link && this.link.length > 0) {
      this.sanitizedLink = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.link[0].link
      );
    }
    this.loading = false;
  }

  navigate(anime: string) {
    this.router.navigate([`/anime/detail/${anime}`]);
  }

  handleClickSig() {
    if (this.currentPage && this.anime) {
      /**-----------------------------------------------------------
       * Eliminamos los duplicados y ordenamos de menor a mayor
       * -----------------------------------------------------------*/
      let episodes = Array.from(new Set(this.anime[0].episodes));
      let orderedEpisodes = episodes.sort((a: any, b: any) => +a - +b);

      console.log('episodes ordenados: ', orderedEpisodes);

      let encontrado = orderedEpisodes.indexOf(this.currentPage.toString());

      if (encontrado !== -1) {
        if (encontrado !== orderedEpisodes.length - 1) {
          this.loading = true;
          console.log('Siguiente: ', orderedEpisodes[encontrado + 1]);
          this.episode = orderedEpisodes[encontrado + 1] as string;
          this.router.navigate([`/see/${this.name}/${this.episode}`]);
          this.getLinkAnime(this.name, this.episode);
        }
      } else {
        this.exist = false;
      }
    } else {
      console.log('No existe ese capitulo');
    }
  }

  handleClickAnt() {
    if (this.currentPage && this.anime) {
      let episodes = Array.from(new Set(this.anime[0].episodes));
      let orderedEpisodes = episodes.sort((a: any, b: any) => +a - +b);

      console.log('episodes ordenados: ', orderedEpisodes);

      let encontrado = orderedEpisodes.indexOf(this.currentPage.toString());

      if (encontrado !== -1) {
        if (encontrado !== 0) {
          console.log('Anterior: ', orderedEpisodes[encontrado - 1]);
        } else {
          console.log('Permanece Igual ', orderedEpisodes[encontrado]);
        }
      } else {
        console.log('No existe ese capitulo');
      }
    } else {
      console.log('No existe ese capitulo');
    }
  }
}
