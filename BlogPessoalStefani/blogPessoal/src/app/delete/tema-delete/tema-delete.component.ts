import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tema } from 'src/app/model/tema';
import { environment } from 'src/environments/environment.prod';
import { TemaService } from 'src/service/tema.service';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: tema = new tema()
  idTema: number

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])

    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id: number){
    this.temaService.getByIdTema(id).subscribe((resp: tema) =>{
      this.tema = resp
    })

  }

  apagar(){
    this.temaService.deletetema(this.idTema).subscribe(()=>{
      alert('Tema apagado com sucesso!')
      this.router.navigate(['/tema'])
    })
  }

}
