import { catchError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AnimeServiceService } from '../../../services/anime-service.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  private link: any;
  private sanitizedLink: SafeResourceUrl | undefined;
  public name: string;
  public episode: string;

  constructor(
    private _animeService: AnimeServiceService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.name = '';
    this.episode = '';
    this.sanitizedLink = undefined;
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => (
        (this.name = params['anime']), (this.episode = params['episode'])
      )
    );

    if (this.name && this.episode) {
      this.getLinkAnime(this.name, this.episode);
    }
  }

  getLinkAnime(name: string, episode: string) {
    this._animeService.getLinkByAnime(name, episode).pipe(
      catchError(error => {
        console.error('Error al obtener el enlace del anime:', error);
        return [];
      })
    ).subscribe((data) => {
      this.link = Object.values(data);
    });
  }

  get linkAnime() {
    if (this.link && this.link.length > 0) {
      this.sanitizedLink = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.link[0].link
      ) as SafeResourceUrl;

      return this.sanitizedLink;
    }
    return [];
  }
}
