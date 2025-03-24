<template>
<v-container fluid>
    <v-row v-if="paginatedProducts.length > 0">
        <!-- Products Section -->
        <v-col cols="12">
            <h1 class="text-center title">Point of Sale</h1>
        </v-col>
        <v-col cols="12" md="8">
            <v-row>
                <v-col v-for="product in paginatedProducts" :key="product.id" cols="6" sm="4" md="3">
                    <v-card class="product-card">
                        <div class="card-top-border"></div>
                        <v-img :src="getImageUrl(product.image)" class="product-image" cover></v-img>
                        <v-card-title class="product-title">{{ product.name }}</v-card-title>
                        <v-card-subtitle class="product-price">{{ formatPrice(product.selling_price.toLocaleString()) }}</v-card-subtitle>
                        <v-card-text>
                            <template v-if="product.quantity > 0">
                                <v-text-field v-model.number="product.quantity" label="Qty" type="number" min="1" density="compact" class="quantity-input"></v-text-field>
                            </template>
                            <template v-else>
                                <v-text-field v-model.number="product.quantity" label="Qty" type="number" min="1" density="compact" class="quantity-input" disabled></v-text-field>
                            </template>
                        </v-card-text>
                        <v-card-actions class="d-flex justify-center">
                            <template v-if="product.quantity > 0">
                                <v-btn color="primary" variant="tonal" block @click="addToCart(product)">Add to Cart</v-btn>
                            </template>
                            <template v-else>
                                <v-chip small color="red lighten-1" dark>
                                    Out of Stock
                                </v-chip>
                            </template>
                        </v-card-actions>
                    </v-card>
                </v-col>

            </v-row>
            <v-pagination v-model="currentPage" :length="pageCount" rounded color="#3674B5"></v-pagination>
        </v-col>

        <!-- Cart and Checkout Section -->
        <v-col cols="12" md="4">
            <v-card class="cart ">
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
                                            <span class="label">Total:</span> {{ item.selling_price * item.quantity }} TZS
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
                <v-divider></v-divider>
                <!-- Total Amount & Checkout Button -->
                <v-card-text v-if="cart.length > 0" class="total">
                    Total: <span>{{ totalAmount }}/= TZS</span>
                </v-card-text>
                <v-btn v-if="cart.length > 0" color="#3674B5" block @click="checkout" elevation="0" class="checkout-btn">Checkout</v-btn>
            </v-card>
        </v-col>
    </v-row>
    <v-row v-else>
        <v-col>
            <v-card class="d-flex align-center justify-center text-center pa-5 empty-pos" outlined style="border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
                <v-row>
                    <!-- Icon Section -->
                    <v-col cols="12" class="mb-4">
                        <v-icon large color="red" style="font-size: 70px;">mdi-alert-circle-outline</v-icon>
                    </v-col>

                    <!-- Heading Section -->
                    <v-col cols="12">
                        <h2 class="text-h4 font-weight-bold text-center mb-4" style="color: #A82228; font-size: 28px;">No Products Available</h2>
                        <p class="text-body-1" style="color: #333; font-size: 18px;">
                            It seems like no products have been registered in the system.
                            No sales can be made at the moment. Please add products to the system to start making sales.
                        </p>
                    </v-col>

                    <!-- Link to Product List -->
                    <v-col cols="12" class="mt-5">
                        <v-btn text color="#3674B5" @click="navigateToProductListPage" style="font-size: 16px;">
                            <v-icon left style="font-size: 20px;">mdi-view-list</v-icon> Go to Products Page
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>

</v-container>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            products: [],
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
            return this.cart.reduce((sum, item) => sum + item.selling_price * item.quantity, 0);
        },
    },
    methods: {
        getImageUrl(imageName) {
            return this.$getImageUrl(imageName);
        },
        navigateToProductListPage() {
            // Your logic to navigate to the Product List page
            this.$router.push({
                name: 'products'
            }); // Adjust according to your route
        },
        formatPrice(price) {
            if (!price) return "TZS 0"; // Handle cases where price is null or undefined
            return "TZS " + parseInt(price).toLocaleString();
        },

        handleCustomerSelection(value) {
            if (value === 'addNew') {
                this.addNewCustomer();
            }
        },
        async fetchData() {
            try {
                const response = await axios.get("/product-list", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    },
                });
                console.log(response.data); // Debugging
                this.products = response.data.data.data; // Ensure this matches API response structure
            } catch (error) {
                this.showAlert(error.response.data.message || "An error occurred", 'error');
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
            // Check if the product already exists in the cart
            let item = this.cart.find((i) => i.id === product.id);

            // If product already exists in the cart, increase its quantity
            if (item) {
                item.quantity += product.quantity; // Adds the selected quantity
            } else {
                // If product doesn't exist in the cart, add it with initial quantity of 1
                this.cart.push({
                    ...product,
                    quantity: product.quantity || 1, // Use the selected quantity or default to 1
                });
            }

            // Reset the quantity input to 1 after adding to the cart
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
    created() {
        this.fetchData();
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    position: relative;
    overflow: hidden;
}

.product-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-top-border {
    width: 100%;
    height: 5px;
    background-color: #A82228;
}

.product-title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    /* color: #333; */
    margin-top: 5px;
    white-space: normal;
    /* Allows the title to wrap onto the next line if needed */
    word-wrap: break-word;
    /* Ensures that long words will break to the next line if necessary */
    overflow-wrap: break-word;
    /* Another way to ensure long words wrap correctly */
    line-height: 1.4;
    /* Adjust line height to make the title more readable if wrapped */
}

.product-price {
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: #382e2e;
    margin-top: 8px;
}

.product-image {
    height: 100px;
    /* or any height you prefer */
    width: 100%;
    border-radius: 5%;
}

.quantity-input {
    max-width: 80px;
    margin: auto;
}

.product-card .v-card-actions {
    margin-top: auto;
    padding-top: 10px;
}

.v-btn {
    /* text-transform: none; */
    font-weight: 600;
    border-radius: 8px;
}

.card-top-border {
    height: 8px;
    width: 100%;
    background: linear-gradient(to right, #3674B5, rgb(158, 210, 241));
    /* Main color to a lighter blue */
    position: absolute;
    top: 0;
    left: 0;
}

.cart {
    padding: 15px;
    border-radius: 8px;
    /* background: #fff; */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
}

.cart-top-border {
    height: 18px;
    width: 100%;
    background: linear-gradient(to right, rgb(150, 219, 152), #00897B);
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
    color: #666;
    /* Make the text a little lighter */
}

.cart-item-details .label {
    font-weight: bold;
    margin-right: 5px;
    /* Add some space between the label and the value */
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

.empty-pos {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
