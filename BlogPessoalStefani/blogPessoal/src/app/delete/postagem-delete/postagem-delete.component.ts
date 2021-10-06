import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { postagem } from 'src/app/model/postagem';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: postagem = new postagem()
  idPoster: number



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,

  ) { }

  ngOnInit() {
    window.scroll (0,0)
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
    this.idPoster = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPoster)

  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: postagem) =>{
      this.postagem = resp
    })
  }
  apagar(){
    this.postagemService.deletePostagem(this.idPoster).subscribe(() =>{
      alert('Postagem apagada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }


}
