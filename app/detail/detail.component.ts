import { Component, OnInit } from '@angular/core';
import { SnowreportService } from '../shared/snowreport-service';
import { Snowreport } from '../shared/snowreport';
import { ActivatedRoute } from '@angular/router';
import { SnowElement } from '../dashboard/dashboard.component';

export interface Tile {
  cols: number;
  rows: number;
  text: string;
  data?: any;
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss', '../dashboard/dashboard.component.scss']
})
export class DetailComponent implements OnInit {
  tiles: Tile[] = [];
  selectedCameraUrl: string | undefined;
  skiArea: SnowElement | undefined;
  snowreport: Snowreport | undefined;

  constructor(private snowreportService: SnowreportService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.snowreportService.getSnowReport(id).subscribe((snowreport: Snowreport) => {
          if (snowreport) {
            this.snowreport = snowreport;
            this.skiArea = {
              id: snowreport.RID,
              name: snowreport.Areaname || 'N/A',
              skiregion: snowreport.Skiregion || 'N/A',
              lastUpdated: new Date(),
              snowDepth: snowreport.Measuringpoints[0].SnowHeight || 'N/A',
              powderSnow: snowreport.Measuringpoints[0].newSnowHeight || 'N/A'
            };

            this.tiles.push({ cols: 1, rows: 1, text: 'Metadaten über das Skigebiet', data: this.skiArea });
            this.tiles.push({ cols: 1, rows: 1, text: 'Kameras', data: snowreport.WebcamUrl });
            this.tiles.push({ cols: 2, rows: 2, text: 'Karte des Skigebiets', data: snowreport.SkiMapUrl });
            if (snowreport.WebcamUrl && snowreport.WebcamUrl.length > 0) {
              this.selectedCameraUrl = snowreport.WebcamUrl[0];
            }
          }
        });
      }
    });
  }

  selectCamera(index: number) {
    if (this.tiles[1].data && this.tiles[1].data.length > index) {
      this.selectedCameraUrl = this.tiles[1].data[index];
    }
  }
}
