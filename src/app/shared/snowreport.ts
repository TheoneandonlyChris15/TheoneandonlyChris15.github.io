import { Measuringpoint } from "./measuringpoint";

export class Snowreport {
  constructor (
    public RID:string, public Skiregion:string, public Areaname:string, public SkiMapUrl:string, public Measuringpoints: Measuringpoint[],
    public contactlogo:string, public contactweburl:string, public WebcamUrl:string[], public openskilift:string,
    public totalskilift:string, public SkiAreaSlopeKm:string
    ) {
      console.log("Hallo");
      this.clearWebcamUrl();
    }

    private clearWebcamUrl () {
      this.WebcamUrl.filter(webcamurl => {
        if (webcamurl&&webcamurl.length>0) {
          return true;
        }
        else {
          return false;
        }
      });
    }

    getSnowHeight():number {
      let sum:number=0;
      this.Measuringpoints.forEach(measuringpoint => sum=sum+Number(measuringpoint.SnowHeight));
      return sum/this.Measuringpoints.length;
    }

    getLastUpdated():Date {
      this.Measuringpoints.sort((a,b) => a.lastUpdated.getTime()-b.lastUpdated.getTime());
      return this.Measuringpoints[0].lastUpdated;
    }

    getNewSnowHeight():number {
      let sum:number=0;
      let measuringpoints=this.Measuringpoints.filter(m => m.lastUpdated==this.getLastUpdated());
      measuringpoints.forEach(measuringpoints => sum=sum+Number(measuringpoints.newSnowHeight));
      return sum/measuringpoints.length;
    }

    getSnowDate():Date {
      this.Measuringpoints.sort((a,b) => a.lastSnowDate.getTime()-b.lastSnowDate.getTime());
      return this.Measuringpoints[0].lastSnowDate;
    }
}
