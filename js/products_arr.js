
if (localStorage.getItem("products") == null) {
  const products = [
    {
      product_id: 1,
      product_name: "t-shirt",
      product_img: "../images/products2/f1.jpg",
      product_img1: "../images/products2/f2.jpg",
      product_img2: "../images/products2/f3.jpg",
      product_img3: "../images/products2/f4.jpg",
      description: "T-shirt in soft cotton jersey. Regular Fit.",
      price: 150,
      count: 20,
      seller: 1,
      category: "topwear",
    },
    {
      product_id: 2,
      product_name: "shirt",
      product_img: "../images/products2/n1.jpg",
      product_img1: "../images/products2/n2.jpg",
      product_img2: "../images/products2/n3.jpg",
      product_img3: "../images/products2/n5.jpg",
      description: "shirt in soft cotton jersey. Regular Fit.",
      price: 300,
      count: 25,
      seller: 1,
      category: "topwear",
    },
    {
      product_id: 3,
      product_name: "long Shirt",
      product_img: "../images/p/p13.jpg",
      product_img1: "../images/p/p14.jpg",
      product_img2: "../images/p/p11.jpg",
      product_img3: "../images/p/p12.jpg",
      description: `Regular Fit Long Sleeve Oxford Men's Shirt
        Button collar
        Oxford fabric
        One chest pocket`,
      price: 600,
      count: 30,
      seller: 1,
      category: "topwear",
    },
    {
      product_id: 4,
      product_name: "Men's Coat",
      product_img: "../images/products2/LC_j.jpg",
      product_img1: "../images/p/p21.jpg",
      product_img2: "../images/p/p22.jpg",
      product_img3: "../images/p/p23.jpg",
      description: ` Slim Fit Biker Collar Men's Coat With a stylish and modern style, the men's coat fits the body with its slim fit cut. The biker collar and the coat, which stands out with its energy, combines classic and sporty elegance.`,
      category: "jacket",
      price: 500,
      count: 31,
      seller: 2,
    },
    {
      product_id: 5,
      product_name: "Brown Jacket ",
      product_img: "../images/p/p53.jpg",
      product_img1: "../images/p/p54.jpg",
      product_img2: "../images/p/p51.jpg",
      product_img3: "../images/p/p52.jpg",
      description: "wonderful white coat suitable for all women",
      price: 1500,
      count: 28,
      seller: 2,
      category: "topwear",
    },
    {
      product_id: 6,
      product_name: "wonderful shirt",
      product_img: "../images/product/t1.png",
      product_img1: "../images/product/t2.png",
      product_img2: "../images/product/t3.png",
      product_img3: "../images/product/t4.png",
      description: `Slim Fit Men's shirt suitable for all occasions `,
      count: 31,
      seller: 2,
      price: 500,
      category: "bottomwear",
    },

    {
      product_id: 7,
      product_name: "Long Shirt",
      product_img: "../images/p/p61.jpg",
      product_img1: "../images/p/p62.jpg",
      product_img2: "../images/p/p63.jpg",
      product_img3: "../images/p/p64.jpg",
      description: `Shirt Collar Straight Long Sleeve Women's Tunic
          wonderful flower pant`,
      price: 900,
      count: 25,
      seller: 1,
      category: "topwear",
    },
    {
      product_id: 8,
      product_name: "half-Boot",
      product_img: "../images/products/p1.png",
      product_img1: "../images/products/p2.png",
      product_img2: "../images/products/p3.png",
      product_img3: "../images/products/p4.png",
      description: "wonderful half-boot with very suitable price",
      price: 450,
      count: 19,
      seller: 2,
      category: "shoes",
    },
    {
      product_id: 9,
      product_name: "Neck Sweater",
      product_img: "../images/p/p71.jpg",
      product_img1: "../images/p/p72.jpg",
      product_img2: "../images/p/p73.jpg",
      product_img3: "../images/p/p74.jpg",
      description: "wonderful half-boot , very good suitable for you ",
      price: 800,
      count: 23,
      seller: 3,
      category: "topwear",
    },
    {
      product_id: 10,
      product_name: "brown H-Boot",
      product_img: "../images/products/p7.png",
      description: "wonderful half-boot",
      price: 450,
      count: 17,
      seller: 3,
      category: "shoes",
    },
    {
      product_id: 11,
      product_name: "Snikers",
      product_img: "../images/shoes/2.jpg",
      
      description: "wonderful shoes for you ",
      price: 450,
      count: 14,
      seller: 3,
      category: "shoes",
    },
    {
      product_id: 12,
      product_name: "Neck Sweater",
      product_img: "../images/p/p71.jpg",
      product_img1: "../images/p/p72.jpg",
      product_img2: "../images/p/p73.jpg",
      product_img3: "../images/p/p74.jpg",
      description: `Crew Neck Regular Long Sleeve Women's Tricot Sweater
          Ribbed ankles and bottom`,
      price: 450,
      count: 47,
      seller: 3,
      category: "topwear",
    },
    {
      product_id: 13,
      product_name: "Brown Jacket ",
      product_img: "../images/p/p53.jpg",
      product_img1: "../images/p/p54.jpg",
      product_img2: "../images/p/p51.jpg",
      product_img3: "../images/p/p52.jpg",
      description: `Waistband
          Front double pocket
          made of stamp fabric`,
      price: 1500,
      count: 23,
      seller: 2,
      category: "jacket",
    },
    {
      product_id: 14,
      product_name: "Short T-shirt",
      product_img: "../images/p/p31.jpg",
      product_img1: "../images/p/p32.jpg",
      product_img2: "../images/p/p33.jpg",
      product_img3: "../images/p/p34.jpg",
      description: " Crew Neck Short Sleeve Combed Cotton Men's T-shirt From combed cotton fabric short sleeved T-Shirt",
      price: 200,
      count: 30,
      seller: 1,
      category: "topwear",
    },
    {
      product_id: 16,
      product_name: "shirt",
      product_img: "../images/products2/n1.jpg",
      product_img1: "../images/products2/n2.jpg",
      product_img2: "../images/products2/n3.jpg",
      product_img3: "../images/products2/n5.jpg",
      description: "shirt in soft cotton jersey. Regular Fit.",
      price: 300,
      count: 25,
      seller: 1,
      category: "topwear",
    },

  ];
  localStorage.setItem("products", JSON.stringify(products));
}