import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Observer, map } from "rxjs";
import { Snowreport } from "./snowreport";
import { SnowreportFactory } from "./snowreport-factory";

const url="https://tourism.api.opendatahub.com/v1/Weather/SnowReport";

@Injectable()
export class SnowreportService {
  snowreports!:Snowreport[]
  constructor (private http: HttpClient) {}
  getAllSnowReports():Observable<Snowreport[]> {
    if (this.snowreports!=null) {
      return new Observable(((observer:Observer<Snowreport[]>) => {
        observer.next(this.snowreports);
        observer.complete();
      }))
    }
    else {
      return this.http.get<any>(`${url}?lang=de`).pipe(
        map(rawSnowreports => rawSnowreports.map((rawSnowreport:any)=> SnowreportFactory.createObject(rawSnowreport))),
      )
    }
  }
  getSnowReport(id:string):Observable<Snowreport> {
    return this.http.get<Snowreport>(`${url}/${id}?lang=de`);
  }
}
