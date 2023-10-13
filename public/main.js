document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.getElementById("uploadForm");
    const resultDisplay = document.getElementById("result");
    const previewImage = document.getElementById("previewImage");

    // Add an event listener to the file input
    const fileInput = document.getElementById("receiptFile");
    fileInput.addEventListener("change", () => {
        const selectedFile = fileInput.files[0];

        // Check if a file was selected
        if (selectedFile) {
            // Display the selected image as a preview
            const imageUrl = URL.createObjectURL(selectedFile);
            previewImage.src = imageUrl;

            // Reset the parsing result display
            resultDisplay.textContent = "";
        } else {
            // Clear the preview and result if no file is selected
            previewImage.src = "";
            resultDisplay.textContent = "";
        }
    });

    uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(uploadForm);
        formData.append("file_path", fileInput.files[0].name); // Set the file_path property to the name of the selected file

        const response = await fetch("/parse-receipt", {
            method: "POST",
            body: formData,
            mode: 'no-cors'
        });

        if (response.ok) {
            console.log("ok");
            console.log(typeof response);
            const data = await response.json();
            console.log(data, "data recieved");
            console.log(typeof data);
            
            
            localStorage.setItem("data1",data[0]);
            localStorage.setItem("data2",data[1]);
            localStorage.setItem("data3",data[2]);
            localStorage.setItem("data4",data[3]);
            localStorage.setItem("data5",data[4]);
            localStorage.setItem("rec",1);

            window.location = "index.html";
        } else {
            resultDisplay.textContent = "An error occurred.";
        }
    });
});
