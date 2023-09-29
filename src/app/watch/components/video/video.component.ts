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
      /**-------------------------------------
       * Obtenemos el enlace de reproducción
       * -------------------------------------*/
      this._animeService
        .getLinkByAnime(name, episode)
        .pipe(
          catchError((error) => {
            this.exist = false;
            return [];
          })
        )
        .subscribe((data) => {
          this.link = Object.values(data);
          this.sanitizeLink();
        });

      /**-------------------------------------
       * Obtenemos los detalles del anime
       * -------------------------------------*/
      this._animeService.getAnimeDetails(name).subscribe((data) => {
        this.anime = Object.values(data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**------------------------------------------------------------
   * Esto lo hacemos para prevenir vulnerabilidades de seguridad
   * sanitizando la url que va en el iframe
   * ------------------------------------------------------------*/
  sanitizeLink() {
    if (this.link && this.link.length > 0) {
      this.sanitizedLink = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.link[0].link
      );
    }
    this.loading = false;
  }

  /**----------------------------------
   * Navegamos al detalle de el anime
   * ----------------------------------*/
  navigate(anime: string) {
    this.router.navigate([`/anime/detail/${anime}`]);
  }

  /**-----------------------------------------------------------
   * Eliminamos los duplicados y ordenamos de menor a mayor
   *-----------------------------------------------------------*/
  orderedEpisodes(animes: any) {
    let episodes = Array.from(new Set(animes));
    let orderedEpisodes = episodes.sort((a: any, b: any) => +a - +b);

    return orderedEpisodes;
  }

  /**----------------------------------------------------------------------
   * Navegamos a otro episodio y obtenemos nuevo enlace de reproducción
   * ----------------------------------------------------------------------*/
  getNewLink() {
    this.router.navigate([`/see/${this.name}/${this.episode}`]);
    this.getLinkAnime(this.name, this.episode);
  }

  nextPrev(operator: string) {
    if (this.currentPage && this.anime) {
      let orderEpisodes = this.orderedEpisodes(this.anime[0].episodes);
      let findIndex = orderEpisodes.indexOf(this.currentPage.toString());

      if (findIndex !== -1) {
        /**------------------------------------------
         * Esto es para cuando clikeamos siguiente
         * ------------------------------------------*/
        if (operator === '+') {
          if (findIndex !== orderEpisodes.length - 1) {
            this.loading = true;
            this.episode = orderEpisodes[findIndex + 1] as string;

            this.getNewLink();
          }
        } else {
          /**------------------------------------------
           * Esto es para cuando clikeamos anterior
           * ------------------------------------------*/
          if (findIndex !== 0) {
            this.loading = true;
            this.episode = orderEpisodes[findIndex - 1] as string;

            this.getNewLink();
          }
        }
      } else {
        this.exist = false;
      }
    } else {
      this.exist = false;
    }
  }

  handleClickSig() {
    this.nextPrev('+');
  }

  handleClickAnt() {
    this.nextPrev('-');
  }
}
