import { Component, OnInit } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, ChartData, registerables } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { StatisticsService } from '../../Services/analyticsService/analytics.service';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    NgChartsModule
  ],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  totalProjects = 0;
  totalFiles = 0;
  totalUsers=0;
  primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ring').trim() || '#1976d2';
  
  pieData: ChartData<'pie', number[], string> = {
    labels: ['Public', 'Private'],
    datasets: [{ data: [0, 0], backgroundColor: [this.primaryColor, this.primaryColor] }]
  };

  barData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [{ label: 'Logins Per Day', data: [], backgroundColor: this.primaryColor }]
  };
  
  barData_project: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [{ label: 'active user', data: [], backgroundColor: this.primaryColor }]
  };
  

  constructor(private statsService: StatisticsService) { }

  ngOnInit(): void {
    this.statsService.getTotalProjects().subscribe(res => this.totalProjects = res);
    this.statsService.getTotalFiles().subscribe(res => this.totalFiles = res);
    this.statsService.getTotalUsers().subscribe(res=>this.totalUsers=res);


    this.statsService.getProjectTypeCounts().subscribe(data => {
      const pub = data.find(d => d.isPublic)?.count || 0;
      const priv = data.find(d => !d.isPublic)?.count || 0;
      this.pieData.datasets[0].data = [pub, priv];
      console.log("pub/pri",data,this.pieData);
    });

    this.statsService.getDailyLogins().subscribe(data => {
      const grouped = this.groupByDay(data);
      this.barData.labels = Object.keys(grouped);
      this.barData.datasets[0].data = Object.values(grouped);
      console.log("daily logins",data,this.barData);

    });
    // this.statsService.getDailyProjects().subscribe(data => {
    //   const grouped = this.groupByDay(data);
    //   this.barData_project.labels = Object.keys(grouped);
    //   this.barData_project.datasets[0].data = Object.values(grouped);
    //   console.log("daily projects",data,this.barData_project);

    // });

  }

  private groupByDay(dates: string[]): Record<string, number> {
    const map: Record<string, number> = {};
    dates.forEach(d => {
      const day = new Date(d).toLocaleDateString();
      map[day] = (map[day] || 0) + 1;
    });
    return map;
  }
}