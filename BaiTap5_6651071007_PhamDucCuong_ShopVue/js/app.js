
const { createApp } = Vue;

createApp({
    data() {
        return {
            // Nội dung ô tìm kiếm
            searchText: "",

            // Danh mục đang được chọn
            selectedCategory: "Tất cả",

            // Ẩn/hiện giỏ hàng
            showCart: false,

            // Các danh mục sản phẩm
            categories: [
                "Tất cả",
                "Ốp lưng",
                "Tai nghe",
                "Sạc",
                "Cáp sạc",
                "Khác"
            ],

            // Danh sách sản phẩm
            products: [
                {
                    id: 1,
                    name: "Ốp lưng trong suốt",
                    category: "Ốp lưng",
                    price: 89000,
                    description: "Ốp lưng trong suốt, bảo vệ điện thoại.",
                    image: "../images/oplungtrongsuot.jpg"
                },
                {
                    id: 2,
                    name: "Ốp lưng chống sốc",
                    category: "Ốp lưng",
                    price: 129000,
                    description: "Thiết kế chắc chắn, hạn chế va đập.",
                    image: "../images/oplungchongsoc.jpg"
                },
                {
                    id: 3,
                    name: "Tai nghe Bluetooth",
                    category: "Tai nghe",
                    price: 399000,
                    description: "Tai nghe không dây, thiết kế gọn nhẹ.",
                    image: "../images/tainghebluetooth.jpg"
                },
                {
                    id: 4,
                    name: "Tai nghe có dây",
                    category: "Tai nghe",
                    price: 149000,
                    description: "Tai nghe nhỏ gọn, dễ dàng sử dụng.",
                    image: "../images/tainghecoday.jpg"
                },
                {
                    id: 5,
                    name: "Cục sạc nhanh",
                    category: "Sạc",
                    price: 249000,
                    description: "Cục sạc nhỏ gọn, tiện lợi khi di chuyển.",
                    image: "../images/cucsacnhanh.jpg"
                },
                {
                    id: 6,
                    name: "Cáp sạc Type-C",
                    category: "Cáp sạc",
                    price: 79000,
                    description: "Cáp sạc tiện dụng cho thiết bị tương thích.",
                    image: "../images/capsactypec.jpg"
                },
                {
                    id: 7,
                    name: "Giá đỡ điện thoại",
                    category: "Khác",
                    price: 99000,
                    description: "Giá đỡ tiện lợi khi xem phim, học tập.",
                    image: "../images/giadodienthoai.jpg"
                },
                {
                    id: 8,
                    name: "Pin sạc dự phòng",
                    category: "Sạc",
                    price: 499000,
                    description: "Bổ sung năng lượng khi bạn ra ngoài.",
                    image: "../images/pinsacduphong.jpg"
                }
            ],

            // Các sản phẩm trong giỏ hàng
            cart: []
        };
    },

    computed: {
        // Lọc sản phẩm theo tên và danh mục
        filteredProducts() {
            const keyword = this.searchText.trim().toLowerCase();

            return this.products.filter(product => {
                const matchesName =
                    product.name.toLowerCase().includes(keyword);

                const matchesCategory =
                    this.selectedCategory === "Tất cả" ||
                    product.category === this.selectedCategory;

                return matchesName && matchesCategory;
            });
        },

        // Tổng số lượng sản phẩm trong giỏ
        cartCount() {
            return this.cart.reduce((sum, item) => {
                return sum + item.quantity;
            }, 0);
        },

        // Tổng tiền của giỏ hàng
        totalPrice() {
            return this.cart.reduce((sum, item) => {
                return sum + item.price * item.quantity;
            }, 0);
        }
    },

    methods: {
        // Định dạng tiền Việt Nam
        formatPrice(price) {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND"
            }).format(price);
        },

        // Thêm sản phẩm vào giỏ
        addToCart(product) {
            const existingItem = this.cart.find(
                item => item.id === product.id
            );

            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.cart.push({
                    ...product,
                    quantity: 1
                });
            }

            this.showCart = true;
        },

        // Tăng số lượng
        increaseQuantity(item) {
            item.quantity++;
        },

        // Giảm số lượng
        decreaseQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                this.removeFromCart(item.id);
            }
        },

        // Xóa sản phẩm khỏi giỏ
        removeFromCart(productId) {
            this.cart = this.cart.filter(
                item => item.id !== productId
            );
        },

        // Xử lý nút đặt hàng
        checkout() {
            if (this.cart.length === 0) {
                alert("Giỏ hàng đang trống!");
                return;
            }

            const confirmed = confirm(
                "Xác nhận đặt hàng với tổng tiền " +
                this.formatPrice(this.totalPrice) + "?"
            );

            if (confirmed) {
                alert("Đặt hàng thành công! Cảm ơn bạn đã mua hàng.");

                this.cart = [];
                this.showCart = false;
            }
        }
    }
}).mount("#app");
