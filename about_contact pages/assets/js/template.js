document.addEventListener("DOMContentLoaded", function() {
    // Your code here

    // Start local storage
    document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get form values
        var name = document.getElementById("name").value.trim().toLowerCase(); // Convert to lowercase
        var email = document.getElementById("email").value.trim();
        var subject = document.getElementById("subject").value.trim();
        var message = document.getElementById("message").value.trim();

        // Basic validation: Check if required fields are not empty
        if (name === "" || email === "" || subject === "" || message === "") {
            alert("Please fill in all required fields.");
            return;
        }

        // Additional validation for the "name" field - only allow alphabetical characters
        var namePattern = /^[a-zA-Z\s]+$/; // Only letters and spaces allowed
        if (!namePattern.test(name) || name.length <= 2) {
            alert("Please enter a valid name with only alphabetical characters and length greater than 2.");
            return;
        }

        var messages = JSON.parse(localStorage.getItem("formData")) || [];

        // Create an object to hold form data
        var formData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        messages.push(formData);

        // Save the array to local storage
        localStorage.setItem("formData", JSON.stringify(messages));

        alert("Form data saved to local storage!");

        // Clear form data
        clearData();
    });

    function clearData() {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
    }

    var MessageSave = JSON.parse(localStorage.getItem("formData")) || [];
    console.log(MessageSave);
});
