export type Product = {
    productoId: string;
    nombre: string;
    precio: number;
    estadoProducto: string;
    image: string;
    descripcion: string;
    // Agrega más propiedades según la estructura de tu API
};

export type ProductFormProps = {
    product: Product
}