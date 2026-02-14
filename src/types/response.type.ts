export interface IApiResponse {
  success: boolean;
  message?: string;
  //eslint-disable-next-line
  data: any;
  error?: string;
}
