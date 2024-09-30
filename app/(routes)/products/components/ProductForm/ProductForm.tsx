"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Toast } from "@/components/ui/toast"

import { ProductFormProps } from "./ProductForm.types"
import { formSchema } from "./ProductForm.form"
import { Upload } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function ProductForm(props: ProductFormProps) {
    const { product } = props
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: product.nombre,
            codigoBarras: product.codigoBarras,
            descripcion: product.descripcion,
            imagen: product.imagen,
            costo: product.costo,
            utilidad: product.utilidad,
            precio: product.precio,
            descuentoBase: product.descuentoBase,
            impuesto: product.impuesto,
            estadoProducto: product.estadoProducto,
            stockMinimo: product.stockMinimo,
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.put(`/api/products/${product.productoId}`, values)
            toast({
                title: "Producto Actualizado!"
            })
            router.refresh()
        } catch (error) {
            toast({
                title: "Something Wrong",
                variant: "destructive"
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre Producto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Producto name..." type="text" {...field} />
                                </FormControl>
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
                <Button type="submit">Editar Producto</Button>
            </form>
        </Form>
    )
}
