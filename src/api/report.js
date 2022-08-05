import http from '@/libs/axios'

export function getReportAllCalls(params) {
  return http.get('/service-desk/report/all_calls/', {
    params
  })
}

export function getReportIncident(params) {
  return http.get('/service-desk/report/incident/', {
    params
  })
}

export function getReportOperatorsByCalls(params) {
  return http.get('/service-desk/report/operators_by_calls/', {
    params
  })
}

export function getReportByTasks(params) {
  return http.get('/service-desk/report/by_tasks/', {
    params
  })
}
export function reportRecurseCollapseData(params) {
  return http.get('/service-desk/report/by_products/', {
    params
  })
}
export function reportOperatorsTalkTime(params) {
  return http.get('/service-desk/report/by_time_calls/', {
    params
  })
}

export function getExcelReportByTasks(params) {
  return http.get('/service-desk/report/by_tasks/', {
    responseType: 'blob',
    params,
  })
}

export function getExcelReportByProducts(params) {
  return http.get('/service-desk/report/by_products/', {
    responseType: 'blob',
    params,
  })
}

export function getReportByTasksTable(params) {
  return http.get('/service-desk/report/by_tasks_3/', {
    params,
  })
}


export function getReportExcelByTasksTable(params) {
  return http.get('/service-desk/report/by_tasks_3/', {
    responseType: 'blob',
    params,
  })
}

export function getReportExcelByCalls(params) {
  return http.get('service-desk/report/excel_by_calls', {
    responseType: "blob",
    params
  })
}