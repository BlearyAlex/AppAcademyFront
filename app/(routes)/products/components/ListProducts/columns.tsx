"use client"

import { ArrowDownUp, MoreHorizontal, Pencil } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Image from "next/image"

import { Product } from "./types"

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "profileImage",
        header: "Profile Image",
        cell: ({ row }) => {
            const image = row.getValue("profileImage")

            return (
                <div className="px-3">
                    <Image src={typeof image === 'string' ? image : "/images/Image_not_available.png"}
                        width={40} height={40}
                        alt="Image" className="h-auto w-auto" />
                </div>
            )
        }
    },
    {
        accessorKey: "nombre",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Nombre Producto
                    <ArrowDownUp className="ml-2 h-4 w-4" />
                </Button >
            )
        },
    },
    {
        accessorKey: "precio",
        header: "Precio",
    },
    {
        accessorKey: "descripcion",
        header: "Descripcion"
    },
    {
        accessorKey: "estadoProducto",
        header: "Estado del Producto",
        cell: ({ row }) => {
            const estado = row.getValue("estadoProducto") as string;
            let estadoClase = "";

            if (estado === "Baja") {
                estadoClase = "text-red-500";
            } else if (estado === "Alta") {
                estadoClase = "text-green-500";
            }

            return <span className={estadoClase}>{estado}</span>;
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { productoId } = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" className="w-8 h-4 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/products/${productoId}`}>
                            <DropdownMenuItem>
                                <Pencil className="w-4 h-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

