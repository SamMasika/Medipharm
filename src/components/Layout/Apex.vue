<template>
<div>
    <!-- Element where the chart will be rendered -->
    <v-card>
        <v-card-text>
            <div ref="chart"></div>
        </v-card-text>
    </v-card>
</div>
</template>

  
  
<script>
export default {
    name: "AgeGroupAttendanceChart",
    mounted() {
        // Define the chart options for grouped bar chart by age groups and gender
        const options = {
            chart: {
                type: 'bar', // Column bar chart
                height: 500, // Increased height of the chart
                animations: {
                    enabled: true, // Enable animations
                    speed: 800, // Duration of the animation (in ms)
                    animateGradually: {
                        enabled: true, // Gradual animation
                        delay: 150, // Delay in ms before animation starts
                    },
                    dynamicAnimation: {
                        enabled: true, // Enable dynamic animation
                        speed: 350, // Speed of dynamic animations
                    },
                },
            },
            title: {
                text: 'Number of Members by Age and Gender', // Title of the chart
                align: 'center', // Align the title to the center
                style: {
                    fontSize: '18px', // Title font size
                    fontWeight: 'bold', // Title font weight
                    fontFamily: 'Arial, sans-serif', // Title font family
                },
            },
            series: [{
                    name: 'Male',
                    data: [25, 45, 30, 20, 10], // Male numbers by age groups
                },
                {
                    name: 'Female',
                    data: [20, 40, 35, 18, 8], // Female numbers by age groups
                },
            ],
            xaxis: {
                categories: ['0-18', '19-35', '36-45', '46-60', '60+'], // Age groups
            },
            plotOptions: {
                bar: {
                    horizontal: false, // Vertical bars (column chart)
                    columnWidth: '30%', // Width of each bar
                    distributed: false, // Group bars by category (age group)
                },
            },
            dataLabels: {
                enabled: false, // Disable data labels
            },
            colors: ['#00BFFF', '#FF6347'], // Updated colors: Green for Male, Amber for Female
            legend: {
                position: 'bottom', // Position the legend at the bottom
                horizontalAlign: 'center', // Center the legend horizontally
            },
        };

        // Create a new ApexCharts instance and render it on the element
        new this.$apexcharts(this.$refs.chart, options).render();
    },
};
</script>
  
  
<style scoped>
/* Custom styles for your chart component */
</style>
