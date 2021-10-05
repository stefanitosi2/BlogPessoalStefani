import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { TemaService } from 'src/service/tema.service';
import { tema } from '../model/tema';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: tema= new tema()
  listaTema: tema[]

  constructor(
    private router: Router,
    private temaService: TemaService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/entrar'])

    }
    this.findAllTemas()
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: tema[]) =>{
      this.listaTema = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: tema)=>{
      this.tema = resp
      alert('Tema cadastrado com sucesso!!')
      this.findAllTemas()
      this.tema = new tema()
    })
  }

}
