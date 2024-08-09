
let myChartOne = null;
let myChartTwo = null;

let chart = document.getElementById("dashboard-tab");
chart.addEventListener("click", function () {

    let allProducts = JSON.parse(localStorage.getItem("products"));

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const sellerId = loggedInUser.id;

    let sellerProducts = allProducts.filter(product => product.seller === sellerId);

    let sortedByPrice = sellerProducts.slice().sort((a, b) => b.price - a.price);

    let topFiveProducts = sortedByPrice.slice(0, 5);
    let labelsChartOne = topFiveProducts.map(product => product.product_name);
    let dataChartOne = topFiveProducts.map(product => parseFloat(product.price));

    let colorsChartOne = ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)"];
    if (myChartOne) {
        myChartOne.destroy();
    }

    myChartOne = new Chart(document.getElementById("myChartOne").getContext("2d"), {
        type: "bar",
        data: {
            labels: labelsChartOne,
            datasets: [{
                label: "Higher Price",
                data: dataChartOne,
                backgroundColor: colorsChartOne,
                borderWidth: 1,
                hoverBorderWidth: 3,
                hoverBorderColor: "#000",
            }],
        },
        options: {
            legend: {
                position: "right",
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Top Products by Price',
                    padding: {
                        top: 10,
                        bottom: 30
                    },
                    font: {
                        size: 24,
                        weight: 'bold'
                    },
                    position: 'bottom',
                }
            }
        }
    });

    let sellerProductsForChartTwo = allProducts.filter(product => product.seller === sellerId);

    let groupedByCategory = sellerProductsForChartTwo.reduce((acc, product) => {
        const key = product.category;
        if (!acc[key]) {
            acc[key] = { category: key, count: 0 };
        }
        acc[key].count += parseFloat(product.count);
        return acc;
    }, {});

    let labelsChartTwo = Object.keys(groupedByCategory);
    let dataChartTwo = Object.values(groupedByCategory).map(item => item.count);

    if (myChartTwo) {
        myChartTwo.destroy();
    }

    // Create the second chart
    myChartTwo = new Chart(document.getElementById("myChartTwo").getContext("2d"), {
        type: "polarArea",
        data: {
            labels: labelsChartTwo,
            datasets: [{
                label: "Total Quantity",
                data: dataChartTwo,
                backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(185, 192, 192, 0.6)"],
                borderWidth: 1,
                hoverBorderWidth: 3,
                hoverBorderColor: "#000",
            }],
        },
        options: {
            legend: {
                position: "right",
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Total Quantity by Category',
                    padding: {
                        top: 10,
                        bottom: 30
                    },
                    font: {
                        size: 24,
                        weight: 'bold'
                    },
                    position: 'bottom',
                }
            }
        }
    });
});
