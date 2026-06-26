import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  titulo: string

  @Column({ nullable: true })
  descripcion: string

  @Column({ default: false })
  completado: boolean

  @CreateDateColumn()
  fechaCreacion: Date

  @Column({ nullable: true })
  archivoAdjunto: string
}