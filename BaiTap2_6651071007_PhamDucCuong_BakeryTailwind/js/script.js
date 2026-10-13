
document.addEventListener("DOMContentLoaded", function () {

    // 1. Đóng/mở menu trên điện thoại
    const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    menuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");

        const isExpanded = !mobileMenu.classList.contains("hidden");

        menuButton.setAttribute("aria-expanded", isExpanded);
        menuButton.textContent = isExpanded ? "✕" : "☰";
    });

    // Nhấn vào một mục menu thì đóng menu điện thoại
    mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            mobileMenu.classList.add("hidden");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "☰";
        });
    });

    // 2. Xử lý form đặt bánh
    const orderForm = document.getElementById("order-form");
    const formMessage = document.getElementById("form-message");
    const deliveryDate = document.getElementById("delivery-date");

    // Không cho chọn ngày nhận bánh trong quá khứ
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    deliveryDate.min = `${year}-${month}-${day}`;

    orderForm.addEventListener("submit", function (event) {
        // Ngăn trình duyệt tải lại trang
        event.preventDefault();

        // Kiểm tra dữ liệu hợp lệ theo các thuộc tính HTML
        if (!orderForm.checkValidity()) {
            orderForm.reportValidity();
            return;
        }

        // Lấy thông tin khách hàng nhập
        const customerName =
            document.getElementById("customer-name").value.trim();

        const cakeType =
            document.getElementById("cake-type").value;

        const quantity =
            document.getElementById("quantity").value;

        // Hiển thị thông báo xác nhận demo
        formMessage.textContent =
            `Cảm ơn ${customerName}! Yêu cầu đặt ${quantity} phần ` +
            `${cakeType} đã được ghi nhận trên trang demo.`;

        formMessage.style.color = "#15803d";

        // Xóa dữ liệu sau khi gửi
        orderForm.reset();

        // Đặt lại ngày nhận bánh tối thiểu
        deliveryDate.min = `${year}-${month}-${day}`;
    });

    // 3. Nút quay lại đầu trang
    const backToTop = document.getElementById("back-to-top");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.classList.remove("hidden");
        } else {
            backToTop.classList.add("hidden");
        }
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});
