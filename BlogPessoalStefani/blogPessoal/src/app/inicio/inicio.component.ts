import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { TemaService } from 'src/service/tema.service';
import { postagem } from '../model/postagem';
import { tema } from '../model/tema';
import { user } from '../model/user';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: postagem = new postagem()
  listaPostagens: postagem[]

  tema: tema = new tema()

  listaTemas: tema[]
  idTema: number

  user: user = new user()
  idUser = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      this.router.navigate(['/entrar'])

    }
    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: tema[]) =>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: tema) =>{
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: postagem[]) =>{
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: user) =>{
      this.user = resp
    })
  }

  publicar(){
      this.tema.id = this.idTema
      this.postagem.tema = this.tema

      this.user.id = this.idUser
      this.postagem.usuario = this.user

      this.postagemService.postPostagem(this.postagem).subscribe((resp: postagem) =>{
        this.postagem = resp
        alert('Postagem realizada com sucesso!')
        this.postagem = new postagem()
        this.getAllPostagens()
      })
  }

}
