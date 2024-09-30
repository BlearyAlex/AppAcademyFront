import axiosInstance from '@/lib/axiosInstance'
import { create } from 'zustand'

interface Customer {
    "nombre": string,
    "codigoBarras": string,
    "descripcion": string,
    "imagen": string,
    "costo": number,
    "utilidad": number,
    "precio": number,
    "descuentoBase": number,
    "impuesto": number,
    "estadoProducto": number,
    "stockMinimo": number
}

interface CreateProductStore {
    customers: Customer[];
    addCustomer: (customerData: Customer) => Promise<void>;
}

export const useCreateProductStore = create<CreateProductStore>((set: any) => ({
    customers: [],
    addCustomer: async (customerData: any) => {
        try {
            const response = await axiosInstance.post("/Producto/CreateProduct", customerData);
            set((state: any) => ({
                customers: [...state.customers, response.data],
            }));
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    },
}));

