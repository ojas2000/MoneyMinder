const mindee = require("mindee");
const express = require("express");
const multer = require("multer"); // Middleware for handling file uploads
const upload = multer(); // Create an instance of multer
const app = express();
const port = 5500;

app.use(express.json());

app.use(express.static("public"));

const mindeeClient = new mindee.Client({ apiKey: "4c7fa29daf125f917b86a0fc8fe1bb0c" });

app.post("/parse-receipt", upload.single("input"), async (req, res) => {
    try {
        console.log("Received a POST request at /parse-receipt");

        // Log the contents of the request body (for debugging purposes)
        console.log("Request body:", req.body);

        // Log the file data
        console.log("File data:", req.file);

        const fileData = req.file.buffer; // Get the file data from the request

        // Log the length of the file data (for debugging purposes)
        console.log("File data length:", fileData.length);
        const inputSource = mindeeClient.docFromBuffer(fileData, req.file.originalname);
        const apiResponse = mindeeClient.parse(
            mindee.product.ReceiptV5,
            inputSource
        );
        apiResponse.then((resp) => {
            // print a string summary
            console.log(resp.document.toString());
            res.json(apiResponse);
        });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ error: "An error occurred" });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
