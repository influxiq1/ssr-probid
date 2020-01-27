import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule  }   from '@angular/forms'

import { FacebookModule } from 'ngx-facebook';


import {DemoMaterialModule} from "../material-module";
// import { DragScrollModule } from 'ngx-drag-scroll';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './component/frontend/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';
import { ApiService } from './api.service';
// import { TestimonialModule } from 'testimonial';
import {ListingModule} from 'listing-angular7';

import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MatCarouselModule } from '@ngmodule/material-carousel';

// import { LoginModule } from 'login';
// import { ServicelibModule } from 'servicelib';
// import { TestimonialModule } from 'testimonial';
// import { BlogModule } from 'blog';
// import { FileUploadModule } from 'file-upload';
// import { ContactusModule } from 'contactus';

// import { ServicelibModule } from 'service-lib-influxiq';
// import { TestimonialModule } from 'testimonial-lib-influxiq';
import { FileUploadModule } from 'file-upload-lib-influxiq';
import { LoginModule } from 'login-lib-influxiq';
// import { BlogModule } from 'blog-lib-influxiq';
// import { NewsTitleModule } from 'news-title-lib-influxiq';
import { ContactusModule } from 'contactus-lib-influxiq';
// import { SharetoolsModule } from 'sharetools';
// import { ImageCropperModule } from 'ngx-image-cropper';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import { TimepickerModule } from 'ngx-bootstrap/timepicker';
// import { ModalModule } from 'ngx-bootstrap/modal';
// import { TrainingModule } from './training/training.module';

// import { NgxUploaderModule } from 'ngx-uploader';
// import { CarouselModule } from 'ngx-bootstrap/carousel';
// import { CKEditorModule } from 'ngx-ckeditor';
// import { ClipboardModule } from 'ngx-clipboard';
import { OwlModule } from 'ngx-owl-carousel'; 

import { BloglistfrontendComponent, CommonVideoModalComponent, comingSoonDialogBlog} from './component/frontend/bloglist/bloglist.component';

/**Frontend Component**/

import { HeaderComponent, comingSoonDialog, googlemapDialog } from './layout/header/header.component';
import { FooterComponent, DialogTermsDialog, DialogPrivacyDialog, NewslatterDialogComponent, NewslattersuccessDialogComponent } from './layout/footer/footer.component';
import { HomeComponent, loginDialog,errorSearchModal,comingSoonDialogBloghome } from './component/frontend/home/home.component';
import { ContactusComponent } from './component/frontend/contactus/contactus.component';
import { ForgetPasswordComponent } from './component/frontend/forget-password/forget-password.component';
import { ResetPasswordComponent } from './component/frontend/reset-password/reset-password.component';
import { SignUpComponent } from './component/frontend/sign-up/sign-up.component';
import { ServicelistComponent } from './component/frontend/servicelist/servicelist.component';
import { TesimoniallistComponent, comingSoonDialogTestimonhome } from './component/frontend/tesimoniallist/tesimoniallist.component';

import { BlogdetailComponent, VideoModalComponent, comingSoonDialogBlogDetail} from './component/frontend/blogdetail/blogdetail.component';

import { AdvanceInventorySearchComponent } from './component/frontend/inventory/advance-inventory-search/advance-inventory-search.component';
import { BasicInventorySearchComponent, errorDialog, loginBeforeDialog } from './component/frontend/inventory/basic-inventory-search/basic-inventory-search.component';

import { PreOwnedComponent } from './component/frontend/pre-owned/pre-owned.component';
import { AboutusComponent } from './component/frontend/aboutus/aboutus.component';
import { BlogCategoryComponent } from './component/frontend/blog-category/blog-category.component';

import { SalesrepSignupComponent, salesSignUpModalComponent } from './component/frontend/salesrep-signup/salesrep-signup.component';
import { CustomerSignupComponent, customerSignUpsuccessDialog } from './component/frontend/customer-signup/customer-signup.component';

import { SearchListViewComponent } from './component/frontend/search-list-view/search-list-view.component';
import { RsvpSuccessComponent } from './component/frontend/rsvp-success/rsvp-success.component';


/**End Frontend Component**/


/**Backend Component**/
import { SidenavService } from './../app/services/sidenav.service';
import { SaveSearchComponent, RemoveModalComponent } from './component/backend/inventory/save-search/save-search.component';
import { DashboardComponent, RemoveRSvpModalComponent } from './component/backend/dashboard/dashboard.component';
import { BkHeaderComponent } from './layout/bk-header/bk-header.component';
import { BkFooterComponent } from './layout/bk-footer/bk-footer.component';

