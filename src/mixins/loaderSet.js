

export default {
    data() {
        return {
           loading:true,
        };
    },
    mounted() {
        setTimeout(() => {
            this.loading = false; // Set loading to false once the page is ready
        }, 2000); // Adjust this delay as necessary
    },
   
};