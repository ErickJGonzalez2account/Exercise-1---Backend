import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tarea } from './tarea.entity'
import { CreateTareaDto, UpdateTareaDto } from './tarea.dto'

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private tareasRepo: Repository<Tarea>,
  ) {}

  async crear(dto: CreateTareaDto): Promise<Tarea> {
    const tarea = this.tareasRepo.create({
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      completado: dto.completado ?? false,
    })
    return this.tareasRepo.save(tarea)
  }

  async listar(): Promise<Tarea[]> {
    return this.tareasRepo.find()
  }

  async obtener(id: number): Promise<Tarea> {
    const tarea = await this.tareasRepo.findOneBy({ id })
    if (!tarea) throw new NotFoundException('Tarea no encontrada')
    return tarea
  }

  async actualizar(id: number, dto: UpdateTareaDto): Promise<Tarea> {
    const tarea = await this.obtener(id)
    Object.assign(tarea, dto)
    return this.tareasRepo.save(tarea)
  }

  async eliminar(id: number): Promise<void> {
    const tarea = await this.obtener(id)
    await this.tareasRepo.remove(tarea)
  }

  async agregarArchivo(id: number, nombreArchivo: string): Promise<Tarea> {
    const tarea = await this.obtener(id)
    tarea.archivoAdjunto = nombreArchivo
    return this.tareasRepo.save(tarea)
  }
}