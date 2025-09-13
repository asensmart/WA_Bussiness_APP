require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const app = express();
const { sendWhatsAppMessage } = require("./Common/common");

var port = process.env.PORT || 3000; // Use PORT from environment or default to 3000
console.log(`Server will run on port: ${port}`);

app.get("/webhook", (req, res) => {
  sendWhatsAppMessage()
    .then((getData) => {
      res.json({
        status: "success",
        message: "Webhook received and data fetch initiated.",
        data: getData.data.messages,
      });
    })
    .catch((error) => {
      console.error("Error in sendWhatsAppMessage:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to send WhatsApp message.",
        error: error.message,
      });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
