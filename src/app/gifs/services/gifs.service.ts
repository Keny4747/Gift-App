import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string ='4rBEWAJHeDMHHNH2Me8Hu4lXnPDVC2ku';
  private servicioUrl:string ='https://api.giphy.com/v1/gifs';
  private _historial:string[]=[];

  //TODO: Cambiar any por su tipo correspondiente
  public resultados:Gif[]=[];

  get historial(){

    return [...this._historial];
  }

  constructor(private http:HttpClient){
  //if(localStorage.getItem('historial')){
    //  this._historial=JSON.parse(localStorage.getItem('historial')!);
   // }

   this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
   this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs(query:string){


    if(!this._historial.includes(query)){

      query = query.trim().toLowerCase();

      this._historial.unshift(query);

      //Se limita el arreglo a 10 items reiniciandolo si es que pasa el limite
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
                        .set('api_key',this.apiKey)
                        .set('limit','10')
                        .set('q',query);



    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe( (resp) => {
        console.log(resp.data);
        this.resultados=resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });

  }

}
