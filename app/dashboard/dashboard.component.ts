import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnowreportService } from '../shared/snowreport-service';
import { Snowreport } from '../shared/snowreport';
import { MatTableDataSource } from '@angular/material/table';
import { BreakPoint } from '@angular/flex-layout';

export interface SnowElement {
  id: string;
  name: string;
  skiregion: string;
  lastUpdated: Date;
  snowDepth: string;
  powderSnow: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'skiregion', 'lastUpdated', 'snowDepth', 'powderSnow'];
  dataSource: MatTableDataSource<SnowElement> ;
  isMobile = false;


  constructor(public router: Router, private sr: SnowreportService) {
    this.dataSource = new MatTableDataSource<SnowElement>([]);

  }

  ngOnInit() {
    this.sr.getAllSnowReports().subscribe((snowreports: Snowreport[]) => {
      const data: SnowElement[] = [];
      const skigebietMap = new Map<string, SnowElement>();

      snowreports.forEach(snowreport => {
        snowreport.Measuringpoints.forEach(measuringpoint => {
          const key = `${snowreport.Areaname}-${snowreport.Skiregion}`;
          if (!skigebietMap.has(key)) {
            const skigebiet: SnowElement = {
              id: snowreport.RID,
              name: snowreport.Areaname || 'N/A',
              skiregion: snowreport.Skiregion || 'N/A',
              lastUpdated: measuringpoint.lastUpdated || new Date(),
              snowDepth: measuringpoint.SnowHeight || 'N/A',
              powderSnow: measuringpoint.newSnowHeight || 'N/A'
            };
            skigebietMap.set(key, skigebiet);
          }
        });
      });

      skigebietMap.forEach(value => data.push(value));
      this.dataSource.data = this.sortSkigebieteByPowderSnow(data);
    });
  }

  getRowStyles(powderSnow: number) {
    let backgroundColor = '';
    if (powderSnow >= 200) {
      backgroundColor = 'rgb(33, 97, 140)';
    } else if (powderSnow >= 160) {
      backgroundColor = 'rgb(46, 134, 193)';
    } else if (powderSnow >= 120) {
      backgroundColor = 'rgb(93, 173, 226)';
    } else if (powderSnow >= 80) {
      backgroundColor = 'rgb(174, 214, 241)';
    } else if (powderSnow >= 40) {
      backgroundColor = 'rgb(235, 245, 251)';
    } else {
      backgroundColor = 'rgb(253, 254, 254)';
    }
    return {
      'background-color': backgroundColor
    };
  }

  sortSkigebieteByPowderSnow(skigebiete: SnowElement[]): SnowElement[] {
    return skigebiete.sort((a, b) => {
      const powderSnowA = parseInt(a.powderSnow);
      const powderSnowB = parseInt(b.powderSnow);
      return powderSnowB - powderSnowA;
    });
  }
  formatDate(date: Date): string {
    const day = this.padZero(date.getDate());
    const month = this.padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

}
