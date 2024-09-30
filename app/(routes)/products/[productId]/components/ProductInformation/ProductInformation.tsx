import React from 'react'
import { ProductInformationProps } from './ProductInformation.types'
import Image from 'next/image'
import { User } from 'lucide-react'
import { ProductForm } from '../../../components/ProductForm'

export function ProductInformation(props: ProductInformationProps) {
    const { product } = props

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4'>
            <div className='rounded-lg bg-white shadow-md hover:shadow-lg p-4'>
                <div>
                    <Image
                        src={product?.image || "/images/Image_not_available.png"}
                        alt='Producto Imagen'
                        width={50} height={50}
                        className='rounded-lg mb-3' />

                    <ProductForm product={product} />
                </div>
            </div>
            <div className='rounded-lg bg-background shadow-md hover:shadow-lg p-4 h-min'>
                <div className='flex items-center justify-between gap-x-2'>
                    <div className='flex items-center gap-x-2'>
                        <User className='w-5 h-5' />
                        Contacts
                    </div>
                    <div>
                        <p>New Contact</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
