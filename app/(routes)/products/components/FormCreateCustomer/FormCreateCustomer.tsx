"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { FormCreateCustomerProps } from "./FormCreateCustomer.types"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { useCreateProductStore } from "@/app/store/storeProduct/createProductStore"

const formSchema = z.object({
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
});


export function FormCreateCustomer(props: FormCreateCustomerProps) {
    const { setOpenModalCreate } = props
    const [photoUploaded, setPhotoUploaded] = useState(false)
    const { addCustomer } = useCreateProductStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
            codigoBarras: "",
            descripcion: "",
            imagen: "",
            costo: 0,
            utilidad: 0,
            precio: 0,
            descuentoBase: 0,
            impuesto: 0,
            estadoProducto: 0,
            stockMinimo: 0,
        },
    })

    const { isValid } = form.formState

    useEffect(() => {
        console.log('Formulario válido:', isValid);
    }, [isValid]);

    const { watch, setValue } = form
    const costo = watch("costo");
    const utilidad = watch("utilidad");

    useEffect(() => {
        console.log('Costo:', costo);
        console.log('Utilidad:', utilidad);

        const calculatedPrecio = Number(costo) + Number(utilidad);
        setValue("precio", calculatedPrecio);
    }, [costo, utilidad, setValue])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log('Valores a enviar:', values);
        await addCustomer(values);
        setOpenModalCreate(false);
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="imagen"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imagen del Producto</FormLabel>
                                <FormControl>
                                    <Input placeholder="" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre del Producto</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="estadoProducto"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    <Select
                                        onValueChange={(value) => field.onChange(Number(value))} // Convierte el valor a número aquí
                                        defaultValue={field.value !== undefined ? field.value.toString() : ''}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar estado del producto" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="0">Alta</SelectItem>
                                            <SelectItem value="1">Baja</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="codigoBarras"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Codigo de Barras</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="descripcion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripcion</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder=""
                                            {...field}
                                            value={form.getValues().descripcion ?? ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 justify-start gap-3">
                        <div>
                            <FormField
                                control={form.control}
                                name="costo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Costo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Costo Producto" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="utilidad"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Utilidad</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ganancia Producto" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="precio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Precio</FormLabel>
                                        <FormControl>
                                            <Input disabled placeholder="Precio Producto" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="descuentoBase"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descuento Base</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Descuento" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="impuesto"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Impuesto</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Impuestos" type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stockMinimo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stock Minimo</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit" >Submit</Button>
                </form>
            </Form>
        </div>
    )
}

