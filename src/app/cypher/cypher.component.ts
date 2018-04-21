import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cypher',
  templateUrl: './cypher.component.html',
  styleUrls: ['./cypher.component.css']
})
export class CypherComponent implements OnInit {

 plainText : string = "";
 cipherText : string = "";
 key : string = "";
 
    constructor() {
        // this.key = CypherComponent.formatText(this.key)
    }

  ngOnInit() {
  }
 
   encriptar(){
     //this.cipherText = this.encrypt2(this.plainText,this.key);
     this.cipherText= this.doCrypt(false);
   }

 
   desencriptar(){
     this.cipherText = this.doCrypt(true);
   }


  doCrypt(isDecrypt):string{
  
    var key = this.filterKey(this.key);
    
    if (isDecrypt) {
      for (var i = 0; i < key.length; i++)
        key[i] = (26 - key[i]) % 26;
	  }

    return this.crypt(this.plainText, key);
}

  crypt(input:string, key:any):string {
    var output = "";
    for (var i = 0, j = 0; i < input.length; i++) {
      var c = input.charCodeAt(i);
      if (this.isUppercase(c)) {
        output += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
        j++;
      } else if (this.isLowercase(c)) {
        output += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
        j++;
      } else {
        output += input.charAt(i);
      }
    }
    return output;
  }

  filterKey(key):any {
    var result = [];
    for (var i = 0; i < key.length; i++) {
      var c = key.charCodeAt(i);
      if (this.isLetter(c))
        result.push((c - 65) % 32);
    }
    return result;
  }

  isLetter(c):boolean {
	  return this.isUppercase(c) || this.isLowercase(c);
  }

  isUppercase(c):boolean {
	  return 65 <= c && c <= 90;  // 65 is character code for 'A'. 90 is 'Z'.
  }

   isLowercase(c):boolean{
  	return 97 <= c && c <= 122;  // 97 is character code for 'a'. 122 is 'z'.
}

}



 
