import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-ask-for-confirmation',
  templateUrl: './ask-for-confirmation.component.html',
  styleUrls: ['./ask-for-confirmation.component.css']
})
export class AskForConfirmationComponent implements OnInit {
public editorconfig: any = [];
public askForConfirmation: FormGroup;
  constructor(public fb:FormBuilder, private readonly meta: MetaService) {
    this.editorconfig.extraAllowedContent = '*[class](*),span;ul;li;table;td;style;*[id];*(*);*{*}';
    this.askForConfirmation = this.fb.group({
      topPart: [''],
      firstname:['', Validators.required]
    }) 

    this.meta.setTitle('ProBid Auto - Ask For Confirmation');
    this.meta.setTag('og:title', 'ProBid Auto - Ask For Confirmation');
    this.meta.setTag('twitter:title', 'ProBid Auto - Ask For Confirmation');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

  }

  ngOnInit() {
  }
    askForConfirmationSubmit(){
      for(let x in this.askForConfirmation.controls){
        this.askForConfirmation.contains[x].markAsTouched();
      }
      // console.log(this.askForConfirmation.value )
    }

    /**blur function */
    inputUntouched(val: any) {
      this.askForConfirmation.controls[val].markAsUntouched();
    }

}
