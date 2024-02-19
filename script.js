document.addEventListener("DOMContentLoaded", function () {
    const bookingButtons = document.querySelectorAll(".booking-btn");
    const selectedSeatsDisplay = document.querySelector(".show-total");
    const grandTotalDisplay = document.querySelector(".grand-total");
    const totalPriceDisplay = document.querySelector(".seatCount span");
    const showTotal = document.querySelector(".show-total");
    const couponInput = document.getElementById("input-text");
    const applyCouponButton = document.getElementById("applyBtn");
    const numberInput = document.getElementById("numberInput");
    const nextButton = document.querySelector('.next label[for="my_modal_6"]');
    const seatTotalDisplay = document.getElementById("seatTotal"); // Display for remaining seats
    let seatsLeft = parseInt(seatTotalDisplay.textContent); // Get initial remaining seat count

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
        const couponCode = couponInput.value.trim().toUpperCase().replace(/\s/g, ''); // Convert to uppercase and remove spaces
            
        if (selectedSeats.length === 4) {
            if (couponCode === "NEW15" || couponCode === "COUPLE20" || couponCode === "COUPLE20") {
                couponApplied = true; // Set couponApplied to true if a valid coupon is entered
                return applyCouponDiscount(totalPrice, couponCode === "NEW15" ? 0.15 : 0.20);
            } else {
                couponApplied = false; // Reset couponApplied if an invalid coupon is entered
                alert("Invalid coupon code. Please enter a valid coupon code.");
            }
        }
    
        couponApplied = false; // Reset couponApplied if no valid coupon is entered
        return totalPrice; 
    }
    

    function applyCouponDiscount(price, discountRate) {
        const discount = price * discountRate;
        return price - discount;
    }

    function formatPrice(price) {
        return  "BDT " + price.toFixed(2);
    }

    function updateSeatsLeftDisplay() {
        seatTotalDisplay.textContent = seatsLeft; // Update remaining seat count display
    }

    bookingButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (selectedSeats.length >= 4) {
                alert("You can only book a maximum of 4 seats.");
                return;
            }

            if (seatsLeft > 0) {
                seatsLeft--; // Decrease remaining seat count
                updateSeatsLeftDisplay(); // Update display
            } else {
                alert("Sorry, all seats have been booked.");
                return;
            }

            const seatNumber = button.textContent.trim();
            const seatClass = "Economic";
            const seatPrice = 550;

            const seat = { number: seatNumber, class: seatClass, price: seatPrice };

            selectedSeats.push(seat);

            updateSelectedSeatsDisplay();

            showTotal.classList.add("show");

            button.style.backgroundColor = "#1dd100";
        });
    });

    applyCouponButton.addEventListener("click", function () {
        const couponCode = couponInput.value.trim().toUpperCase();
        if (selectedSeats.length === 4) {
            if (couponCode === "NEW15" || couponCode === "NEW 15" || couponCode === "COUPLE20" || couponCode === "COUPLE 20") {
                updateSelectedSeatsDisplay();
                couponInput.style.display = "none"; // Hide the coupon input field
                applyCouponButton.style.display = "none"; // Hide the apply button
            } else {
                alert("Invalid coupon code. Please enter 'NEW15' or 'COUPLE20'.");
            }
        } else {
            alert("Coupon is applicable only when 4 seats are selected.");
        }
    });

    function updateNextButtonState() {
        const inputValue = parseInt(numberInput.value);
        if (!isNaN(inputValue) && inputValue > 0) {
            nextButton.removeAttribute("disabled");
        } else {
            nextButton.setAttribute("disabled", "disabled");
        }
    }

    numberInput.addEventListener("input", updateNextButtonState);

    nextButton.addEventListener("click", function (event) {
        // Check if numberInput value is more than 0
        const inputValue = parseInt(numberInput.value);
        if (!isNaN(inputValue) && inputValue > 0) {
            // Open the modal
            //modalCheckbox.checked = true;
            
            // Reset selected seats
            selectedSeats = [];
            updateSelectedSeatsDisplay();
            
            // Reset coupon input field
            couponInput.value = "";
            numberInput.value = "";
            
            // Hide coupon input field and apply button
            couponInput.style.display = "none";
            applyCouponButton.style.display = "none";
        } else {
            // Prevent the default button action
            event.preventDefault();
            // Display an alert to the user
            alert("Please select at least one seat before proceeding.");
        }
    });

    // Initial state of the next button
    updateNextButtonState();
});


