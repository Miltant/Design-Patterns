import { ProductSystem, OrderSystem, PaymentSystem } from './produits';

// code original


const ids = ['324THT54GZG', '324F24TG35R', '23RI23UFJ'];

// const systemProduct = new ProductSystem();
// const products = ids.map((item) => {
//     return systemProduct.loadProduct(item);
// });

// const orderSystem = new OrderSystem();
// orderSystem.setProducts(products);

// const paymentSystem = new PaymentSystem();
// paymentSystem
//     .processPayment(orderSystem.calculateOrderValue())
//     .then((response) => {
//         if (!response) throw new Error('This un unsuccessfull');

//         orderSystem.saveOrder();
//     });


// retravail en façade

class OrderFacade {
    constructor(
        private systemProduct: ProductSystem = new ProductSystem(),
        private orderSystem: OrderSystem = new OrderSystem(),
        private paymentSystem: PaymentSystem = new PaymentSystem()
    ) {}

    public processOrder(ids: string[]) {
        const products = ids.map((item) => {
            return this.systemProduct.loadProduct(item);
        });

        this.orderSystem.setProducts(products);

        this.paymentSystem
            .processPayment(this.orderSystem.calculateOrderValue())
            .then((response) => {
                if (!response) throw new Error('This is unsuccessfull');

                this.orderSystem.saveOrder();
            });
    }
}

const facade = new OrderFacade();
facade.processOrder(ids);