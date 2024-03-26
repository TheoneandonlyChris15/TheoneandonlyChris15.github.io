import { Measuringpoint } from './measuringpoint';
import { Snowreport } from "./snowreport";

export class SnowreportFactory {
  static createObject(rawSnowreport: any): Snowreport {
    let measuringpoints:Measuringpoint[]=[];
    rawSnowreport.Measuringpoints.forEach((
      rawMeasuringpoint: { LastUpdate: string; SnowHeight: string;
      newSnowHeight: string; LastSnowDate: string; Shortname:string; Temperature:string}
      ) =>
      measuringpoints.push(new Measuringpoint (
        rawMeasuringpoint.LastUpdate,
        rawMeasuringpoint.SnowHeight,
        rawMeasuringpoint.newSnowHeight,
        rawMeasuringpoint.LastSnowDate,
        rawMeasuringpoint.Shortname,
        rawMeasuringpoint.Temperature
    )));
    return new Snowreport(
      rawSnowreport.RID,
      rawSnowreport.Skiregion,
      rawSnowreport.Areaname,
      rawSnowreport.SkiMapUrl,
      measuringpoints,
      rawSnowreport.contactlogo,
      rawSnowreport.contactweburl,
      rawSnowreport.WebcamUrl,
      rawSnowreport.openskilift,
      rawSnowreport.totalskilift,
      rawSnowreport.SkiAreaSlopeKm
    )
  }
}
