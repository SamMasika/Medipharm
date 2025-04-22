<template>
<v-container fluid>
		<nav class="custom-breadcrumbs">
			<span class="breadcrumb-item" @click="$router.push('/dashboard')">Dashboard</span>
			<span class="breadcrumb-separator">/</span>
			<span class="breadcrumb-item active">Point Of Sale</span>
	</nav>
    <v-row v-if="paginatedProducts.length > 0">
        <!-- Products Section -->
        <v-col cols="12" class="text-center">
            <h1 class="title animate__animated animate__fadeInDown">💳 Point of Sale</h1>
            <p class="subtitle  animate__animated animate__fadeInUp animate__delay-1s">Quick and simple selling interface</p>
        </v-col>
        <v-card>

        </v-card>
        <v-col cols="12" md="8">
            <v-row>
                <v-col v-for="product in paginatedProducts" :key="product.id" cols="6" sm="4" md="3">
                    <v-card class="product-card">
                        <div class="card-top-border"></div>
                        <v-img :src="getImageUrl(product.image)" class="product-image" cover></v-img>
                        <v-card-title class="product-title"> {{ product.name }}
                        </v-card-title>
                        <v-card-subtitle class="product-price">💸 {{ formatPrice(product.selling_price.toLocaleString()) }}
                        </v-card-subtitle>
                        <v-card-text class="text-center">
                            <div>
                                <strong>🔢 Qty:</strong> {{ product.quantity > 0 ? product.quantity : 0 }}
                            </div>
                        </v-card-text>
                        <v-card-actions class="d-flex justify-center">
                            <template v-if="product.quantity > 0">
                                <v-btn color="primary" variant="tonal" block @click="addToCart(product)" size="small">
                                    🛒 Add to Cart
                                </v-btn>
                            </template>
                            <template v-else>
                                <v-chip small color="red lighten-1" dark size="small">🚫 Out of Stock</v-chip>
                            </template>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-pagination v-model="currentPage" :length="pageCount" rounded color="#3674B5"></v-pagination>
        </v-col>

        <!-- Cart and Checkout Section -->
        <v-col cols="12" md="4">
            <v-card class="cart">
                <div class="cart-top-border"></div>
                <v-card-title class="cart-title">🛒 Cart</v-card-title>
                <v-divider></v-divider>
                <v-alert v-if="cart.length === 0" type="warning" color="#F0B268FF" border="left" elevation="0" icon="mdi-cart-off" class="cart-empty-alert">
                    <v-row align="center" justify="center">
                        <v-col class="text-center">
                            <span class="font-weight-bold text-h6">⚠️ Oops!</span>
                            <p class="mt-2">It looks like you haven't added any products to the cart yet. Start shopping now! 🍭</p>
                        </v-col>
                    </v-row>
                </v-alert>

                <v-list v-else class="cart-list">
                    <v-list-item v-for="item in cart" :key="item.id" class="cart-item">
                        <v-row align="center" justify="space-between" no-gutters>
                            <v-col cols="8">
                                <div class="cart-item-title">🏦 {{ item.name }}</div>
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
                    <PaginatedDropdown :api-endpoint="'/customer-list'" v-model="selectedCustomer" label="👤 Search Customer..." placeholder="Search Product" item-title="name">
                        <template v-slot:append-item>
                            <v-list-item @click="addNewCustomer">
                                <v-list-item-title class="text-primary">
                                    <v-icon left>mdi-plus</v-icon>
                                    Add New Customer
                                </v-list-item-title>
                            </v-list-item>
                        </template>
                    </PaginatedDropdown>

                    <v-row>
                        <v-col cols sm="12">
                            <v-text-field type="date" v-model="sale.sales_date" :max="maxDate" label="🗓️ Sales Date" variant="outlined" show-adjacent-months></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-select v-model="sale.sale_status" placeholder="--Sale Status--" :items="SaleOptions" item-title="text" item-value="value" variant="outlined"></v-select>
                        </v-col>
                        <v-col cols="12" v-if="sale.sale_status === 'PAY'">
                            <v-select v-model="sale.payment_status" :items="paymentOptions" item-title="text" item-value="value" placeholder="💳 Payment Status" variant="outlined"></v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" v-if="sale.payment_status === 'COMPLETED' || sale.payment_status === 'PARTIAL' || sale.sale_status === 'GETINVOICE'">
                            <v-select v-model="sale.payment_mode" :items="modeOptions" item-title="text" item-value="value" placeholder="🏦 Payment Mode" variant="outlined"></v-select>
                        </v-col>
                        <v-col cols="12" v-if="(sale.payment_status === 'COMPLETED' || sale.payment_status === 'PARTIAL') && sale.payment_mode === 'CASH'">
                            <v-select v-model="sale.account_id" :items="cash" item-title="name" item-value="id" placeholder="Deposit to" variant="outlined"></v-select>
                        </v-col>
                        <v-col cols="12" v-if="(sale.payment_status === 'COMPLETED' || sale.payment_status === 'PARTIAL' || sale.sale_status === 'GETINVOICE') && sale.payment_mode === 'BANK'">
                            <v-select v-model="sale.account_id" :items="bank" item-title="name" item-value="id" placeholder="Deposit to" variant="outlined"></v-select>
                        </v-col>
                        <v-col cols="12" v-if="sale.payment_status === 'PARTIAL'">
                            <v-text-field v-model="sale.paid_amount" placeholder="💵 Received Amount" variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-textarea v-model="sale.remarks" label="📖 Additional Notes (Optional)" variant="outlined"></v-textarea>
                </v-card-text>

                <v-divider></v-divider>

                <!-- Total Amount & Checkout Button -->
                <v-card-text v-if="cart.length > 0" class="total">
                    📄 Total: <span>{{ totalAmount }}/= TZS</span>
                </v-card-text>
                <v-btn v-if="cart.length > 0" color="#3674B5" block @click="checkout" elevation="0" class="checkout-btn">👋 Checkout</v-btn>
            </v-card>
        </v-col>
    </v-row>

    <v-row v-else>
        <v-col>
            <v-card class="d-flex align-center justify-center text-center pa-5 empty-pos" outlined style="border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
                <v-row>
                    <v-col cols="12" class="mb-4">
                        <v-icon large color="red" style="font-size: 70px;">
                            mdi-alert-circle-outline
                        </v-icon>
                    </v-col>
                    <v-col cols="12">
                        <h2 class=" font-weight-bold text-center mb-4" style="color: #A82228; font-size: 28px;"> No Products Available</h2>
                        <p class="" style="color: #333; font-size: 18px;">
                            It seems like no products have been registered in the system.
                            ❌ No sales can be made at the moment. Please add products to the system to start making sales.
                        </p>
                    </v-col>
                    <v-col cols="12" class="mt-5">
                        <v-btn text flat class="text-none text-blue" @click="navigateToProductListPage">
                            📃 Go to Products Page
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>

    <!-- Add Customer Dialog -->
    <v-dialog v-model="dialog" max-width="900">
        <v-card prepend-icon="mdi-plus" title="Add Customer">
            <v-form>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field label="Name*" v-model="customer.name" required variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Phone*" v-model="customer.phone" required variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" class="text-none" variant="tonal" @click="dialog = false" rounded="xl"></v-btn>
                    <v-btn type="submit" text="Save" class="text-none button-color" variant="flat" @click="addCustomer" rounded="xl"></v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import axios from "axios";
