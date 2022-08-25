import Vue from 'vue'
import axios from 'axios'
// import configs from '../../axios.config'

let baseURL

  // baseURL= 'http://dicore.uz:5005/api/v3';
  // baseURL= "http://192.168.80.155:7002/api/v3";
  // baseURL = "http://192.168.28.80:8004/api/v3";
  // baseURL= 'http://192.168.31.19:8001/api/v3';
  baseURL= 'http://172.16.80.40:82/api/v3';

const axiosIns = axios.create({
  baseURL: baseURL,
  timeout: 20000,
})

Vue.prototype.$http = axiosIns

export default axiosIns
