"use client"

import { useProductStoreById } from '@/app/store/storeProduct/productStoreById'

import { useEffect } from 'react';

import { Header } from './components/Header';
import { ProductInformation } from './components/ProductInformation';

import { useRouter } from 'next/navigation';

export default function ProductIdPage({ params }: { params: { productId: string } }) {
    const { product, fetchProductById, loading, error } = useProductStoreById();
    const router = useRouter()

    useEffect(() => {
        fetchProductById(params.productId);
    }, [fetchProductById, params.productId]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>
            <p>Error: {error}</p>
            <button
                onClick={() => fetchProductById(params.productId)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
            >
                Reintentar
            </button>
            <button
                onClick={() => router.push('/')}  // Redirigir al home
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-4"
            >
                Volver al inicio
            </button>
        </div>
    }

    if (!product) {
        return <div>No se encontró el producto</div>;
    }

    return (
        <div>
            <Header />
            <ProductInformation product={product} />
        </div>
    );
}
