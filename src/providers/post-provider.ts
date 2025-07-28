import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PostProvider {
    //server: string = 'https://tis1.itbi.ac.id/api/'; 
<<<<<<< HEAD
    server: string = 'https://smk.aplikasi.blog/';
=======
    server: string = 'http://smk.aplikasi.blog/';
>>>>>>> e9ece910c7c1d0cd06be99300c8cd2486f9604b2

    constructor(public http: HttpClient) { }

    postData(body: any, file: string): Observable<any> {
        let type = 'application/json; charset=utf-8';
        let headers = new HttpHeaders({ 'Content-Type': type });

        return this.http.post(this.server + file, JSON.stringify(body), {
            headers: headers,
        }).pipe(
            map((res: any) => {
                return res;
            })
        );
    }
} 