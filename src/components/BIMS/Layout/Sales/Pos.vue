<template>
<v-container fluid>
    <v-row>
        <!-- Products Section -->
        <v-col cols="12">
            <h1 class="text-center title">Point of Sale</h1>
        </v-col>
        <v-col cols="12" md="8">
            <v-row>
                <v-col v-for="product in paginatedProducts" :key="product.id" cols="6" sm="4" md="3">
                    <v-card class="product-card" elevation="3">
                        <div class="card-top-border"></div>
                        <v-img :src="product.image" class="product-image" contain></v-img>
                        <v-card-title class="product-title">{{ product.name }}</v-card-title>
                        <v-card-subtitle class="product-price">Tsh {{ product.price.toLocaleString() }}</v-card-subtitle>
                        <v-card-text>
                            <v-text-field v-model.number="product.quantity" label="Qty" type="number" min="1" density="compact" variant="solo" class="quantity-input"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" variant="tonal" block @click="addToCart(product)">Add to Cart</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-pagination v-model="currentPage" :length="pageCount" rounded color="#3674B5"></v-pagination>
        </v-col>

        <!-- Cart and Checkout Section -->
        <v-col cols="12" md="4">
            <v-card class="cart " elevation="6">
                <div class="cart-top-border"></div>
                <v-card-title class="cart-title">Cart</v-card-title>
                <v-divider></v-divider>
                <v-alert v-if="cart.length === 0" type="warning" color="#F0B268FF" border="left" elevation="0" icon="mdi-cart-off" class="cart-empty-alert">
                    <v-row align="center" justify="center">
                        <v-col class="text-center">
                            <span class="font-weight-bold text-h6">Oops!</span>
                            <p class="mt-2">It looks like you haven't added any products to the cart yet. Start shopping now!</p>
                        </v-col>
                    </v-row>
                </v-alert>
                <v-list v-else class="cart-list">
                    <v-list-item v-for="item in cart" :key="item.id" class="cart-item">
                        <v-row align="center" justify="space-between" no-gutters>
                            <v-col cols="8">
                                <div class="cart-item-title">{{ item.name }}</div>
                                <v-row>
                                    <v-col cols="6">
                                        <div class="cart-item-details">
                                            <span class="label">Qty:</span> {{ item.quantity }}
                                        </div>
                                    </v-col>
                                    <v-col cols="6" class="text-right">
                                        <div class="cart-item-details">
                                            <span class="label">Total:</span> {{ item.price * item.quantity }} TZS
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="4" class="text-right">
                                <v-btn icon color="error" @click="removeFromCart(item)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-list-item>

                </v-list>
                <v-divider></v-divider>

                <!-- Checkout Form Section -->
                <v-card-text v-if="cart.length > 0" class="checkout-form">
                    <!-- <v-text-field label="Select Customer" v-model="selectedCustomer" :items="customers" item-text="name" item-value="id" outlined dense /> -->
                    <v-autocomplete v-model="selectedCustomer" :items="customers" item-title="name" item-value="id" density="compact" placeholder="Select Customer" prepend-inner-icon="mdi-account" variant="outlined" @update:modelValue="handleCustomerSelection">
                        <template v-slot:append-item>
                            <v-list-item @click="addNewCustomer">
                                <v-list-item-title class="text-primary" @click="addNewCustomer">
                                    <v-icon left>mdi-plus</v-icon> Add New Customer
                                </v-list-item-title>
                            </v-list-item>
                        </template>
                    </v-autocomplete>

                    <v-menu v-model="dateMenu" :close-on-content-click="false" transition="slide-x-reverse" offset-y>
                        <template #activator="{ on, attrs }">
                            <v-text-field v-bind="attrs" v-on="on" type="date" placeholder="Date of Sale" variant="outlined" density="compact" />
                        </template>
                        <v-date-picker v-model="saleDate" @input="dateMenu = false"></v-date-picker>
                    </v-menu>
                    <v-select v-model="paymentMode" :items="paymentModes" placeholder="Payment Mode" variant="outlined" density="compact"></v-select>
                    <v-textarea v-model="additionalNotes" label="Additional Notes (Optional)" variant="outlined" density="compact"></v-textarea>
                </v-card-text>

                <!-- Total Amount & Checkout Button -->
                <v-card-text v-if="cart.length > 0" class="total">
                    Total: <span>{{ totalAmount }}/= TZS</span>
                </v-card-text>
                <v-btn v-if="cart.length > 0" color="#3674B5" block @click="checkout" class="checkout-btn">Checkout</v-btn>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            products: Array.from({
                length: 10
            }, (_, i) => ({
                id: i + 1,
                name: `Product ${i + 1}`,
                price: (i + 1) * 1000,
                image: 'https://via.placeholder.com/100',
                quantity: 1,
            })),
            cart: [],
            currentPage: 1,
            perPage: 8,
            customers: [{
                    id: 1,
                    name: 'Customer 1'
                },
                {
                    id: 2,
                    name: 'Customer 2'
                },
                {
                    id: 3,
                    name: 'Customer 3'
                },
            ],
            selectedCustomer: null,
            saleDate: new Date().toISOString().substr(0, 10), // default to today's date
            paymentModes: ['Cash', 'Card', 'Bank Transfer'],
            paymentMode: null,
            additionalNotes: '',
            dateMenu: false,
        };
    },
    computed: {
        paginatedProducts() {
            const start = (this.currentPage - 1) * this.perPage;
            return this.products.slice(start, start + this.perPage);
        },
        pageCount() {
            return Math.ceil(this.products.length / this.perPage);
        },
        totalAmount() {
            return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
    },
    methods: {
        handleCustomerSelection(value) {
            if (value === 'addNew') {
                this.addNewCustomer();
            }
        },
        addNewCustomer() {
            const newCustomerName = prompt("Enter the new customer's name:");
            if (newCustomerName) {
                const newCustomer = {
                    id: this.customers.length + 1, // Unique ID
                    name: newCustomerName
                };
                this.customers.push(newCustomer); // Add to dropdown list
                this.selectedCustomer = newCustomer.id; // Select the new customer
            }
        },
        addToCart(product) {
            let item = this.cart.find((i) => i.id === product.id);
            if (item) {
                item.quantity += product.quantity;
            } else {
                this.cart.push({
                    ...product
                });
            }
            product.quantity = 1;
        },
        removeFromCart(item) {
            this.cart = this.cart.filter((i) => i.id !== item.id);
        },
        checkout() {
            if (!this.selectedCustomer || !this.paymentMode) {
                this.$swal.fire({
                    title: 'Error!',
                    text: 'Please select a customer and a payment method before proceeding.',
                    icon: 'error',
                    color: '#3674B5',
                    confirmButtonText: 'OK'
                });
                return;
            }
            const orderDetails = {
                customer: this.selectedCustomer,
                saleDate: this.saleDate,
                paymentMode: this.paymentMode,
                additionalNotes: this.additionalNotes,
                totalAmount: this.totalAmount,
                cart: this.cart,
            };
            alert(`Order details: ${JSON.stringify(orderDetails)}`);
        },
    },
};
</script>

