
import { apiServer } from "./config";
import Cookies from 'js-cookie'
import { userStore } from "./UserStore";


export async function readStreamBody(stream: ReadableStream<Uint8Array>): Promise<string> {
    const reader = stream.getReader();
    let result = "";
    let decoder = new TextDecoder();
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }
  
    return result;
  }

export class BackendRequestBuilder{
  private method: string
  private isJSON: boolean
  private endpoint: string | undefined
  private body: BodyInit | undefined
  private headers: Headers | undefined


  constructor(){
    this.method = 'GET'
    this.isJSON = false
  }

  public setMethod(method: string): BackendRequestBuilder {
    this.method = method
    return this
  }

  public isSendingJSON(sending: boolean){
    this.isJSON = sending
    return this
  }

  public setEndpoint(endpoint: string): BackendRequestBuilder{
    this.endpoint = endpoint
    return this
  }

  public setBody(body: BodyInit): BackendRequestBuilder{
    this.body = body
    return this
  }

  public sendAuthenticatedRequest(): Promise<Response> | string{
    const csrfToken = Cookies.get("csrf_token")
    if (csrfToken === undefined){
      // remove user cache if it's present cause its no longer valid
      userStore.getState().delete()
      return "Not authorized."
    }
    if (this.headers === undefined){
      this.headers = new Headers()
    }
    if (this.isJSON != undefined &&  this.isJSON){
      this.headers.append("Content-Type", "application/json")
    }
    this.headers.append("X-CSRF-Token", csrfToken)
    let req: RequestInit = {
      mode: "cors", // This forces the fetch request to include the ORIGIN header which is necessary for CORS
      method: this.method,
      body: this.body,
      headers: this.headers,
      credentials: "include" //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
    }
    return fetch(apiServer + this.endpoint, req)
  }

  public sendUnAuthenticatedRequest(): Promise<Response>{
    let req: RequestInit = {
      mode: 'cors',
      method: "GET",
    }
    return fetch(apiServer + this.endpoint, req)
  }

}


export function localStorageOrDefault<DefaultValue>(key: string, defaultValue: DefaultValue | undefined): DefaultValue | undefined{
    let local = localStorage.getItem(key)
    if (local == null && defaultValue === undefined){
        return undefined
    }
    if (local == null){
        localStorage.setItem(key, JSON.stringify(defaultValue))
        return defaultValue
    }
    return JSON.parse(local)
}
