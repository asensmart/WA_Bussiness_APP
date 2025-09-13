require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const app = express();
const {
  sendWhatsAppMessage,
  sendCustomWhatsAppMessage,
  sendImageWhatsAppMessage,
  sendAudioWhatsAppMessage,
  sendVideoWhatsAppMessage,
  sendMediaWhatsAppfiles,
  sendImageWhatsAppIDMessage,
} = require("./Common/common");
const fs = require("fs");
const path = require("path");
const { fileTypeFromFile } = require("file-type");
const { get } = require("http");

// console.log(
//   "webp image -->" + fs.readFileSync(process.cwd() + "/media/test.webp")
// );

var port = process.env.PORT || 3000; // Use PORT from environment or default to 3000
console.log(`Server will run on port: ${port}`);

app.get("/sendTemplateMessage", (req, res) => {
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

app.get("/sendCustomMessage", (req, res) => {
  sendCustomWhatsAppMessage()
    .then((getData) => {
      res.json({
        status: "success",
        message: "Webhook received and data fetch initiated.",
        data: getData.data.messages,
      });
    })
    .catch((error) => {
      console.error("Error in sendCustomWhatsAppMessage:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to send WhatsApp message.",
        error: error.message,
      });
    });
});

app.get("/sendImageWhatsAppMessage", (req, res) => {
  sendImageWhatsAppMessage()
    .then((getData) => {
      res.json({
        status: "success",
        message: "Webhook received and data fetch initiated.",
        data: getData.data.messages,
      });
    })
    .catch((error) => {
      console.error("Error in sendImageWhatsAppMessage:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to send WhatsApp message.",
        error: error.message,
      });
    });
});

app.get("/sendAudioWhatsAppMessage", (req, res) => {
  sendAudioWhatsAppMessage()
    .then((getData) => {
      res.json({
        status: "success",
        message: "Webhook received and data fetch initiated.",
        data: getData.data.messages,
      });
    })
    .catch((error) => {
      console.error("Error in sendAudioWhatsAppMessage:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to send WhatsApp message.",
        error: error.message,
      });
    });
});

app.get("/sendVideoWhatsAppMessage", (req, res) => {
  sendVideoWhatsAppMessage()
    .then((getData) => {
      res.json({
        status: "success",
        message: "Webhook received and data fetch initiated.",
        data: getData.data.messages,
      });
    })
    .catch((error) => {
      console.error("Error in sendVideoWhatsAppMessage:", error);
      res.status(500).json({
        status: "error",
        message: "Failed to send WhatsApp message.",
        error: error.message,
      });
    });
});

// Upload the filw to whatsapp and get the file ID and then share to customer whatspp
app.get("/sendMediaWhatsAppfiles", async (req, res) => {
  const filePath = process.cwd() + "/media/test.webp";
  console.log("File Path:", filePath);
  await sendMediaWhatsAppfiles(filePath)
    .then(async (getData) => {
      if (getData?.data) {
        console.log("getData 2");

        let mediaType = await fileTypeFromFile(filePath);
        console.log("File Extension index:", mediaType?.mime.split("/")[0]);

        sendImageWhatsAppIDMessage(
          getData?.data?.id,
          mediaType?.mime.split("/")[0]
        ).then((dbRes) => {
          console.log("Image sent successfully with ID message response:");
          res.json({
            status: "success",
            message: "Webhook received and data fetch initiated.",
            data: getData.data,
          });
        });
        // res.json({
        //   status: "success",
        //   message: "Webhook received and data fetch initiated.",
        //   data: getData.data,
        // });
      }
    })
    .catch((error) => {
      console.error("Error in sendMediaWhatsfiles:", error);
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
