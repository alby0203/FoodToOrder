import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {


  goInsta(){
    (window as any).open("http://www.instagram.com/");
  }
  goFb(){
    (window as any).open("http://www.facebook.com/");
  }
  goTwitter(){
    (window as any).open("http://www.twitter.com/");
  }


}
