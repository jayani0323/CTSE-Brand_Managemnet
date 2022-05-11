export interface IProduct {
    name:string;
    description:string;
    shortDescription:string;
    categories:[];
    brands:[];
    images:string[];
    Tags:[];
    price:number;
    costPrice:number;
    comparePrice:number;
    discount:number;
    qty:number;
    sku:string;
    status:string;
    sellWhenOutOfStock:boolean;
    variants:[]
}