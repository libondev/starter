// https://www.npmjs.com/package/axios#request-config
import axios from 'axios';
import type { AxiosResponse, AxiosRequestConfig } from 'axios';

// https://next.attojs.com/guide/introduction.html
import {
  useRequest,
  // useLoadMore,
  usePagination,
  setGlobalOptions,
} from 'vue-request';

const request = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function installRequest() {
  setGlobalOptions({
    loadingDelay: 300,
    errorRetryCount: 3,
  });

  // instance.interceptors.request.use((config: AxiosRequestConfig) => { })
  request.interceptors.response.use((config: AxiosResponse) => config.data, Promise.reject);
}

/**
 * use request
 * @param requestUrl axios request url
 * @param requestConfig useRequest options
 * @returns request request response wrapped
 */
export function get<Data extends Record<string, any>>(
  requestUrl: string,
  requestConfig?: AxiosRequestConfig<Data>,
  requestOptions?: any,
) {
  return useRequest(request.get<Data>(requestUrl, requestConfig), requestOptions);
}

export function post<Data extends Record<string, any>>(
  requestUrl: string,
  requestParams?: AxiosRequestConfig,
  config?: AxiosRequestConfig<Data>,
  requestOptions?: any,
) {
  return useRequest(request.post<Data>(requestUrl, requestParams, config), requestOptions);
}

export function requestPage(requestConfig: AxiosRequestConfig) {
  return usePagination(request(requestConfig), {
    defaultParams: [
      {
        size: 15,
      },
    ],
    pagination: {
      currentKey: 'current',
      pageSizeKey: 'size',
      totalKey: 'data.total',
    },
  });
}

// export function requestMore(requestUrl: string, requestConfig?: AxiosRequestConfig) {
//   const response = async (d?: { page: number; total: number; list: any }) => {
//     const current = d?.page ? d.page + 1 : 1;

//     const data = await instance(requestUrl, {
//       ...requestConfig,
//       params: {
//         current,
//         size: 15,
//       },
//     });

//     return {
//       list: [],
//       page: 1,
//       total: 1,
//     };
//   };

//   return useLoadMore(response, {
//     isNoMore: ({ data, total }) => data.length >= total,
//   });
// }