import swtalert from "@/mixins/swtalert";
import PaginatedDropdown from '@/components/BIMS/SharedComponents/paginatedDropdown'
import {
    SaleOptions,
    paymentOptions,
    modeOptions
} from '@/json/enum'
export default {
    mixins: [swtalert],
    components: {
        PaginatedDropdown
    },
    data() {
        return {
            products: [],
            cart: [],
            dialog: false,
            maxDate: null,
            currentPage: 1,
            perPage: 8,
            sale: {
                sales_date: null,
                sale_code: null,
                tax: null,
                discount: null,
                totalTD: null,
                account_id: null,
                sale_status: null,
                payment_status: null,
                payment_mode: null,
                paid_amount: null,
                remarks: null,
            },
            customer: {},
            selectedCustomer: null,
            saleDate: new Date().toISOString().substr(0, 10), // default to today's date
            paymentModes: ['Cash', 'Card', 'Bank Transfer'],
            paymentMode: null,
            SaleOptions,
            paymentOptions,
            modeOptions,
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
            this.dialog = true
        },
        addCustomer() {
            const data = {
                ...this.customer,
            };
            axios.post('/customer-store', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include token if needed
                    }
                })
                .then(response => {
                    this.showAlert(response.data.message, 'success');
                    this.dialog = false; // Close the dialog after success
                    setTimeout(() => {
                        window.location.reload(); // Reload the window after success
                    }, 500); // Delay the reload slightly to allow the success message to be shown
                })
                .catch(error => this.showAlert(error.response.data.message, 'error'));
        },
        addToCart(product) {
            if (product.quantity === 0) {
                // Product is out of stock, do not add to cart
                return;
            }

            const existingItem = this.cart.find((item) => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.cart.push({
                    id: product.id,
                    name: product.name,
                    selling_price: product.selling_price,
                    quantity: 1,
                });
            }

            // Decrease stock quantity
            product.quantity--;
        },
        removeFromCart(item) {
            // Increase the stock quantity of the product associated with the item being removed
            const product = this.products.find((product) => product.id === item.id);
            if (product) {
                product.quantity += item.quantity;
            }
            // Remove the item from the cartItems array
            this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
        },

        checkout() {
            // if (!this.selectedCustomer || !this.sale.payment_mode || this.sale.sales_date) {
            //     this.$swal.fire({
            //         title: 'Error!',
            //         text: 'Please enter the sales date,select a customer and a payment method before proceeding.',
            //         icon: 'error',
            //         confirmButtonText: 'OK'
            //     });
            //     return;
            // }

            const salesData = {
                customer_id: this.selectedCustomer,
                sales_date: this.sale.sales_date,
                sale_status: this.sale.sale_status,
                payment_status: this.sale.payment_status,
                paid_amount: this.sale.paid_amount,
                payment_mode: this.sale.payment_mode,
                account_id: this.sale.account_id,
                remarks: this.sale.remarks,
                totalTD: this.totalAmount,
                cartItems: this.cart.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                })),
            };

            axios.post('/save-sales', salesData)
                .then(response => {
                    this.showAlert(response.data.message, 'success');
                    this.invoiceNumber = response.data.sale_code;
                    this.cart = [];
                    this.selectedCustomer = null;
                    setTimeout(() => location.reload(), 500); // Delay reload slightly
                })
                .catch(error => {
                    this.showAlert(error.response.data.message, 'error');
                });

        },
        setDateLimits() {
            const today = new Date();

            // Format today's date
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');

            this.maxDate = `${year}-${month}-${day}`; // Today
            this.minDate = `${year}-01-01`; // Example: start of current year
        },

    },
    created() {
        this.fetchData();
        // this.setMaxDate();
    },
    mounted() {
        this.setDateLimits();
    }
};
</script>

<style scoped>


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