import { AddeditServiceComponent } from './component/backend/ServiceApp/addedit-service/addedit-service.component';
import { ListingServiceComponent } from './component/backend/ServiceApp/listing-service/listing-service.component';
import { ListingTestimonialComponent } from './component/backend/TestimonialApp/listing-testimonial/listing-testimonial.component';
import { AddeditTestimonialComponent } from './component/backend/TestimonialApp/addedit-testimonial/addedit-testimonial.component';
// import { ServicelibModule } from 'servicelib';
// import { FileUploadModule } from 'dist/file-upload';
import { BkLeftdivComponent } from './layout/bk-leftdiv/bk-leftdiv.component';
import { MaindashboardComponent, DeleteModalRsvpComponent } from './component/backend/maindashboard/maindashboard.component';
import { UserManagementComponent } from './component/backend/user-management/user-management.component';
import { RepdashboardComponent, RemoveDialogComponent } from './component/backend/repdashboard/repdashboard.component';



import { BlogManagementComponent } from './component/backend/blog-management/blog-management.component';
import { CommissionReportComponent } from './component/backend/commission-report/commission-report.component';
import { InventorySearchComponent } from './component/backend/inventory-search/inventory-search.component';
import { ManageAvailabilityComponent } from './component/backend/manage-availability/manage-availability.component';
import { TestimonialListsAdminComponent } from './component/backend/testimonial-lists-admin/testimonial-lists-admin.component';
import { BirddogListComponent } from './component/backend/birddog-list/birddog-list.component';
import { CommissionListComponent } from './component/backend/commission-list/commission-list.component';
import { CustomerListComponent } from './component/backend/customer-list/customer-list.component';
import { ManageCommissionComponent } from './component/backend/manage-commission/manage-commission.component';
import { NewsletterlistsComponent } from './component/backend/newsletterlists/newsletterlists.component';
import { SalesReportComponent } from './component/backend/sales-report/sales-report.component';
import { SalesreplistsComponent } from './component/backend/salesreplists/salesreplists.component';
import { RsvplistsComponent, DeleteModalComponent, askForconfirmationModalComponent } from './component/backend/rsvplists/rsvplists.component';
import { ManageTrainingComponent } from './component/backend/manage-training/manage-training.component';

import { ManageLessonsComponent } from './component/backend/manage-lessons/manage-lessons.component';
import { TrainingCenterComponent } from './component/backend/training-center/training-center.component';
import { TrainingReportComponent } from './component/backend/training-report/training-report.component';
import { MyAppointmentComponent } from './component/backend/my-appointment/my-appointment.component';
import { CreateNewInventoryComponent } from './component/backend/create-new-inventory/create-new-inventory.component';
import { JobTicketComponent, DeleteJobModalComponent } from './component/backend/job-ticket/job-ticket.component';
import { SocialAdvoComponent } from './component/backend/social-advo/social-advo.component';
import { BookAnAppointmentComponent } from './component/backend/book-an-appointment/book-an-appointment.component';
import { AdvanceInventorySearchBackendComponent } from './component/backend/inventory/advance-inventory-search-backend/advance-inventory-search-backend.component';
import { BasicInventorySearchBackendComponent } from './component/backend/inventory/basic-inventory-search-backend/basic-inventory-search-backend.component';
import { MysalesrepComponent, RemoveSalesRepRSvpModalComponent } from './component/backend/mysalesrep/mysalesrep.component';
import { CommunicationComponent } from './component/backend/communication/communication.component';
import { AddAdminCategoriesComponent } from './component/backend/add-admin-categories/add-admin-categories.component';
import { AdminManageCategoriesComponent, DialogModalOpenDialog } from './component/backend/admin-manage-categories/admin-manage-categories.component';
import { AdminAddCategoriesComponent } from './component/backend/admin-add-categories/admin-add-categories.component';




import { AddEditBlogcatComponent } from './component/backend/blogs/add-edit-blogcat/add-edit-blogcat.component';
import { ListingBlogcatComponent } from './component/backend/blogs/listing-blogcat/listing-blogcat.component';
import { AddEditBlogsComponent } from './component/backend/blogs/add-edit-blogs/add-edit-blogs.component';
import { ListingBlogsComponent } from './component/backend/blogs/listing-blogs/listing-blogs.component';
import { MyAccountComponent } from './component/backend/my-account/my-account.component';
import { AddSalesrepComponent } from './component/backend/add-salesrep/add-salesrep.component';
import { AddCustomerComponent } from './component/backend/add-customer/add-customer.component';
import { AddBirddogComponent } from './component/backend/add-birddog/add-birddog.component';





