<template>
  <div class="p-4 bg-light h-100vh">
    <b-card>
      <b-row class="align-items-center mb-1">
        <b-col class="col-lg-2 col-md-3 col-12">
          <b-form-group :label="$t('from')" for="start_date">
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
          <b-form-group :label="$t('to')" for="end_date">
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

        <b-col class="col-lg-3 col-md-3 col-12">
          <b-button class="mt-1" variant="success" @click="searchFilter">
            {{ $t("search2") }}
          </b-button>

          <b-button class="mt-1 ml-1" variant="danger" @click="clear">
            {{ $t("clear") }}
          </b-button>
        </b-col>
      </b-row>
    </b-card>

    <b-row>
      <b-col class="col-md-6">
        <b-card>
          <div
            v-if="getReportOperatorTalkTime.data1.value.some((el) => el > 0)"
          >
            <IEcharts
              v-if="chart"
              :option="optionBar"
              :resizable="true"
              class="echarts"
            />
          </div>
          <p class="no__data text-center" v-else>{{ $t("empty_text") }}</p>
        </b-card>
      </b-col>

      <b-col class="col-md-6">
        <b-card>
          <div v-if="getReportOperatorTalkTime.data2.length">
            <IEcharts
              v-if="chart"
              :option="optionPie"
              :resizable="true"
              class="echarts"
            />
          </div>
          <p class="no__data text-center" v-else>{{ $t("empty_text") }}</p>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="col-md-12">
        <b-card>
          <vue-good-table
            class="table-hover mt-1"
            :columns="columns"
            :rows="getReportOperatorTalkTime.data3"
            style-class="slots_text_align vgt-table bordered"
            :search-options="{
              enabled: true,
              externalQuery: searchTerm,
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
            <div slot="emptystate" class="text-center">
              {{ $t("empty_text") }}
            </div>

            <template
              slot="table-column"
              slot-scope="props"
              class="align-middle"
            >
              <span>
                {{ $t(props.column.i18n) || props.column.label }}
              </span>
            </template>

            <template slot="table-row" slot-scope="props" class="align-middle">
              <span v-if="props.column.field === 'percent_time'">
                {{ props.row.percent_time }} %
              </span>
            </template>
          </vue-good-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCard, BCol, BRow, BFormGroup, BButton } from "bootstrap-vue";
import IEcharts from "vue-echarts-v3/src/full";
import { VueGoodTable } from "vue-good-table";
import flatPickr from "vue-flatpickr-component";
import { mapActions, mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
import { ru } from "vuejs-datepicker/dist/locale";
// import moment from "moment";

export default {
  name: "Index",
  components: {
    BCard,
    BRow,
    BCol,
    IEcharts,
    VueGoodTable,
    flatPickr,
    BFormGroup,
    BButton,
    Datepicker,
  },
  data() {
    return {
      ru: ru,
      filter: {
        start_date: null,
        end_date: null,
      },

      searchTerm: "",

      optionBar: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
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
            name: "2011",
            type: "bar",
            data: [],
            color: ["#748EDE"],
          },
        ],
      },

      optionPie: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
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

      columns: [
        {
          label: "Ф.И.О.",
          i18n: "report.fio",
          field: "name",
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Количество входящих звонков",
          i18n: "report.number_of_incoming",
          field: "total_calls",
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Время проведенное в разговоре",
          i18n: "report.time_spend",
          field: "total_time",
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Среднее время звонка",
          i18n: "report.average_call_time",
          field: "avg_time",
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: "Процент",
          i18n: "report.percent",
          field: "percent_time",
          sortable: false,
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],

      chart: true,
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    ...mapActions(["FETCH_REPORT_OPERATORS_TALK_TIME"]),
    clear() {
      this.filter.end_date = null;
      this.filter.start_date = null;
      this.refresh(this.filter);
    },

    refresh() {
      this.FETCH_REPORT_OPERATORS_TALK_TIME(this.filter).then(() => {
        this.optionBar.yAxis.data = this.getReportOperatorTalkTime.data1.name;
        this.optionBar.series[0].data =
          this.getReportOperatorTalkTime.data1.value;

        this.optionPie.legend.data = this.getReportOperatorTalkTime.data2;
        this.optionPie.series[0].data = this.getReportOperatorTalkTime.data2;
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
      this.FETCH_REPORT_OPERATORS_TALK_TIME(this.filter).then(() => {
        this.chart = true;
      });
    },
  },
  computed: {
    ...mapGetters(["getReportOperatorTalkTime"]),
  },
};
</script>

<style lang="scss">
// @import "@core/scss/vue/libs/vue-good-table.scss";
// @import "@core/scss/vue/libs/vue-flatpicker.scss";

.echarts {
  min-height: 500px;
}

.no__data {
  border: 1px dashed #ccc;
  padding: 50px;
  margin-top: 5px;
  border-radius: 5px;
  text-align: center;
}
</style>
