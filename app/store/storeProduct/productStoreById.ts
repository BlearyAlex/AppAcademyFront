import { create } from 'zustand'
import axiosInstance from '@/lib/axiosInstance'

interface ProductById {
    productoId: string;
    nombre: string;
    precio: number;
    estadoProducto: string;
    image: string
    descripcion: string
}

interface ProductStoreById {
    product: ProductById | null;
    loading: boolean;
    error: string | null;
    fetchProductById: (id: string) => Promise<void>;
}

export const useProductStoreById = create<ProductStoreById>((set) => ({
    product: null,
    loading: false,
    error: null,
    fetchProductById: async (productoId: string) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get(`/Producto/GetProductoById/${productoId}`);
            set({ product: response.data, loading: false });
        } catch (error) {
            set({ loading: false, error: "Error al traer producto por ID" });
        }
    },
}));