import { AddEditNewsletterComponent } from './component/backend/newsletterlists/add-edit-newsletter/add-edit-newsletter.component';
 
import { AddEditSubscriberComponent } from './component/backend/newsletterlists/add-edit-subscriber/add-edit-subscriber.component';
import { AddEditSubscriberGroupComponent } from './component/backend/newsletterlists/add-edit-subscriber-group/add-edit-subscriber-group.component';
 
 import { AddEditTestemailComponent } from './component/backend/newsletterlists/add-edit-testemail/add-edit-testemail.component';

 import { AddEditSenderappComponent } from './component/backend/newsletterlists/add-edit-senderapp/add-edit-senderapp.component';
 

import { ListingNewsletterComponent } from './component/backend/newsletterlists/listing-newsletter/listing-newsletter.component';

import { LisitngTestemailappComponent } from './component/backend/newsletterlists/lisitng-testemailapp/lisitng-testemailapp.component';
import { ListingSenderappComponent } from './component/backend/newsletterlists/listing-senderapp/listing-senderapp.component';
import { ListingSubscriptionComponent } from './component/backend/newsletterlists/listing-subscription/listing-subscription.component';
import { ListingSubcategoryComponent } from './component/backend/newsletterlists/listing-subcategory/listing-subcategory.component';
import { AskForConfirmationComponent } from './component/backend/ask-for-confirmation/ask-for-confirmation.component';

import { MetaModule, MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ViewJobTicketComponent } from './component/backend/view-job-ticket/view-job-ticket.component';
import { InventoryDetailComponent, RemoveRsvpComponent } from './component/backend/inventory-detail/inventory-detail.component';
import { ManageJobticketComponent, ViewImageComponent } from './component/backend/manage-jobticket/manage-jobticket.component';
import { ApiManagerComponent, ApiModalComponent } from './component/backend/api-manager/api-manager.component';
import { HttpLoaderComponent } from './http-loader/http-loader.component';
import { LoaderInterceptor } from './loader.interceptor';
import { HttpLoaderService } from './http-loader.service';


//****** for video Modal*********//


export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: '',
    defaults: {
      title: '',
      description: '',
      'og:image': '',
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:locale:alternate': 'en_US,nl_NL,tr_TR'
    }
  });
}
export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
// export class I18nModule {
//   constructor(translate: TranslateService) {
//     translate.addLangs(['en', 'ru']);
//     const browserLang = translate.getBrowserLang();
//     translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
//   }
// }


