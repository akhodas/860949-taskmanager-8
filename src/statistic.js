import AbstractComponentRender from './abstract-component-render';
import flatpickr from 'flatpickr';
import Chart from 'chart.js';

export default class Statistic extends AbstractComponentRender {
  constructor(list) {
    super();
    this.list = list;
    this._dateStart = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
    this._dateFinish = new Date().getTime();
    this._statTags = {
      labels: [`#watchstreams`, `#relaxation`, `#coding`, `#sleep`, `#watermelonpies`],
      data: [20, 15, 10, 5, 2]
    };
    this._statColors = {
      labels: [`pink`, `yellow`, `blue`, `black`, `green`],
      data: [5, 25, 15, 10, 30]
    };
    this._statDays = {
      labels: [`01 FEB`, `02 FEB`, `03 FEB`, `04 FEB`, `05 FEB`, `06 FEB`, `07 FEB`],
      data: [4, 6, 3, 1, 5, 2, 0]
    };
    this._onRangeDate = this._defaultFunctionRangeDate;
    this._onDateClick = this._onDateClick.bind(this);
    this._diagram = null;
    this._counter = 0;
  }

  get template() {
    return `
      <div class="statistic__line">
        <div class="statistic__period">
          <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

          <div class="statistic-input-wrap">
            <input
              class="statistic__period-input"
              type="text"
              placeholder="01 Feb - 08 Feb"
            />
          </div>

          <p class="statistic__period-result">
            In total for the specified period
            <span class="statistic__task-found">0</span> tasks were fulfilled.
          </p>
        </div>
        <div class="statistic__line-graphic visually-hidden">
          <canvas class="statistic__days" width="550" height="150"></canvas>
        </div>
      </div>

      <div class="statistic__circle">
        <div class="statistic__tags-wrap">
          <canvas class="statistic__tags" width="400" height="300"></canvas>
        </div>
        <div class="statistic__colors-wrap">
          <canvas class="statistic__colors" width="400" height="300"></canvas>
        </div>
      </div>
    `;
  }

  _getStatColors() {
    this._statColors = {
      labels: [],
      data: []
    };
    let index;
    this.list.forEach((element) => {
      if (element.dueDate === undefined ||
          (element.dueDate > this._dateStart && element.dueDate < this._dateFinish)) {
        index = this._statColors.labels.indexOf(element.color);
        if (index > -1) {
          this._statColors.data[index] += 1;
        } else {
          this._statColors.labels.push(element.color);
          this._statColors.data.push(1);
        }
      }
    });
  }

  _getStatTags() {
    this._statTags = {
      labels: [],
      data: []
    };
    let index;
    this.list.forEach((element) => {
      if (element.dueDate === undefined ||
          (element.dueDate > this._dateStart && element.dueDate < this._dateFinish)) {
        element.tags.forEach((tag) => {
          index = this._statTags.labels.indexOf(tag);
          if (index > -1) {
            this._statTags.data[index] += 1;
          } else {
            this._statTags.labels.push(tag);
            this._statTags.data.push(1);
          }
        });
      }
    });
  }

  set onRangeDate(fn) {
    this._onRangeDate = fn;
  }

  _defaultFunctionRangeDate(evt) {
    const rangeDate = evt.target.value;
    this._dateStart = new Date(rangeDate.split(` to `)[0]).getTime();
    this._dateFinish = new Date(rangeDate.split(` to `)[1]).getTime();
  }

  _onDateClick(evt) {
    if (typeof this._onRangeDate === `function`) {
      this._onRangeDate(evt);
    }

    if (this._counter > 0) {
      this._counter = 0;
      this.removeListeners();
      this._partialUpdate();
      this.createListeners();
    } else {
      this._counter++;
    }
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
    this.diagram();
  }

