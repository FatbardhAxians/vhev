import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import {
  Chart,
  ChartData,
  ChartOptions,
  CategoryScale,
  LinearScale,
  LineElement,
  LineController,
  PointElement,
  Tooltip,
  Title,
} from 'chart.js';

// Register all components needed for the chart
Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  LineController,
  PointElement,
  Tooltip,
  Title
);

@Component({
  selector: 'app-chart-line-stacked',
  templateUrl: './chart-line-stacked.component.html',
  styleUrls: ['./chart-line-stacked.component.scss'],
})
export class ChartLineStackedComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartCanvasTwo') chartCanvasTwo!: ElementRef<HTMLCanvasElement>;

  // Data and configuration for the first chart
  allData: number[] = [65, 59, 80, 81, 56, 55, 40]; // Example data
  displayedData: number[] = [...this.allData];
  increments: number[] = [0, 0, 0, 0, 0, 0, 0]; // Updated to match number of datasets

  labels: string[] = ['2000', '2020', '2040', '2060', '2080', '2100'];

  // Colors for each dataset
  colors: { borderColor: string; backgroundColor: string }[] = [
    {
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
    {
      borderColor: 'rgb(153, 102, 255)',
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
    },
    {
      borderColor: 'rgb(255, 159, 64)',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
    },
    {
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
    {
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      borderColor: 'rgb(255, 205, 86)',
      backgroundColor: 'rgba(255, 205, 86, 0.5)',
    },
    {
      borderColor: 'rgb(201, 203, 207)',
      backgroundColor: 'rgba(201, 203, 207, 0.5)',
    },
  ];

  data: ChartData<'line', number[]> = {
    labels: this.labels,
    datasets: [
      {
        label: 'Coal',
        data: this.displayedData,
        borderColor: this.colors[0].borderColor,
        backgroundColor: this.colors[0].backgroundColor,
      },
      {
        label: 'Oil',
        data: this.displayedData.map((d) => d + 10), // Different dataset with increment
        borderColor: this.colors[1].borderColor,
        backgroundColor: this.colors[1].backgroundColor,
      },
      {
        label: 'Natural Gas',
        data: this.displayedData.map((d) => d + 20), // Another dataset with increment
        borderColor: this.colors[2].borderColor,
        backgroundColor: this.colors[2].backgroundColor,
      },
      {
        label: 'Bioenergy',
        data: this.displayedData.map((d) => d + 30), // Another dataset with increment
        borderColor: this.colors[3].borderColor,
        backgroundColor: this.colors[3].backgroundColor,
      },
      {
        label: 'Wind',
        data: this.displayedData.map((d) => d + 40), // Another dataset with increment
        borderColor: this.colors[4].borderColor,
        backgroundColor: this.colors[4].backgroundColor,
      },
      {
        label: 'Solar',
        data: this.displayedData.map((d) => d + 50), // Another dataset with increment
        borderColor: this.colors[5].borderColor,
        backgroundColor: this.colors[5].backgroundColor,
      },
      {
        label: 'Hydro',
        data: this.displayedData.map((d) => d + 60), // Another dataset with increment
        borderColor: this.colors[6].borderColor,
        backgroundColor: this.colors[6].backgroundColor,
      },
    ],
  };

  options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '',
      },
      tooltip: {
        mode: 'index',
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '',
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Exajoules/years',
        },
      },
    },
  };

  // Data and configuration for the second chart
  secondData: ChartData<'line', number[]> = {
    labels: this.labels,
    datasets: [
      {
        label: 'Dataset A',
        data: this.displayedData.map((d) => d + 5),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset B',
        data: this.displayedData.map((d) => d + 15),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  secondOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '',
      },
      tooltip: {
        mode: 'index',
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Gigatons CO2 equivalent/years',
        },
      },
    },
  };

  chart!: Chart<'line'>;
  secondChart!: Chart<'line'>;

  ngAfterViewInit(): void {
    this.drawChart();
    this.drawSecondChart();
  }

  drawChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.data,
        options: this.options,
      });
    }
  }

  drawSecondChart(): void {
    const ctx = this.chartCanvasTwo.nativeElement.getContext('2d');
    if (ctx) {
      this.secondChart = new Chart(ctx, {
        type: 'line',
        data: this.secondData,
        options: this.secondOptions,
      });
    }
  }

  onSliderChange(event: Event, datasetIndex: number): void {
    const slider = event.target as HTMLInputElement;
    this.increments[datasetIndex] = parseInt(slider.value, 18);
    this.updateChart();
    this.updateSecondChart();
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.data.datasets.forEach((dataset, index) => {
        dataset.data = this.allData.map(
          (d) => d + this.increments[index] + index * 10
        );
      });
      this.chart.update();
    }
  }

  updateSecondChart(): void {
    if (this.secondChart) {
      this.secondChart.data.datasets.forEach((dataset, index) => {
        dataset.data = this.allData.map(
          (d) => d + this.increments[index] + (index + 1) * 5
        );
      });
      this.secondChart.update();
    }
  }
}
