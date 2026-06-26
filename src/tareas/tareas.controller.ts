// tareas.controller.ts — agrega ParseIntPipe a todos los @Param('id')
import { Controller, Get, Post, Put, Delete, Param, Body,
         UploadedFile, UseInterceptors, ParseIntPipe } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { TareasService } from './tareas.service'
import { CreateTareaDto, UpdateTareaDto } from './tarea.dto'

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  crear(@Body() dto: CreateTareaDto) {
    return this.tareasService.crear(dto)
  }

  @Get()
  listar() {
    return this.tareasService.listar()
  }

  @Get(':id')
  obtener(@Param('id', ParseIntPipe) id: number) {
    return this.tareasService.obtener(id)
  }

  @Put(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTareaDto) {
    return this.tareasService.actualizar(id, dto)
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.tareasService.eliminar(id)
  }

  @Post(':id/archivo')
  @UseInterceptors(FileInterceptor('archivo', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, unique + extname(file.originalname))
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowed = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx']
      const ext = extname(file.originalname).toLowerCase()
      if (allowed.includes(ext)) {
        cb(null, true)
      } else {
        cb(new Error('Tipo de archivo no permitido'), false)
      }
    }
  }))
  subirArchivo(@Param('id', ParseIntPipe) id: number, @UploadedFile() archivo: Express.Multer.File) {
    return this.tareasService.agregarArchivo(id, archivo.filename)
  }
}