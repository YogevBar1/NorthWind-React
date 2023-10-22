class ProductModel{
    public id: number;
    public name: string;
    public price: number;
    public stock: number;
    public imageUrl: string; //Image url serving the uploaded image
    public image: File; //image file to upload to backend
}

export default ProductModel;