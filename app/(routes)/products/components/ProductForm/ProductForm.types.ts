export type Product = {
    nombre: string,
    codigoBarras: string,
    descripcion: string,
    imagen: string,
    costo: number,
    utilidad: number,
    precio: number,
    descuentoBase: number,
    impuesto: number,
    estadoProducto: number,
    stockMinimo: number,
    // Agrega más propiedades según la estructura de tu API
};

export type ProductFormProps = {
    product: Product
}