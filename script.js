document.addEventListener("DOMContentLoaded", function () {
    const bookingButtons = document.querySelectorAll(".booking-btn");
    const selectedSeatsDisplay = document.querySelector(".show-total");
    const grandTotalDisplay = document.querySelector(".grand-total"); // Updated grand total display
    const totalPriceDisplay = document.querySelector(".seatCount span");
    const showTotal = document.querySelector(".show-total");
    const couponInput = document.querySelector("input[type='text']");
    const applyCouponButton = document.querySelector("button.btn");

    let selectedSeats = [];
    let couponApplied = false;

    // Function to update the selected seats display and calculate grand total
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

        // Apply discount if coupon applied and there are 4 or more bookings
        if (couponApplied && selectedSeats.length >= 4) {
            const discount = totalPrice * 0.15; // 15% discount
            totalPrice -= discount;
        }

        const grandTotal = calculateGrandTotal(totalPrice);

        totalPriceDisplay.textContent = formatPrice(totalPrice); // Format total price
        grandTotalDisplay.textContent = formatPrice(grandTotal); // Format grand total
    }

    // Function to calculate grand total
    function calculateGrandTotal(totalPrice) {
        if (couponApplied && selectedSeats.length >= 4) {
            const discount = totalPrice * 0.15; // 15% discount
            return totalPrice - discount;
        } else {
            return totalPrice;
        }
    }

    // Function to format price display
    function formatPrice(price) {
        return "BDT " + price.toFixed(2); // Format price with BDT prefix and 2 decimal places
    }

    // Event listener for booking buttons
    bookingButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (selectedSeats.length >= 4) {
                alert("You can only book a maximum of 4 seats.");
                return;
            }
            
            const seatNumber = button.textContent.trim();
            const seatClass = "Economic"; // Assuming all seats belong to this class
            const seatPrice = 500; // Assuming seat price is fixed at 500

            const seat = { number: seatNumber, class: seatClass, price: seatPrice };

            selectedSeats.push(seat);

            updateSelectedSeatsDisplay();

            // Show the total section
            showTotal.classList.add("show");

            // Change background color to green
            button.style.backgroundColor = "#1dd100";
        });
    });

    // Event listener for applying coupon
    applyCouponButton.addEventListener("click", function () {
        const couponCode = couponInput.value.trim();
        if (couponCode.toUpperCase() === "NEW15") {
            couponApplied = true;
            updateSelectedSeatsDisplay();
        }
    });
});
