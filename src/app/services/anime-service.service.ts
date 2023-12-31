import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**-------------------------------------
 * | Contiene las varibles de entorno
 * -------------------------------------*/
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimeServiceService {
  private ApiUrl: string;

  constructor(private http: HttpClient) {
    this.ApiUrl = environment.enpoint;
  }

  /**-------------------------------------------------
   * | Obtenemos la lista de los animes por pagina
   *-------------------------------------------------*/
  getListAnimes(page: number) {
    return this.http.get(`${this.ApiUrl}/animes/${page}`);
  }

  /**---------------------------------------
   * | Obtenemos el detalle de un anime
   *---------------------------------------*/
  getAnimeDetails(anime: string) {
    return this.http.get(this.ApiUrl + `/details/` + anime);
  }

  /**------------------------------------------------------
   * | Obtenemos el enlace de reproducción de un episodio
   *------------------------------------------------------*/
  getLinkByAnime(anime: string, episode: string) {
    return this.http.get(this.ApiUrl + `/see/` + anime + `/` + episode);
  }
}
