import { create } from 'zustand'
import axiosInstance from '@/lib/axiosInstance'
import axios from 'axios';

interface Product {
    id: string;
    nombre: string;
    precio: number;
    estadoProducto: string;
}

interface ProductStore {
    products: Product[];
    fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set: any) => ({
    products: [],
    fetchProducts: async () => {
        try {
            const response = await axiosInstance.get('/Producto/GetAllProductos');
            set({ products: response.data })
            console.log(response.data)
        } catch (error) {
            console.log("Error al traer productos", error)
        }
    },
}));