import {catchError, Observable} from "rxjs";

export class ProviderBase {

  public static readonly APP_ID = '31b1715eea27e8546c5192709d456eb7';

  protected handleError(caught: Observable<any>) {
    return catchError((error: any): Observable<boolean> => {
      throw new Error(error)
      return caught;
    });
  }
}
