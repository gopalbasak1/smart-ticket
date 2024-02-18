document.addEventListener("DOMContentLoaded", function () {
    const bookingButtons = document.querySelectorAll(".booking-btn");
    const selectedSeatsDisplay = document.querySelector(".show-total");
    const grandTotalDisplay = document.querySelector(".grand-total");
    const totalPriceDisplay = document.querySelector(".seatCount span");
    const showTotal = document.querySelector(".show-total");
    const couponInput = document.getElementById("input-text");
    const applyCouponButton = document.getElementById("applyBtn");

    let selectedSeats = [];
    let couponApplied = false;

    function updateSelectedSeatsDisplay() {
        selectedSeatsDisplay.innerHTML = "";
        let totalPrice = 0;

        selectedSeats.forEach(seat => {
            const seatElement = document.createElement("div");
            seatElement.classList.add("flex", "justify-between", "items-center", "border-b-2", "border-dashed", "py-2");

            const seatInfo = document.createElement("p");
            seatInfo.textContent = seat.number + " - " + seat.class;
            seatInfo.classList.add("text-lg", "font-medium");

            const seatPrice = document.createElement("p");
            seatPrice.textContent = "BDT " + seat.price;
            seatPrice.classList.add("text-lg", "font-medium");

            seatElement.appendChild(seatInfo);
            seatElement.appendChild(seatPrice);

            selectedSeatsDisplay.appendChild(seatElement);

            totalPrice += seat.price;
        });

        const grandTotal = calculateGrandTotal(totalPrice);

        totalPriceDisplay.textContent = formatPrice(totalPrice);

        if (selectedSeats.length > 0) {
            grandTotalDisplay.textContent = formatPrice(grandTotal);
            grandTotalDisplay.classList.add("flex", "justify-between", "items-center", "border-b-2", "border-dashed", "py-2");
        } else {
            grandTotalDisplay.textContent = ""; // Hide grand total if no seats selected
            grandTotalDisplay.classList.remove("flex", "justify-between", "items-center", "border-b-2", "border-dashed", "py-2");
        }
    }

    function calculateGrandTotal(totalPrice) {
        if (couponApplied && selectedSeats.length >= 4 && couponInput.value.trim().toUpperCase() === "NEW15") {
            const discount = totalPrice * 0.15; // 15% discount
            return totalPrice - discount;
        } else {
            return totalPrice; 
        }
    }

    function formatPrice(price) {
        return "BDT " + price.toFixed(2);
    }

    bookingButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (selectedSeats.length >= 4) {
                alert("You can only book a maximum of 4 seats.");
                return;
            }

            const seatNumber = button.textContent.trim();
            const seatClass = "Economic";
            const seatPrice = 500;

            const seat = { number: seatNumber, class: seatClass, price: seatPrice };

            selectedSeats.push(seat);

            updateSelectedSeatsDisplay();

            showTotal.classList.add("show");

            button.style.backgroundColor = "#1dd100";
        });
    });

    applyCouponButton.addEventListener("click", function () {
        const couponCode = couponInput.value.trim();
        if (selectedSeats.length === 4 && couponCode.toUpperCase() === "NEW15") {
            couponApplied = true;
            updateSelectedSeatsDisplay();
        } else {
            alert("Coupon is applicable only when 4 seats are selected.");
        }
    });
});
