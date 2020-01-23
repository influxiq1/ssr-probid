import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CookieService } from 'ngx-cookie-service';
export interface EndpointComponent {
    endpoint: string;
}
@Injectable({
    providedIn: 'root'
})
export class ResolveService implements Resolve<any> {
    public userid: any;
    public userCookies: any;
    constructor(private _apiService: ApiService, public cookieservice: CookieService , public activedrouter:ActivatedRoute, public router:Router) {
        if (this.cookieservice.get('user_details') != undefined && this.cookieservice.get('user_details') != null && this.cookieservice.get('user_details') != '') {
            this.userCookies = JSON.parse(this.cookieservice.get('user_details'));
            this.userid = this.userCookies._id;
            // console.log('>>>>',this.userid)
            }
        // if (this.cookieservice.get('userid') != null)
        //     this.userid = this.cookieservice.get('userid');
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        let _id = route.params['id'];
        // if (route.data.requestcondition.condition._id == 'id') {
        //     route.data.requestcondition.condition._id = _id;
        //     delete route.data.requestcondition.condition.id;
        //     console.log(route.data.requestcondition.condition)
        // }
        var endpoint = route.data.link;
        var source = route.data.source;
        var condition = route.data.condition;
        var requestData: any = route.data.requestcondition;
            requestData.condition = Object.assign(requestData.condition, route.params);
            if(this.cookieservice.get('user_details') !='' && this.cookieservice.get('user_details') !=null){
                this.userCookies = JSON.parse(this.cookieservice.get('user_details'));
                this.userid = this.userCookies._id;
                // console.log('>>>>',this.userCookies)
              }
            for(let d in requestData.condition){
                if(requestData.condition[d]=='user_id' ){
                  requestData.condition[d]=this.userid;
                //   console.log('route.data');
                }
                if (requestData.condition[d] == 'for-rep') {
                    requestData.id = this.userid;
                }
                if (requestData.condition[d] == 'customer-dashboard') {
                    console.log(requestData.condition[d])
                    requestData.id = this.userid;
                    requestData.salesrep = this.userCookies.salesrep;
                    delete requestData.condition.castomer;
                }
                if (requestData.condition[d] == 'rsvp_id') {
                    requestData.rsvp_id = requestData.condition._id;
                    // requestData.ticket_id=requestData._id
                    // requestData.ticket_id=

                    console.log(">>>", requestData)

                   delete requestData.condition.rsvp_id
                   delete requestData.condition._id
                   delete requestData.condition.status
               }

               if (requestData.condition[d] == 'ticket_added_by_object') {
                requestData.condition[d] = this.userid
               
           }


               if (requestData.condition[d] == 'mysalesrep') {
                requestData.id = this.userCookies.salesrep
                requestData.customer_id=this.userCookies._id

            //    delete requestData.condition.rsvp_id
               delete requestData.condition._id
               delete requestData.condition.mysalesrep
           }
              }
            // delete route.data.requestcondition.condition.id;
            // console.log(route.data)
            // console.log(route.params['_id_object'])
            // if(route.url[0].path == 'blogdetail') {
                // console.log(route.data.requestcondition.condition)
            //     // route.data.requestcondition.condition._id_object = route.params['id'] ;
            //     // delete route.data.requestcondition.condition.id
            // }
            // if(route.url[0].path == 'inventory-detail') {
            //     route.data.requestcondition.condition._id_object = route.params['id'] ;
            //     delete route.data.requestcondition.condition.id ;
            // }
            // if(route.url[0].path == 'rsvp-detail') {
            //     route.data.requestcondition.condition._id_object = route.params['id'] ;
            //     delete route.data.requestcondition.condition.id ;
            // }
            // if(route.url[0].path == 'rsvp-final') {
            //     route.data.requestcondition.condition._id = route.params['id'] ;
            //     delete route.data.requestcondition.condition.id ;
            // }
            // if(route.url[0].path == 'rsvp-salesrep') {
            //     route.data.requestcondition.condition.added_by_object = this.userid ;
            // }
            // if(route.url[0].path == 'rsvp-customer') {
            //     route.data.requestcondition.condition.added_for_object = this.userid ;
            // }
            // if (route.url[0].path == 'save-search-admin' || route.url[0].path == 'save-search-castomer' || route.url[0].path == 'save-search-rep') {
            //     route.data.requestcondition.condition.added_by = this.userid ;
            // }
            // if(route.url[0].path == 'rep-dashboard') {
            //     route.data.requestcondition.id = this.userid ;
            // }
            // if(route.url[0].path == 'customer-dashboard') {
            //     route.data.requestcondition.id = this.userid ;
            //     route.data.requestcondition.salesrep = this.userCookies.salesrep;
            // }
            return new Promise((resolve) => {
                // console.log('route.data',route.data, this.userid);
                this._apiService.getDatalistForResolve(route.data).subscribe(api_object =>{
                    if (api_object) {
                        //console.log(api_object);
                        return resolve(api_object);
                    } else { // id not found
                        this.router.navigateByUrl('/home');
                        return true;
                    }
                })
            });
            // }
        //old code
        /*var result = new Promise((resolve) => {this._http.post(this.commonservices.nodesslurl+'datalist?token='+this.cookie.get('jwttoken'),
            {source:source,condition:condition}/!*JSON.stringify(data)*!/).pipe(map(res => res));
        return result;*/
        // return new Promise((resolve) => { this._apiService.postData(endpoint,source,condition).subscribe(api_object => {
        //     if (api_object) {
        //         return resolve(api_object);
        //     } else { // id not found
        //       //  this.router.navigateByUrl('dashboard');
        //         return true;
        //     }
        // });
        // });
    }
}