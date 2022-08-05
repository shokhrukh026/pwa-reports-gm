import {
  getReportAllCalls,
  getReportIncident,
  getReportOperatorsByCalls,
  getReportByTasks,
  reportRecurseCollapseData,
  reportOperatorsTalkTime,
  getExcelReportByTasks,
  getExcelReportByProducts,
  getReportByTasksTable,
  getReportExcelByTasksTable,
  getReportExcelByCalls,
} from '@/api/report'

export default {
  state: {
    all_calls: {
      data1: [],
      data2: []
    },
    incident: {},
    operators_by_calls: {
      data3: [],
      data2: {
        value:[0]
      },
      data4: []
    },
    report_by_tasks: {},
    reportRecurseCollapseData: [],
    reportOperatorTalkTime: {
      data1: {
        value: []
      },
      data2: [],
      data3: [],
    },
    report_by_tasks_table: {
      data: []
    }
  },
  getters: {
    getReportAllCalls(state) {
      return state.all_calls
    },
    getReportIncident(state) {
      return state.incident
    },
    getReportOperatorsByCalls(state) {
      return state.operators_by_calls
    },
    getReportByTasks(state) {
      return state.report_by_tasks
    },
    getRecurseCollapseData(state) {
      return state.reportRecurseCollapseData
    },
    getReportOperatorTalkTime(state) {
      return state.reportOperatorTalkTime
    },
    getReportByTasksTable(state) {
      return state.report_by_tasks_table
    }
  },
  mutations: {
    SET_REPORT_ALL_CALLS(state, data) {
      state.all_calls = data
    },
    SET_REPORT_INCIDENT(state, data) {
      state.incident = data
    },
    SET_REPORT_OPERATORS_BY_CALLS(state, data) {
      state.operators_by_calls = data
    },
    SET_REPORT_BY_TASKS(state, data) {
      state.report_by_tasks = data
    },
    SET_REPORT_RECURSE_COLLAPSE_DATA(state, data) {
      state.reportRecurseCollapseData = data
    },
    SET_REPORT_OPERATORS_TALK_TIME(state, data) {
      state.reportOperatorTalkTime = data
    },
    SET_REPORT_BY_TASKS_TABLE(state, data) {
      state.report_by_tasks_table = data
    }
  },
  actions: {
    FETCH_REPORT_ALL_CALLS({
      commit
    }, params) {
      return getReportAllCalls(params).then(res => {
        commit('SET_REPORT_ALL_CALLS', res.data)
      })
    },
    FETCH_REPORT_INCIDENT({
      commit
    }, params) {
      return getReportIncident(params).then(res => {
        commit('SET_REPORT_INCIDENT', res.data)
      })
    },
    FETCH_REPORT_OPERATORS_BY_CALLS({
      commit
    }, params) {
      return getReportOperatorsByCalls(params).then(res => {
        commit('SET_REPORT_OPERATORS_BY_CALLS', res.data)
      })
    },
    FETCH_REPORT_BY_TASKS({
      commit
    }, params) {
      return getReportByTasks(params).then(res => {
        commit('SET_REPORT_BY_TASKS', res.data)
      })
    },
    FETCH_REPORT_RECURSE_COLLAPSE_DATA({
      commit
    }, params) {
      return reportRecurseCollapseData(params)
        .then(res => {
          commit('SET_REPORT_RECURSE_COLLAPSE_DATA', res.data)
        })
  
    },
    FETCH_REPORT_OPERATORS_TALK_TIME({
      commit
    }, params) {
      return reportOperatorsTalkTime(params).then(res => {
        commit('SET_REPORT_OPERATORS_TALK_TIME', res.data)
      })
    },
    FETCH_EXCEL_REPORT_BY_TASKS({
      commit
    }, params) {
      return getExcelReportByTasks(params)
    },
  
    FETCH_EXCEL_REPORT_BY_PRODUCTS({
      commit
    }, params) {
      return getExcelReportByProducts(params)
    },
  
    FETCH_REPORT_BY_TASKS_TABLE({
      commit
    }, params) {
      return getReportByTasksTable(params).then(res => {
        commit('SET_REPORT_BY_TASKS_TABLE', res.data)
      })
    },
    FETCH_REPORT_EXCEL_BY_TASKS_TABLE(_, params) {
      return getReportExcelByTasksTable(params)
    },
    FETCH_REPORT_EXCEL_BY_CALLS(_, params) {
      return getReportExcelByCalls(params)
    },
  
  },
  
}





