<template>
  <b-card>

    <div class="d-flex justify-content-end">
      <b-button @click="downloadExcel" variant="success" class="mb-4">Export .xls</b-button>
    </div>

    <b-row class="mb-1">

      <b-col class="col-md-3 text-center">
        <h5 class="mb-0">
          {{ $t('report.time') }}
        </h5>
      </b-col>

      <b-col class="col-md-3 text-center">
        <h5 class="mb-0">
          {{ $t('report.all_calls') }}
        </h5>
      </b-col>

      <b-col class="col-md-3 text-center">
        <h5 class="mb-0">
          {{ $t('report.missed_calls') }}
        </h5>
      </b-col>

      <b-col class="col-md-3 text-center">
        <h5 class="mb-0">
          {{ $t('report.lost_calls') }}
        </h5>
      </b-col>

      <div class="text-center w-100 mt-3 mb-0" v-if="(getReportOperatorsByCalls && getReportOperatorsByCalls.data4) ? !getReportOperatorsByCalls.data4.length : false">
        <p class="mb-0">
          {{ $t('empty_text') }}
        </p>
      </div>
    </b-row>


  





      <b-button block v-b-toggle="'accordion' + index" variant="light" class="bg-light-dark"
        v-for="(item, index) in (getReportOperatorsByCalls && getReportOperatorsByCalls.data4) ? getReportOperatorsByCalls.data4 : 0"
        :key="index">




        <b-row class="w-100">
          <b-col class="col-md-3 text-center">
            <h5 class="mb-0 ml-2">
              {{ item.time }}
            </h5>
          </b-col>

          <b-col class="col-md-3 text-center">
            <h5 class="mb-0">
              {{ item.all_calls }}
            </h5>
          </b-col>

          <b-col class="col-md-3 text-center">
            <h5 class="mb-0">
              {{ item.missed_calls }}
            </h5>
          </b-col>

          <b-col class="col-md-3 text-center">
            <h5 class="mb-0">
              {{ item.missed_in_percent }}%
            </h5>
          </b-col>
        </b-row>



        <b-collapse :id="'accordion' + index" accordion="my-accordion" role="tabpanel" >

          <vue-good-table
              class="table-hover mt-1"
              :columns="columns"
              :rows="item.items"
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
            <template slot="table-column" slot-scope="props" class="align-middle">
              <span>
                {{ $t(props.column.i18n) || props.column.label }}
              </span>
            </template>

            <template slot="table-row" slot-scope="props" class="align-middle">
              <span
                  v-if="props.column.field === 'on_percent'"
              >
                  {{ props.row.on_percent }}%
              </span>

            </template>
          </vue-good-table>
        </b-collapse>
       
      </b-button>
  




  </b-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { VueGoodTable } from 'vue-good-table'
import JsonExcel from 'vue-json-excel'

import {
  BButton,
  BFormCheckbox,
  BCard,
  BRow,
  BCol,
  BAvatar,
  BBadge,
  BCollapse
} from 'bootstrap-vue'
import moment from "moment";

export default {
  name: 'collapse',
  props: {
    filters: {
      type: Object,
    }
  },
  components: {
    BButton,
    BFormCheckbox,
    BCard,
    BRow,
    BCol,
    BBadge,
    BAvatar,
    VueGoodTable,
    BCollapse,
    downloadExcel: JsonExcel,
  },
  data() {
    return {
      searchTerm: '',
      json_fields: {
        'Оператор': 'name',
        'Все звонки': 'all_calls',
        'Процент': {
          field: 'on_percent',
          callback: (value) => {
            return value + '%'
          }
        }
      },
      columns: [
        {
          label: 'Оператор',
          i18n: 'report.Operator',
          field: 'name',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left'
        },
        {
          label: 'Все звонки',
          i18n: 'report.all_calls',
          field: 'all_calls',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left'
        },
        {
          label: 'Процент',
          i18n: 'report.percent',
          field: 'on_percent',
          sortable: false,
          thClass: 'text-left',
          tdClass: 'text-left'
        },
      ],
    }
  },
  methods: {
    ...mapActions(['FETCH_REPORT_EXCEL_BY_CALLS']),
    downloadExcel() {
      const filters = {}
      console.log(this.filters)
      if (this.filters.start_date) {
        filters.start_date = moment(this.filters.start_date).format(
          "YYYY-MM-DD"
        );
      }

      if (this.filters.end_date) {
        filters.end_date = moment(this.filters.end_date).format(
          "YYYY-MM-DD"
        );
      }
      this.FETCH_REPORT_EXCEL_BY_CALLS(filters)
          .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute(
                'download',
                'Отчет_о_работе_операторов.xls'
            )
            document.body.appendChild(link)
            link.click()
          })
    }
  },
  computed: {
    ...mapGetters(['getReportOperatorsByCalls'])
  }
}
</script>

<style lang="scss">
.bg-light-dark{
  background: #eef1f5;
}
</style>
