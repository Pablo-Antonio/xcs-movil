import { AbstractControl} from '@angular/forms';

export class Validators{
    
    static user(control: AbstractControl){
        if(control.value != null){
            const value: string = control.value;
            if(value.match(/^[0-9a-zñ.]{5,64}$/)){
                return null;
            }
        } 
        return {Correo: false}
    }

    static pass(control: AbstractControl){
        if(control.value != null){
            const value: string = control.value;
            if(value.match(/^.{5,64}$/)){
                return null;
            }
        } 
        return {Correo: false}
    }
    
    static fullName(control: AbstractControl){
        if(control.value != null){
            const value: string = control.value;
            if(value.match(/^(?=.{10,128}$)([A-ZÁÉÍÓÚ][a-zñáéíóú]{2,} )+([A-ZÁÉÍÓÚ][a-zñáéíóú]{2,})$/)){
                return null;
            }
        } 
        return {Correo: false}
    }
    
    static phoneNumber(control: AbstractControl){
        if(control.value != null){
            const value: string = String(control.value);
            if(value.match(/^[0-9]{10}$/)){
                return null;
            }
        } 
        return {Correo: false}
    }
    
    static email(control: AbstractControl){
        if(control.value != null){
            const value: string = control.value;
            if(value.match(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)){
                return null;
            }
        } 
        return {Correo: false}
    }
    
    static require(control: AbstractControl){
        if(control.value != null){
            const value: string = String(control.value);
            if(value.match(/^.{1,}$/)){
                return null;
            }
        } 
        return {Correo: false}
    }
}
