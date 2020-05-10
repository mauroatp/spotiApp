import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery( query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBpQg3JrfXiJ96Y4P5kw7-DqAktnQ9grE8Lxu0giH9vo877fwDP3fSuIj79DYCi9AzPdh9jKU9kHLgdJo0'
    });

    return this.http.get(url, { headers });

  }

  getNewRelease(){
 
/*    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCPdRCdz5fcPhysoapTnCXVecUBFiyXCu0zJZjp0fpVYDS32brEf1QTmQ3MkgNjkf3n0tsKp3tgGtjBUUY'
    });

    return this.http.get('https://api.spotify.com/v1/browse/new-releases?limit=20', {headers})
            .pipe( map( response => {
              return response['albums'].items;
            }));
      //.subscribe( response => {
      //  console.log(response);
      //});
      */
    return this.getQuery('browse/new-releases?limit=20')
    .pipe( map( response => {
      return response['albums'].items;
    }));
  }

  getArtistas(termino: string){

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
    .pipe(map( response => response['artists'].items)); //es lo mismo porque tengo solo una linea
/*
    return this.http.get(`https://api.spotify.com/v1/search?q=${termino}&type=artist&limit=15`, {headers})
            .pipe(map( response => response['artists'].items)); //es lo mismo porque tengo solo una linea
            */
            /* .pipe(map( response => {
              return response['artists'].items;
            }));
*/
  }

  getArtista(id: string){

    return this.getQuery(`artists/${id}`);
    //.pipe(map( response => response['artists'].items));// una sola line no necesita {} //no lo necesita el pipe porque ya viene formateada la info
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
    .pipe(map( response => response['tracks']))
  }
}