  createListeners() {
    this._element.querySelectorAll(`.statistic-input-wrap`)[0]
      .addEventListener(`click`, this._onDateClick);

    setTimeout(() => {
      flatpickr(`.statistic__period-input`,
          {altInput: true,
            mode: `range`,
            defaultDate: [this._dateStart, this._dateFinish],
            altFormat: `M j Y`,
            dateFormat: `M j Y`
          });
    }, 0);
  }

  removeListeners() {
    this._element.querySelectorAll(`.statistic-input-wrap`)[0]
      .removeEventListener(`click`, this._onDateClick);
  }

  diagram() {
    this._getStatColors();
    this._getStatTags();

    const colorsCtxLine = document.querySelector(`.statistic__days`);
    const tagsCtx = this._element.querySelector(`.statistic__tags`);
    const colorsCtx = this._element.querySelector(`.statistic__colors`);

    const colorChartLine = new Chart(colorsCtxLine, {
      type: `line`,
      data: {
        labels: this._statColors.labels,
        datasets: [{
          data: this._statColors.data,
          backgroundColor: `transparent`,
          borderColor: `#000000`,
          borderWidth: 1,
          lineTension: 0,
          pointRadius: 8,
          pointHoverRadius: 8,
          pointBackgroundColor: `#000000`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 8
            },
            color: `#ffffff`
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              display: false
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              fontStyle: `bold`,
              fontColor: `#000000`
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false
        },
        layout: {
          padding: {
            top: 10
          }
        },
        tooltips: {
          enabled: false
        }
      }
    });

    const tagsChart = new Chart(tagsCtx, {
      type: `pie`,
      data: {
        labels: this._statTags.labels,
        datasets: [{
          data: this._statTags.data,
          backgroundColor: [`#ff3cb9`, `#ffe125`, `#0c5cdd`, `#000000`, `#31b55c`, `red`, `orange`]
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: false
          }
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const allData = data.datasets[tooltipItem.datasetIndex].data;
              const tooltipData = allData[tooltipItem.index];
              const total = allData.reduce((acc, it) => acc + parseFloat(it));
              const tooltipPercentage = Math.round((tooltipData / total) * 100);
              return `${tooltipData} TASKS — ${tooltipPercentage}%`;
            }
          },
          displayColors: false,
          backgroundColor: `#ffffff`,
          bodyFontColor: `#000000`,
          borderColor: `#000000`,
          borderWidth: 1,
          cornerRadius: 0,
          xPadding: 15,
          yPadding: 15
        },
        title: {
          display: true,
          text: `DONE BY: TAGS`,
          fontSize: 16,
          fontColor: `#000000`
        },
        legend: {
          position: `left`,
          labels: {
            boxWidth: 15,
            padding: 25,
            fontStyle: 500,
            fontColor: `#000000`,
            fontSize: 13
          }
        }
      }
    });

    const colorsChart = new Chart(colorsCtx, {
      plugins: [],
      type: `pie`,
      data: {
        labels: this._statColors.labels,
        datasets: [{
          data: this._statColors.data,
          backgroundColor: this._statColors.labels
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: false
          }
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const allData = data.datasets[tooltipItem.datasetIndex].data;
              const tooltipData = allData[tooltipItem.index];
              const total = allData.reduce((acc, it) => acc + parseFloat(it));
              const tooltipPercentage = Math.round((tooltipData / total) * 100);
              return `${tooltipData} TASKS — ${tooltipPercentage}%`;
            }
          },
          displayColors: false,
          backgroundColor: `#ffffff`,
          bodyFontColor: `#000000`,
          borderColor: `#000000`,
          borderWidth: 1,
          cornerRadius: 0,
          xPadding: 15,
          yPadding: 15
        },
        title: {
          display: true,
          text: `DONE BY: COLORS`,
          fontSize: 16,
          fontColor: `#000000`
        },
        legend: {
          position: `left`,
          labels: {
            boxWidth: 15,
            padding: 25,
            fontStyle: 500,
            fontColor: `#000000`,
            fontSize: 13
          }
        }
      }
    });

    if (colorsChart === tagsChart) {
      colorsChart = colorChartLine;
    }
  }

}