<style scoped>
.title {
    font-size: 24px;
    font-weight: bold;
    color: #3674B5;
}

.product-card {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
    border-radius: 8px;
    transition: transform 0.2s;
    position: relative;
    overflow: hidden;
}

.product-card:hover {
    transform: scale(1.03);
}

.card-top-border {
    height: 8px;
    width: 100%;
    background: linear-gradient(to right, #3674B5, #68B8EBFF);
    /* Main color to a lighter blue */
    position: absolute;
    top: 0;
    left: 0;
}

.product-image {
    height: 120px;
    object-fit: contain;
}

.product-title,
.product-price {
    text-align: center;
    font-size: 14px;
    /* font-weight: 600; */
}

.quantity-input {
    max-width: 80px;
    margin: auto;
}

.cart {
    padding: 15px;
    border-radius: 8px;
    /* background: #fff; */
    position: relative;
    overflow: hidden;
}

.cart-top-border {
    height: 18px;
    width: 100%;
    background: linear-gradient(to right, #84CF87FF, #00897B);
    /* Green to Teal */
    position: absolute;
    top: 0;
    left: 0;
}

.cart-title {
    font-size: 18px;
    font-weight: bold;
    color: #3674B5;
}

.total {
    font-size: 16px;
    font-weight: bold;
    color: #4caf50;
}

.checkout-btn {
    margin-top: 10px;
    background-color: #3674B5;
    color: white;
}

.cart-item-title {
    font-size: 14px;
    font-weight: bold;
}

.cart-item-details {
    font-size: 12px;
     color: #666;  /* Make the text a little lighter */
}
.cart-item-details .label {
  font-weight: bold;
  margin-right: 5px;  /* Add some space between the label and the value */
}
.cart-item {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.checkout-form {
    margin-top: 15px;
}

@media (max-width: 600px) {
    .product-card {
        height: auto;
    }

    .product-image {
        height: 100px;
    }

    .cart-title,
    .cart-item-title {
        font-size: 16px;
    }
}
</style>
