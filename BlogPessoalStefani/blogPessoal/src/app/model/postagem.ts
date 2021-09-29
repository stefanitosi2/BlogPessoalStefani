import { tema } from "./tema"
import { user } from "./user"


export class postagem{
  public id: number
  public titulo: string
  public texto: string
  public date: Date
  public usuario: user
  public tema: tema
}
