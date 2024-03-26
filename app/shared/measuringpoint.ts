export class Measuringpoint {
  public lastUpdated:Date=new Date();
  public lastSnowDate:Date=new Date();
  constructor(public LastUpdate:string, public SnowHeight:string, public newSnowHeight: string, public LastSnowDate:string,
    public Shortname: string, public Temperature:string) {
    this.lastUpdated=new Date(LastUpdate);
    this.lastSnowDate=new Date(LastSnowDate);
  }
}
