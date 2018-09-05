import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MyTableItem } from "../my-table/my-table-datasource";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private readonly url = 'http://localhost:3000/data'

    constructor(private _http: HttpClient) {
    }

    findAll(): Observable<MyTableItem[]> {
        return this._http.get(this.url).pipe(map(data => data as MyTableItem[]));
    }
}