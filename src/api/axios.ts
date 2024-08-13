import axios, {
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const instanse = axios.create({
  baseURL: 'http://localhost:4000',
});

const getRequest = (
  pathParamWithPath: string,
  data: Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> =>
  instanse.get(pathParamWithPath, {
    params: data,
    ...config,
  });

const postRequest = (
  pathParamWithPath: string,
  data: Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> =>
  instanse.get(pathParamWithPath, {
    params: data,
    ...config,
  });

const putRequest = (
  pathParamWithPath: string,
  data: Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> =>
  instanse.get(pathParamWithPath, {
    params: data,
    ...config,
  });

const patchRequest = (
  pathParamWithPath: string,
  data: Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> =>
  instanse.get(pathParamWithPath, {
    params: data,
    ...config,
  });

const deleteRequest = (
  pathParamWithPath: string,
  data: Record<string, unknown> = {},
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> =>
  instanse.get(pathParamWithPath, {
    params: data,
    ...config,
  });

export const Axios = {
  getRequest,
  postRequest,
  putRequest,
  patchRequest,
  deleteRequest,
};
