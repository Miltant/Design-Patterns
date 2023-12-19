interface IProduct {
    getId(): string;
    getName(): string;
    getValue(): number;
    getDescription(): string;

    setName(name: string): void;
    setValue(value: number): void;
    setDescription(description: string): void;
}

class Product implements IProduct {
    constructor(
        private id: string,
        private name: string,
        private value: number,
        private description: string
    ) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.description = description;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getValue() {
        return this.value;
    }

    getDescription() {
        return this.description;
    }

    setName(name: string) {
        this.name = name;
    }

    setValue(value: number) {
        this.value = value;
    }

    setDescription(description: string) {
        this.description = description;
    }

    showInfos() {
        console.log(this.name, this.value, this.description);
    }
}

interface IProductSystem {
    loadProduct(id: string): IProduct;
}

class ProductSystem {
    public loadProduct(id: string): IProduct {
        return new Product(id, 'test product', 12, 'htis is a test product');
    }
}

class OrderSystem {
    private products: IProduct[] = [];

    public setProducts(products: IProduct[]) {
        this.products = products;
    }

    public calculateOrderValue(): number {
        if (this.products.length === 0) throw new Error('No product in cart');

        console.log(`Creating order with ${this.products.length} products`)

        return this.products.reduce((previous, current) => {
            return previous + current.getValue();
        }, 0);
    }

    public saveOrder() {
        // Create an order in database
        console.log('Order has been saved in the database; Order complete;');
        this.reset();
    }

    private reset() {
        console.log('OrderService reset');
        this.setProducts([]);
    }
}

class PaymentSystem {
    public processPayment(value: number): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            console.log(`Issuing payment of ${value} €`)
            setTimeout(() => {
                console.log('Payment Successfull');
                resolve(true);
            }, 100);
        });
    }
}

export { IProduct, IProductSystem, Product, ProductSystem, OrderSystem, PaymentSystem };