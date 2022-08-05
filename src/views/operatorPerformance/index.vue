<template>
  <div class="p-4 main">
    <b-card class="mb-4" :title="$t('report.daily_chart_of_receiving_calls')">
      <b-row class="align-items-center">
        <b-col class="col-lg-2 col-md-3 col-12">
          <b-form-group :label="$t('from')" for="c">
            <div class="d-flex align-items-center">
              <datepicker
                id="to_data"
                v-model="filter.start_date"
                :bootstrap-styling="true"
                :clear-button="false"
                :language="ru"
                :calendar-button="true"
                format="dd.MM.yyyy"
                calendar-button-icon="fa fa-calendar"
                clear-button-icon="fa fa-times"
                input-class="bg-white"
              />
            </div>
          </b-form-group>
        </b-col>

        <b-col class="col-lg-2 col-md-3 col-12">
          <b-form-group :label="$t('to')" for="date">
            <div class="d-flex align-items-center">
              <datepicker
                id="to_data"
                v-model="filter.end_date"
                :bootstrap-styling="true"
                :clear-button="false"
                :language="ru"
                :calendar-button="true"
                format="dd.MM.yyyy"
                calendar-button-icon="fa fa-calendar"
                clear-button-icon="fa fa-times"
                input-class="bg-white"
              />
            </div>
          </b-form-group>
        </b-col>

        <b-col class="col-lg-3 col-md-3 co-12">
          <b-button variant="success" class="mt-1" @click="searchFilter">{{
            $t("search2")
          }}</b-button>
          <b-button variant="danger" class="mt-1 mx-1" @click="clear">
            {{ $t("clear") }}
          </b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-row class="">
      <b-col class="col-lg-12 col-md-12 col-12">
        <b-card>
          <IEcharts
            :option="option"
            ref="gauge"
            :resizable="true"
            class="echarts"
          />
        </b-card>
      </b-col>

      <b-col class="col-lg-6 col-md-12 col-12">
        <b-card :title="$t('report.operators_work')">
          <IEcharts
            :option="optionLine"
            ref="gauge"
            :resizable="true"
            class="echarts"
          />
        </b-card>
      </b-col>

      <b-col class="col-lg-6 col-md-12 col-12">
        <b-card :title="$t('report.work_of_operators')">
          <IEcharts
            :option="optionPie"
            ref="gauge"
            :resizable="true"
            class="echarts"
          />
        </b-card>
      </b-col>
      <b-col class="col-md-12">
        <collapse :filters="filter" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import IEcharts from "vue-echarts-v3/src/full";
import { BCard, BRow, BCol, BButton, BFormGroup } from "bootstrap-vue";
import { ru } from "vuejs-datepicker/dist/locale";
import Datepicker from "vuejs-datepicker";
import collapse from "./components/collapse";
// import moment from "moment";

export default {
  name: "index",
  components: {
    IEcharts,
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BButton,
    Datepicker,
    collapse,
  },
  data() {
    return {
      ru: ru,
      filter: {
        start_date: null,
        end_date: null,
      },
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        legend: {
          top: 0,
        },
        series: [
          {
            name: "Все звонки",
            type: "bar",
            barWidth: "20%",
            data: [],
            color: ["#748EDE"],
          },
          {
            name: "Обработанные звонки",
            type: "bar",
            barWidth: "20%",
            data: [],
            color: ["#91CC75"],
          },
          {
            name: "Не обработанные звонки",
            type: "bar",
            barWidth: "20%",
            data: [],
            color: ["#EA5455"],
          },
        ],
      },

      optionLine: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          top: 0,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        color: ["#748EDE"],
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: [],
        },
        series: [
          {
            name: new Date().getFullYear(),
            type: "bar",
            data: [],
          },
        ],
      },

      optionPie: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          top: 10,
          left: "center",
          data: [],
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["FETCH_REPORT_OPERATORS_BY_CALLS"]),
    searchFilter() {
      if (this.filter.start_date) {
        // this.filter.start_date = moment(this.filter.start_date).format(
          // "YYYY-MM-DD"
        // );
      }

      if (this.filter.end_date) {
        // this.filter.end_date = moment(this.filter.end_date).format(
          // "YYYY-MM-DD"
        // );
      }
      this.refresh();
    },
    clear() {
      this.filter.start_date = null;
      this.filter.end_date = null;
      this.refresh();
    },
    async refresh() {
      await this.FETCH_REPORT_OPERATORS_BY_CALLS(this.filter);
      const { data1, data2, data3 } = this.getReportOperatorsByCalls;

      // option
      this.option.xAxis[0].data = data1.values;
      this.option.series[0].data = data1.series1;
      this.option.series[1].data = data1.series2;
      this.option.series[2].data = data1.series3;

      // optionLine
      this.optionLine.yAxis.data = data2.name;
      this.optionLine.series[0].data = data2.value;

      // optionPie
      this.optionPie.legend.data = data2.name;
      this.optionPie.series[0].data = data3;
    },
  },
  computed: {
    ...mapGetters(["getReportOperatorsByCalls"]),
  },
  mounted() {
    this.refresh();
  },
};
</script>

<style lang="scss" scoped>
*{
  box-sizing: border-box;
}
.main{
  background-color: rgb(229,229,229);
}
.echarts {
  min-height: 500px;
}
.card1{
  // margin-bottom: 20px;
}
</style>
