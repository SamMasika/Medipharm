// import axios from 'axios';

export default {
    data() {
        return {
            itemsLength: '',
        };
    },
    mounted() {
        this.fetchItems(); // Call fetchPurchases when the component is mounted
    }

};