import { z } from 'zod'

export const formSchema = z.object({
    nombre: z.string().min(1, 'El nombre es requerido'),
    codigoBarras: z.string().min(1, 'El código de barras es requerido'),
    descripcion: z.string(),
    imagen: z.string().min(1, 'URL de imagen inválida'),
    costo: z.preprocess((val) => Number(val), z.number().min(0)),
    utilidad: z.preprocess((val) => Number(val), z.number().min(0)),
    precio: z.number().min(0),
    descuentoBase: z.preprocess((val) => Number(val), z.number().min(0)),
    impuesto: z.preprocess((val) => Number(val), z.number().min(0)),
    estadoProducto: z.number().int().min(0).max(1, 'El estado del producto es requerido'),
    stockMinimo: z.preprocess((val) => Number(val), z.number().min(0)),
})