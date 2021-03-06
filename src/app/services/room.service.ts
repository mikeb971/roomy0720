import { Injectable } from '@angular/core';
import { RoomModel } from '../models/room.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, timer } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoomService {

    constructor(private http: HttpClient) { }

    getAllRooms(): Observable<Array<RoomModel>> {
        /*return [
            { name: 'Pégase', image: 'Pegase.jpg' },
            { name: 'Calliope', image: 'Calliope.jpg' },
            { name: 'Uranie', image: 'Uranie.jpg' }
        ];*/

        let obs = this.http.get<Array<RoomModel>>(environment.urlRooms);
        //obs.subscribe(this.toto);
        /*obs.subscribe(data => {
            console.log('data', data);
            return data;
        });*/
        return obs;

        //console.log('return null');
        //return null;
    }

    getTopFive(): Observable<Array<RoomModel>> {
        const obsTimer = timer(0, 10000);
        /*obsTimer.subscribe(x => {
            console.log('timer', x);
        });*/

        let obs = this.http.get<Array<RoomModel>>(environment.urlRooms).pipe(map(data => data.splice(0, 5)));

        return obsTimer.pipe(mergeMap(() => obs));
        //return obs;
    }

    getRoomById(id: number): Observable<RoomModel> {
        return this.http.get<RoomModel>(`${environment.urlRooms}/${id}`);
    }

    insert(room: RoomModel): Observable<RoomModel> {
        return this.http.post<RoomModel>(environment.urlRooms, room);
    }

    update(room: RoomModel): Observable<RoomModel> {
        return this.http.put<RoomModel>(`${environment.urlRooms}/${room.id}`, room);
    }

    delete(id: number): Observable<RoomModel> {
        return this.http.delete<RoomModel>(`${environment.urlRooms}/${id}`);
    }

    /*toto(data:any){
        console.log(data);
    }*/
}