@NgModule({
  declarations: [
    BloglistfrontendComponent,
    AppComponent,
    LoginComponent,
    ContactusComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    SignUpComponent,
    DashboardComponent,
    HeaderComponent,
    comingSoonDialog,
    comingSoonDialogBlog,    
    comingSoonDialogBloghome,
    googlemapDialog,
    customerSignUpsuccessDialog,
    FooterComponent,
    DialogPrivacyDialog,
    DialogTermsDialog,
    HomeComponent,
    BkHeaderComponent,
    BkFooterComponent,
    AddeditServiceComponent,
    ListingServiceComponent,
    ListingTestimonialComponent,
    AddeditTestimonialComponent,
    BkLeftdivComponent,
    MaindashboardComponent,
    ServicelistComponent,
    TesimoniallistComponent,
    BlogdetailComponent,
    UserManagementComponent,
    BasicInventorySearchComponent,
    AdvanceInventorySearchComponent,
    PreOwnedComponent,
    AboutusComponent,
    RepdashboardComponent,
    BlogManagementComponent,
    CommissionReportComponent,
    InventorySearchComponent,
    ManageAvailabilityComponent,
    TestimonialListsAdminComponent,
    BirddogListComponent,
    CommissionListComponent,
    CustomerListComponent,
    ManageCommissionComponent,
    NewsletterlistsComponent,
    SalesReportComponent,
    SalesreplistsComponent,
    RsvplistsComponent,
    ManageTrainingComponent,
    SearchListViewComponent,
    ManageLessonsComponent,
    TrainingCenterComponent,
    TrainingReportComponent,
    MyAppointmentComponent,
    CreateNewInventoryComponent,
    JobTicketComponent,
    SocialAdvoComponent,
    BookAnAppointmentComponent,
    AdvanceInventorySearchBackendComponent,
    BasicInventorySearchBackendComponent,
    MysalesrepComponent,
    CommunicationComponent,
    AdminManageCategoriesComponent,
    AddAdminCategoriesComponent,
    DialogModalOpenDialog,
    AdminAddCategoriesComponent,
    BlogCategoryComponent,
    AddEditBlogcatComponent,
    ListingBlogcatComponent,
    AddEditBlogsComponent,
    ListingBlogsComponent,
    MyAccountComponent,
    SalesrepSignupComponent,
    CustomerSignupComponent,
    AddSalesrepComponent,
    CommonVideoModalComponent,
    VideoModalComponent,
    AddCustomerComponent,
    AddBirddogComponent,
    DeleteModalComponent,
    NewslatterDialogComponent,
    NewslattersuccessDialogComponent,
    RemoveSalesRepRSvpModalComponent,
    errorDialog,
    loginBeforeDialog,
    DeleteModalRsvpComponent,
    loginDialog,
    errorSearchModal,
    DeleteJobModalComponent,
    comingSoonDialogBlogDetail,
    AddEditNewsletterComponent,
    AddEditSubscriberComponent,
    AddEditSubscriberGroupComponent,
    AddEditTestemailComponent,
    AddEditSenderappComponent,
    ListingNewsletterComponent,
    LisitngTestemailappComponent,
    ListingSenderappComponent,
    ListingSubscriptionComponent,
    ListingSubcategoryComponent,
    SaveSearchComponent,
    InventoryDetailComponent,
    RemoveModalComponent,
    RemoveRsvpComponent,
    RemoveDialogComponent,
    // errorDialogbackend,
    RemoveRSvpModalComponent,
    salesSignUpModalComponent,
    askForconfirmationModalComponent,
    AskForConfirmationComponent,
    RsvpSuccessComponent,
    ViewJobTicketComponent,
    ManageJobticketComponent,
    ViewImageComponent,
    ApiManagerComponent,
    HttpLoaderComponent,
    ApiModalComponent,    
    comingSoonDialogTestimonhome,
  ],
  imports: [
    TranslateModule.forRoot(
      {
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      }
    }
    ),
    MetaModule.forRoot(
      {
      provide: MetaLoader,
      useFactory: (metaFactory),
      // deps: [TranslateService]
    }
    ),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    // MetaModule.forRoot(),
    FacebookModule.forRoot(),
    // NewsTitleModule,
    // TrainingModule,
    // BlogModule,
    FileUploadModule,
    // NgxUploaderModule,
    AngularFontAwesomeModule,
    MatCarouselModule.forRoot(),
    // DragScrollModule,
    DemoMaterialModule,
    CommonModule,
    
    HttpClientModule,
    LoginModule,
    // TestimonialModule,
    // ServicelibModule,
    ContactusModule,
    ListingModule,
    MatIconModule,
    // ImageCropperModule,
    //  CarouselModule.forRoot(),
    // CKEditorModule,
    // ClipboardModule,
    // BsDatepickerModule.forRoot(),
    // TimepickerModule.forRoot(),
    // ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    OwlModule,
    // SharetoolsModule
  ],
  exports: [TranslateModule],
  entryComponents: [CommonVideoModalComponent,VideoModalComponent, comingSoonDialog, customerSignUpsuccessDialog,DialogPrivacyDialog, DialogTermsDialog, DialogModalOpenDialog, NewslatterDialogComponent, NewslattersuccessDialogComponent,errorDialog,loginBeforeDialog,DeleteModalComponent,DeleteModalRsvpComponent,RemoveModalComponent,RemoveRsvpComponent,RemoveDialogComponent,RemoveModalComponent,RemoveRSvpModalComponent, salesSignUpModalComponent, askForconfirmationModalComponent, RemoveSalesRepRSvpModalComponent,loginDialog,errorSearchModal,DeleteJobModalComponent,ViewImageComponent, googlemapDialog,comingSoonDialogBlog,comingSoonDialogBloghome,ApiModalComponent,comingSoonDialogBlogDetail,comingSoonDialogTestimonhome],
  
  providers: [CookieService, AuthGuard, ApiService, SidenavService, HttpLoaderService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
  // errorDialogbackend
})
export class AppModule {
  constructor(public http: HttpClient, matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
 }
