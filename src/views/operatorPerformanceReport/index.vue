<template>
  <div>
    <b-card :title="$t('report.operator_performance_report')">
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

    <b-row class="mt-3">
      <b-col class="col-lg-6 col-md-12 col-12">
        <b-card>
          <IEcharts
            v-if="chart"
            :option="option"
            ref="gauge"
            :resizable="true"
            class="echarts"
          />
        </b-card>
      </b-col>

      <b-col class="col-lg-6 col-md-12 col-12">
        <b-card>
          <IEcharts
            :option="optionPIE"
            ref="gauge"
            :resizable="true"
            class="echarts"
          />
        </b-card>
      </b-col>
    </b-row>

    <div class="text-center mb-1 font-weight-bolder">
      {{ $t("report.total_count_calls") }} : {{ getReportAllCalls.count }}
    </div>
    <div class="text-center mb-1">
      <span>
        {{ $t("report.incoming_calls_count") }} :
        {{ getReportAllCalls.incoming_calls_count }}</span
      >
    </div>
    <div class="text-center mb-1">
      <span>
        {{ $t("report.missed_calls_count") }} :
        {{ getReportAllCalls.missed_calls_count }}</span
      >
    </div>

    <b-card>
      <div class="d-flex justify-content-end mb-1">
        <download-excel
          :fields="json_fields"
          :data="getReportAllCalls.data2 || []"
          worksheet="My Worksheet"
          :name="`Отчет_по_работе_операторов_${getDate}.xls`"
        >
          <b-button variant="success"> Export .xls</b-button>
        </download-excel>
      </div>

      <vue-good-table
        class="table-hover mt-1"
        :columns="columns"
        :rows="getReportAllCalls.data2"
        style-class="slots_text_align vgt-table bordered"
        :search-options="{
          enabled: false,
        }"
        :select-options="{
          enabled: false,
          selectOnCheckboxOnly: false,
          selectionInfoClass: 'custom-class',
          selectionText: 'rows selected',
          clearSelectionText: 'clear',
          disableSelectInfo: true,
          selectAllByGroup: true,
        }"
        :pagination-options="{
          enabled: false,
        }"
        :sort-options="{
          enabled: true,
        }"
      >
        <div slot="emptystate" class="text-center">{{ $t("empty_text") }}</div>

        <template slot="table-column" slot-scope="props" class="align-middle">
          <span>
            {{ $t(props.column.i18n) || props.column.label }}
          </span>
        </template>

        <template slot="table-row" slot-scope="props" class="align-middle">
          <span v-if="props.column.field === 'percent'">
            {{ props.row.percent }}%
          </span>
        </template>
      </vue-good-table>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import flatPickr from "vue-flatpickr-component";
import IEcharts from "vue-echarts-v3/src/full";
import JsonExcel from "vue-json-excel";
import { VueGoodTable } from "vue-good-table";
import {
  BCard,
  BFormGroup,
  BRow,
  BCol,
  BForm,
  BFormInput,
  BInputGroup,
  BButton,
} from "bootstrap-vue";
import Datepicker from "vuejs-datepicker";
import { ru } from "vuejs-datepicker/dist/locale";
// import moment from "moment";

export default {
  name: "index",
  components: {
    BButton,
    BCard,
    BForm,
    IEcharts,
    BRow,
    BCol,
    flatPickr,
    BFormGroup,
    BFormInput,
    BInputGroup,
    VueGoodTable,
    Datepicker,
    downloadExcel: JsonExcel,
  },
  data() {
    return {
      ru: ru,
      filter: {
        end_date: null,
        start_date: null,
      },
      dateDefault: null,
      dateDefault2: null,
      json_fields: {
        ОПЕРАТОР: "name",
        "ОБРАБОТАННЫЕ ЗВОНКИ": "value",
        "ПРОСЕНТНОЕ СООТНОШЕНИЕ": {
          field: "percent",
          callback: (value) => {
            return value + "%";
          },
        },
      },
      columns: [
        {
          label: "ОПЕРАТОР",
          i18n: "report.Operator",
          field: "name",
          sortable: false,
        },
        {
          label: "ОБРАБОТАННЫЕ ЗВОНКИ",
          i18n: "report.processed_calls",
          field: "value",
          sortable: false,
        },
        {
          label: "ПРОСЕНТНОЕ СООТНОШЕНИЕ",
          i18n: "report.procent_ratio",
          field: "percent",
          sortable: false,
        },
      ],

      option: {
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
        color: ["#748EDE", "#EA5455", "#91CC75"],
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
      optionPIE: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          top: 0,
          right: 0,
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
      chart: true,
    };
  },
  methods: {
    ...mapActions(["FETCH_REPORT_ALL_CALLS"]),
    clear() {
      this.filter.start_date = null;
      this.filter.end_date = null;
      this.refresh();
    },

    refresh() {
      this.chart = false;
      this.FETCH_REPORT_ALL_CALLS(this.filter).then(() => {
        const { data1, data2 } = this.getReportAllCalls;

        // option
        this.option.yAxis.data = data1.name;
        this.option.series[0].data = data1.value;

        // optionPIE
        this.optionPIE.legend.data = data1.name;
        this.optionPIE.series[0].data = data2;
        this.chart = true;
      });
    },

    searchFilter() {
      this.chart = false;
      if (this.filter.start_date) {
        // this.filter.start_date = moment(this.filter.start_date).format(
        //   "YYYY-MM-DD"
        // );
      }

      if (this.filter.end_date) {
        // this.filter.end_date = moment(this.filter.end_date).format(
        //   "YYYY-MM-DD"
        // );
      }
      this.refresh();
    },
  },

  computed: {
    ...mapGetters(["getReportAllCalls"]),
    getDate() {
      const date = new Date();
      return (
        date.getDate() + "_" + date.getMonth() + 1 + "_" + date.getFullYear()
      );
    },
  },
  async mounted() {
    this.refresh();
  },
};
</script>

<style lang="scss" scoped>
// @import "@core/scss/vue/libs/vue-flatpicker.scss";

.echarts {
  min-height: 500px;
}

.collapse-title {
  margin-left: 22px;
}

.collapse-icon [aria-expanded="false"]:after {
  transform: rotate(-91deg);
}
</style>
