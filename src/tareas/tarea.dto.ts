import { IsString, IsBoolean, IsOptional, MinLength, MaxLength, Matches } from 'class-validator'

export class CreateTareaDto {
  @IsString()
  @MinLength(3, { message: 'El titulo debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El titulo no puede superar 50 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+$/, { message: 'El titulo solo puede contener letras, números y espacios' })
  titulo: string

  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'La descripcion no puede superar 100 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 .,;:!?()-]+$/, { message: 'La descripcion contiene caracteres no permitidos' })
  descripcion: string

  @IsBoolean()
  @IsOptional()
  completado: boolean
}

export class UpdateTareaDto {
  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'El titulo debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El titulo no puede superar 50 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+$/, { message: 'El titulo solo puede contener letras, números y espacios' })
  titulo: string

  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'La descripcion no puede superar 100 caracteres' })
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 .,;:!?()-]+$/, { message: 'La descripcion contiene caracteres no permitidos' })
  descripcion: string

  @IsBoolean()
  @IsOptional()
  completado: boolean
}