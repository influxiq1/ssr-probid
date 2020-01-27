import { ElementRef, EventEmitter, Injectable, Input, ViewChild } from '@angular/core';
import { switchMap, map, takeWhile } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// for setting observables to get serverurl and endpointurl from app
import { Observable, Subject, Subscription } from 'rxjs';
import{CookieService} from 'ngx-cookie-service';
import {environment } from '../environments/environment';
import { Router } from '@angular/router';


@Injectable({   
  providedIn: 'root'
})
export class ApiService {

  public serverUrlDemo =  environment["API_URL"];
  public nodesslurl =  environment["nodesslurl"];
  public uploadurl =  environment["uploadurl"];
  public base64encode =  environment["base64encode"];
  public uploadsslurl: any= environment["download_url"];
  public inventory_url: string ;
  // = environment["inventory_url"] + environment["inventory_url_api"];
  public inventory_auto_complete_url: string;
  //  = environment["inventory__auto_completeurl"] + environment["inventory_url_api"];
  public share_link : string = environment["share_link"];
  public Meta_image_url : string = environment["Meta_image_url"];

  public fileimgsslurl: any;


  fileservername: any = [];
  serverUrl: any;
  addendpointUrl: any;
  uploadEndpointUrl:any; //souresh
  updateendpointUrl: any;
  deletesingle_endpointUrl: any;
  updatestatus_single_endpointUrl: any;
  deletemultiple_endpointUrl: any;
  updatestatus_multiple_endpointUrl: any;
  getdata_endpointUrl: any;
  public invalidApi:any;
  // private subjectForServerUrl = new Subject<any>();
  // private subjectForaddEndpointUrl = new Subject<any>();
  // private subjectForuploadEndpointUrl = new Subject<any>();  //added by souresh
  // private subjectForupdateEndpointUrl = new Subject<any>();
  // private subjectFordeletesingleEndpointUrl = new Subject<any>();
  // private subjectForupdatestatusSingleEndpointUrl = new Subject<any>();
  // private subjectForGetdataEndpointUrl = new Subject<any>();
  // public subscriptionServer: Subscription;
  // public subscriptionaddEndpoint: Subscription;
  // public subscriptionuploadEndpoint: Subscription;   //added by souresh
  // public subscriptionupdateEndpoint: Subscription;
  // public subscriptiondeletesingleEndpoint: Subscription;
  // public subscriptionupdatestatusSingleEndpoint: Subscription;
  // public subscriptionGetdataEndpoint: Subscription;
  public tokenVal: any;
  constructor(private _http: HttpClient, private cookieService :CookieService) {

    let data={
      source:'search_api_key'
    }
    this._http.post(this.serverUrlDemo + "datalistwithouttoken",data).subscribe((res:any)=>{
      // console.log(res);
      if (res.res[0]!=null && res.res[0]!=undefined && res.res[0]!='' && res.res[0].apikey!=null) {
        
      this.inventory_url = environment["inventory_url"] + res.res[0].apikey;
      this.inventory_auto_complete_url = environment["inventory__auto_completeurl"] + res.res[0].apikey
      // console.log(this.inventory_url);

      this.invalidApi=res.res[0].apikey;

    }

    });
    
  }



  isTokenExpired() {}
  /* read site setting data */
  public getSiteSettingData(url): Observable<any> {
    return this._http.get(url);
  }

//http by data and endpoint
postDatawithoutToken(endpoint:any, data:any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.cookieService.get('jwtToken') 
    })
  };
  // console.log('endpoint');
  // console.log(endpoint);
  var result = this._http.post(this.serverUrlDemo+endpoint, JSON.stringify(data), httpOptions).pipe(map(res => res));
  return result;
}


  addData(requestdata: any) {
    // console.log('in adddata apiservice');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('jwtToken')          //hard code written access-token(temp)
      })
    };

    // console.log('httpoptions',httpOptions,this.serverUrl,requestdata);
    var result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }

/*************** Added by himadri start here ***************/ 


