const Method = {
  GET: `GET`,
  DELTE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

interface ILoad {
  url: string,
  method?: string,
  body?: null,
  headers?: HeadersInit,
  mode?: RequestMode
};

class Api {
  private _endPoint: string;

  constructor(endPoint: string) {
    this._endPoint = endPoint;
  }

  getData(url: string) {
    return this._load({url})
      .then(Api.toJSON)
      .catch((err) => {
        throw console.log(err);
      });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers({"Accept": "application/json"}),
    mode = "cors"
  }: ILoad) {
    return fetch(`${this._endPoint}${url}`, {
      method,
      body,
      headers,
      mode
    })
      .then(Api.checkStatus)
      .catch((err) => {
        throw new Error();
      });
  }

  static checkStatus(response: { status: number; statusText: any; }) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response: any) {
    return response.json();
  }

  static catchError(err: any) {
    throw err;
  }
}

export default Api;