import { Component } from '@angular/core';

@Component({
    selector: 'tested',
    templateUrl: 'Prueba.html'
})

export class test{

    public title: string
    public coment: string
    public year: Number
    public show_movie: boolean

    constructor(){
        this.title = "Hola este un title"
        this.coment = "Este es un comentario en prueba"
        this.year = 2020
        this.show_movie = true  
        console.log("Tested of component")
    }

    hide_show(){
        if(this.show_movie)
            this.show_movie = false
        else
            this.show_movie = true
    }

}