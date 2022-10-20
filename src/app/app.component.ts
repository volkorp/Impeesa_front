import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ApiService } from './api.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Api';
  password: string = "";
  
  activateLogin: boolean = false;
  
  lulzCount: number = 0;
  inputVal: number = 0;  

  Buho: number = 57;
  Fenix: number = 58;
  Lagarto: number = 55;
  Lobo: number = 56;

  apiResponse : any = [];

  dropDownOptions: any = [];
  selectedDropdown: string = "";

  isFirstPlace1: boolean = false;
  isFirstPlace2: boolean = false;
  isFirstPlace3: boolean = true;
  isFirstPlace4: boolean = false;
  
  constructor(private primengConfig: PrimeNGConfig, private apiService: ApiService) {
    this.dropDownOptions = [
      {name: "Búho", code: "Buho"},
      {name: "Fénix", code: "Fenix"},
      {name: "Lagarto", code: "Lagarto"},
      {name: "Lobo", code: "Lobo"}
    ];
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.loadComponents();
    this.doFirstPlace();
  }

  loadComponents() {
    return this.apiService.getPoints().subscribe((data: {}) => {
      this.apiResponse = data;
      console.log(this.apiResponse);
      if (this.apiResponse){
        this.Buho = this.apiResponse[0].Puntos
        this.Fenix = this.apiResponse[1].Puntos
        this.Lagarto = this.apiResponse[2].Puntos
        this.Lobo = this.apiResponse[3].Puntos
      }
      
      this.doFirstPlace();
    })    
  }

  doAceptar(){    
    console.log(this.selectedDropdown);
    console.log(this.inputVal);

    //http-PUT
    //Switch y actualizar el valor que toque depende del resultado
    // this.doFirstPlace();
  }

  doCancelar(){
    console.log("Cancelado!");
    this.inputVal = 0;
  }

  doLulz(){    
    if (this.lulzCount >= 7) {
      this.activateLogin = true;
    }else{
      this.lulzCount += 1;
    }  
  }

  doLogin(){
    var password = 'Basic ' + btoa(this.password);

    this.apiService.login('scouter', password).subscribe((data: {}) => {
      this.apiResponse = data;
      
      if (typeof(data) != undefined){
        localStorage.setItem ('token', this.apiResponse.token);
      } else {
        localStorage.removeItem('token');
      }
    });
  }

  doFirstPlace() {
    var list = [{name: "Buho", value: this.Buho}, {name: "Fenix", value: this.Fenix}, {name: "Lagarto", value: this.Lagarto}, {name: "Lobo", value: this.Lobo}]
    var max = 0;
    var maxCard = "";

    list.forEach( (item) => {
      if (item.value > max) {
        max = item.value;
        maxCard = item.name;
      }
    });

    switch (maxCard) {
      case "Buho":
        this.isFirstPlace1 = true;
        this.isFirstPlace2 = false;
        this.isFirstPlace3 = false;
        this.isFirstPlace4 = false;
      break;
      case "Fenix":
        this.isFirstPlace1 = false;
        this.isFirstPlace2 = true;
        this.isFirstPlace3 = false;
        this.isFirstPlace4 = false;
      break;
      case "Lagarto":
        this.isFirstPlace1 = false;
        this.isFirstPlace2 = false;
        this.isFirstPlace3 = true;
        this.isFirstPlace4 = false;
      break;
      case "Lobo":
        this.isFirstPlace1 = false;
        this.isFirstPlace2 = false;
        this.isFirstPlace3 = false;
        this.isFirstPlace4 = true;
      break;
      default:
        this.isFirstPlace1 = false;
        this.isFirstPlace2 = false;
        this.isFirstPlace3 = false;
        this.isFirstPlace4 = false;
      break;
    }
    console.log("Máximo: " + maxCard + " con " + max + " puntos.")
  }
}
