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
  sendCustomTemplateWhatsAppMessage,
} = require("./Common/common");
const fs = require("fs");
const path = require("path");
const { fileTypeFromFile } = require("file-type");
const { get } = require("http");

app.use(express.json());

// console.log(
//   "webp image -->" + fs.readFileSync(process.cwd() + "/media/test.webp")
// );

var port = process.env.PORT || 3000; // Use PORT from environment or default to 3000
console.log(`Server will run on port: ${port}`);

app.get("/", (req, res) => {
  res.send("Hello World! Server is running.");
});

app.get("/webhook", (req, res) => {
  console.log("req.query:", req.query);
  // 'hub.mode': 'subscribe',
  // 'hub.challenge': '698275775',
  // 'hub.verify_token': 'my-verify-token'
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const token = req.query["hub.verify_token"];

  if (mode && token) {
    if (mode === "subscribe" && token === process.env.WA_WEBHOOK_VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.post("/webhook", (req, res) => {
  console.log("Webhook POST received:", JSON.stringify(req.body, null, 2));

  // res.sendStatus(200);
  // res.sendStatus(200).send("webhook processed");
  const entryObj = req?.body?.entry;
  if (!entryObj || !Array.isArray(entryObj) || entryObj?.length === 0) {
    return res.status(400).send("Invalid webhook data");
  }

  const changes = entryObj[0]?.changes;

  if (!changes || !Array.isArray(changes) || changes?.length === 0) {
    return res.status(400).send("Invalid webhook data");
  }

  if (changes[0]?.value?.contacts) {
    const contacts = changes[0]?.value?.contacts;
    if (contacts && Array.isArray(contacts) && contacts.length > 0) {
      const profileName = contacts[0]?.profile?.name;

      sendCustomTemplateWhatsAppMessage(profileName)
        .then((getData) => {
          res.status(200).send("sendCustomTemplateWhatsAppMessage processed");
          // console.log(
          //   "Custom template message sent successfully:",
          //   getData?.data
          // );
        })
        .catch((error) => {
          console.error("Error sending custom template message:", error);
        });
    }
  }

  res.status(200).send("webhook processed");
});

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
  const filePath = "https://morth.nic.in/sites/default/files/dd12-13_0.pdf";
  //   const filePath = process.cwd() + "/media/test.webp";
  console.log("File Path:", filePath);
  await sendMediaWhatsAppfiles(filePath)
    .then(async (getData) => {
      if (getData?.data) {
        console.log("getData 2");

        // let mediaType = await fileTypeFromFile(filePath);
        // console.log("File Extension index:", mediaType?.mime.split("/")[0]);

        // sendImageWhatsAppIDMessage(
        //   getData?.data?.id,
        //   mediaType?.mime.split("/")[0]
        // ).then((dbRes) => {
        //   console.log("Image sent successfully with ID message response:");
        //   res.json({
        //     status: "success",
        //     message: "Webhook received and data fetch initiated.",
        //     data: getData.data,
        //   });
        // });
        // res.json({
        //   status: "success",
        //   message: "Webhook received and data fetch initiated.",
        //   data: getData.data,
        // });

        res.json({
          status: "success",
          message: "Webhook received and data fetch initiated.",
          data: getData.data,
        });
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

app.get("/sendCustomTemplateWhatsAppMessage", (req, res) => {
  sendCustomTemplateWhatsAppMessage("Jhon")
    .then((getData) => {
      res.json({
        status: "success",
        message: "Webhook received and data fetch initiated.",
        data: getData?.data.messages,
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
