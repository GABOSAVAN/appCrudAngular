export interface Product{
    id?: number;
    title?: string;
    description?: string;
    category?: Category;
    price?: number;
    image?: string;
}

export enum Category{
    men_clothing = "men's clothing",
    jewelery = "jewelery",
    electronics = "electronics",
    women_clothing = "women's clothing"
}