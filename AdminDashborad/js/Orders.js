let ordersData;
//localstorage has data
if(localStorage.OrderData != null){
    ordersData=JSON.parse(localStorage.OrderData);
}
//localstorage is empty
else{
  ordersData=[]; 
}

//console.log(ordersData);

// read data
function showData() {
  let table = '';
  
  if (ordersData.length > 0) {
    for (let i = 0; i < ordersData.length; i++) {
      let count = ''; // Initialize count as an empty string for each iteration

      // Assuming 'quantity' is an array of objects with 'numOfItems' property
      for (let j = 0; j < ordersData[i]['quantity'].length; j++) {
        count += ordersData[i]['quantity'][j].numOfItems;

        // Add a comma 
        if (j < ordersData[i]['quantity'].length - 1) {
          count += ', ';
        }
      }

      table += `
        <tr>
          <td>${(ordersData[i]['Order Id'])}</td>
          <td>${ordersData[i]['productId']}</td>
          <td>${ordersData[i]['First name']} ${ordersData[i]['Last name']}</td>
          <td>${count}</td>
          <td>${ordersData[i]['products total price ']}</td>
          <td>${ordersData[i]['Date of Order']}</td>
        </tr>`;
    }
  } else {
    table = "<tr><td colspan='6'>Not found Orders</td></tr>";
  }

  document.getElementById("tbody").innerHTML = table;
}

// display data
showData();
