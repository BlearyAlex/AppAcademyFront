"use client"

import { DataTable } from "./data-table"
import { columns } from "./columns"

import { useProductStore } from "@/app/store/storeProduct/productStore"
import { useEffect } from "react"


export function ListProducts() {
    const { products, fetchProducts } = useProductStore();
    console.log(products)

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <DataTable columns={columns} data={products} />
    )
}
