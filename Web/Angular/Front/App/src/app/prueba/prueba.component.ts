import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit, DoCheck {

  public title_new: String;

  constructor() {
    console.log("Launcher of Constructor")  
    this.title_new = "Test of documentation"
  }

  ngOnInit(){
    console.log("Launcher of component begining")
  }

  ngDoCheck(){
    console.log("DOCHECK Ready")
  }

  ngOnDestroy(){
    console.log("The component has been eliminated")
  }

  changeTitle(){
    this.title_new = "Title changed"
  } 

}
