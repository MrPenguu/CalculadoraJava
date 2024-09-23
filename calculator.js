class Calculator{
    constructor(operand1Element, operand2Element){
        this.operand1Element = operand1Element,
        this.operand2Element = operand2Element;
        this.clear();
    }

    clear(){ //inicializar valores//
        this.operand1= 0;  //primer numero//
        this.operand2= 0;   //2donumero//
        this.operator=''; //la operacion//
        this.updateUI();
    }

    updateUI(){ //actualiza las operaciones//
        this.operand1Element.innerHTML=  this.operand1 +  this.operator; //agregar la visualizaciond el operador junto al primer numero//
        this.operand2Element.innerHTML=  this.operand2;
    }

    //para los numeros xdddd//
    appendNumber(number){

        if(number=== "."&&this.operand2.includes('.')) return; //Si ya ay un punto hacer un return (esto evita poner mas puntos)//

        this.operand2= this.operand2===0
                        ? number    //Si es igual a 0 poner el number//
                        : this.operand2.toString() + number; //Si no, agregar los numeros sin el 0 inicial//
        this.updateUI(); //actualizar//
    }

    //funcion flecha retroceso//
    delete(){
        if (this.operand2===0)return;  //Si es igual a 0 dejarlo pos igual//
        this.operand2= +this.operand2.toString().slice(0, -1); //tomar operando 2 y tomarlo como string luego slice para borrar la posicion. Ubicar un + para volverlo numero otra vez//
        
        this.updateUI();  //actualizar//
     
    }
    //funcion para las operaciones//
    operation(operator){

        if(this.operator){   //si ya existe un operador entonces  calcular y  despues hacer lo demás//
            this.calc()
        }

        this.operator= operator; //guardar operador que se pulsa//
        this.operand1= +this.operand2 === 0 ? this.operand1 : this.operand2; //si el operando 2 vale 0 que no lo haga pero si vale 0 entonces el operando 1 es igual a l operando 1 //
        this.operand2=  0; //el operador 1 pasaa a verse arriba mientras que el dos se pone en 0 para escribirlo//
     
        this.updateUI();  //actualizar//
    }
    //funcion para los calculos//
    calc(){
        switch(this.operator){   //switch para distinguir entre operadores//
            case "+":
                this.operand1= +this.operand1 + +this.operand2; //parsear//
            break;

            case "-":
                this.operand1= +this.operand1 - +this.operand2;
            break;

            case "*":
                this.operand1= +this.operand1 * +this.operand2;
            break;

            case "/":
                this.operand1= +this.operand1 / +this.operand2; 
            break;
        }
        this.operator= ""; //convertir nuevamente el operador en vacion para poder volver a llenar//
        this.operand2= 0;

        this.updateUI();  //actualizar//
    }

}

//   VARIABLES//
//crear 2 variables de los dos elementos//
const operand1Element= document.querySelector("[data-operand-1]")
const operand2Element= document.querySelector("[data-operand-2]")
//botton clear//
const clearButton= document.querySelector("[data-clear]")
//selecciona todos//
const numberButtons= document.querySelectorAll("[data-number]")
//variable para delete//
const deleteButton = document.querySelector("[data-delete]")
//variable para operaciones bototnes//
const operationButtons= document.querySelectorAll("[data-operation]")
//variable para botton igual//
const equalsButton = document.querySelector("[data-equals]")



//inicializar la clase calculadora y pasasr los 2 elementos//
const calculadora =new Calculator(operand1Element, operand2Element);

//botton clear, cuando hacer click ejecutar funcion//
clearButton.addEventListener('click',()=>{
    calculadora.clear();
});
//Botones numeros y se le asigna el valor que esta en el html//
numberButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculadora.appendNumber(button.innerHTML);  //parsar operacion//
    });
});

deleteButton.addEventListener('click',()=>{
     calculadora.delete();
});

//crear for each para recorrer todos los botones de openaciones//
operationButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculadora.operation(button.innerHTML); //parsar operacion//
    });
});

equalsButton.addEventListener('click',()=>{
    calculadora.calc();
});