getDataForDatalist(endpoint: any) {

  const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': this.cookieService.get('jwtToken')
      })
  };

  // this.isTokenExpired()
  var result = this._http.post(this.serverUrlDemo + 'datalist', endpoint, httpOptions).pipe(map(res => res));

  return result;
}
// getData end
/*************** Added by himadri using for datalist start here ***************/ 

getDatalist(requestdata: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.cookieService.get('jwtToken')
    })
  };
  var result = this._http.post(this.serverUrlDemo + requestdata.endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
  return result;


}
getDatalistWithToken(requestdata: any, endpoint: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    var result = this._http.post(this.serverUrlDemo + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
}
getTempToken() {
  var result = this._http.get(this.serverUrlDemo + 'gettemptoken').pipe(map(res => res));
  return result;
}
/*************** Added by himadri end here ***************/ 

getDatalistForResolve(requestdata: any) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.cookieService.get('jwtToken')
    })
  };
  // console.log(requestdata)
  
  var result = this._http.post(this.serverUrlDemo + requestdata.endpoint, JSON.stringify(requestdata.requestcondition), httpOptions).pipe(map(res => res));
  return result;


}




  addLogin(requestdata: any) {
    // console.log('in addLogin apiservice');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': this.cookieService.get('jwtToken')          //hard code written access-token(temp)
      })
    };

    // console.log(this.serverUrl,requestdata);
    var result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }
  /*************** Added by himadri end here ***************/ 

/*************** Added by himadri start here ***************/ 
forgetPassword(requestdata: any) {
  // console.log('in forgetPassword apiservice');
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': this.cookieService.get('jwtToken')          //hard code written access-token(temp)
    })
  };

  // console.log(this.serverUrl,requestdata);
  var result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
  return result;
}
/*************** Added by himadri end here ***************/ 


  deleteSingleData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('jwtToken')
      })
    };
    var result = this._http.post(this.serverUrlDemo + this.deletesingle_endpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }

  deleteMultipleData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('jwtToken')
      })
    };
    var result = this._http.post(this.serverUrl + this.deletesingle_endpointUrl+'many', JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }

  UpdateStatusForSingleData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('jwtToken')
      })
    };
    var result = this._http.post(this.serverUrl + this.updatestatus_single_endpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }

  UpdateStatusForMultipleData(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('jwtToken')
      })
    };
    var result = this._http.post(this.serverUrl + this.updatestatus_single_endpointUrl+'many', JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }
  CustomRequest(requestdata: any, endpoint:any ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('jwtToken')
      })
    };
    var result = this._http.post(this.serverUrlDemo + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }

  gettemptoken(){
    var result = this._http.get(this.serverUrlDemo + 'gettemptoken').pipe(map(res=>res));
    return result;
  }


  getJsonObject(path:any){
    var result = this._http.get(path).pipe(map(res => res));
    return result;
}

/**add postData */
postdata(requestdata: any) {
  // console.log('post Data');
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': this.cookieService.get('jwtToken')          //hard code written access-token(temp)
    })
  };

  // console.log(this.serverUrl,requestdata);
  var result = this._http.post(this.serverUrl + this.addendpointUrl, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
  return result;
}

  /**add addDataWithoutToken amitava 04-12-2019 */
  addDataWithoutToken(requestdata: any, endpoint:any ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('jwtToken')
      })
    };
    var result = this._http.post(this.serverUrlDemo + endpoint, JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }

  deleteSingleData1(requestdata: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get('jwtToken')
      })
    };
    var result = this._http.post(this.serverUrlDemo + 'deletesingledata', JSON.stringify(requestdata), httpOptions).pipe(map(res => res));
    return result;
  }


  // getDataForEndpoint(endpoint: any) {

  //   const httpOptions = {
  //       headers: new HttpHeaders({
  //           'Content-Type':  'application/json'
  //       })
  //   };
  
  //   // this.isTokenExpired()
  //   var result = this._http.post(this.serverUrlDemo + endpoint, httpOptions).pipe(map(res => res));
  
  //   return result;
  // }


 


}



















