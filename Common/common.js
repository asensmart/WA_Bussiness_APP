var axios = require("axios");
const FormData = require("form-data");
const { fileTypeFromFile } = require("file-type");

module.exports = {
  sendWhatsAppMessage: async function () {
    try {
      const response = await axios({
        method: "POST",
        url: process.env.WA_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.WA_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: "918838497173",
          type: "template",
          template: {
            name: "hello_world",
            language: {
              code: "en_US",
            },
          },
        },
      });

      console.log("Message sent:", response.data);
      return response;
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  },
  sendCustomWhatsAppMessage: async function () {
    try {
      const response = await axios({
        method: "POST",
        url: process.env.WA_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.WA_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: "918838497173",
          type: "text",
          text: {
            body: "Hello, this is a custom message!",
          },
        },
      });

      console.log("Message sent:", response.data);
      return response;
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  },
  sendImageWhatsAppMessage: async function () {
    try {
      const response = await axios({
        method: "POST",
        url: process.env.WA_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.WA_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: "918838497173",
          type: "image",
          image: {
            link: "https://dummyimage.com/600x400/000/fff.png&text=Allahu+Akbar",
            // id: "801354005688179",
            caption: "This is a sample image",
          },
        },
      });

      console.log("Message sent:", response.data);
      return response;
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  },
  sendAudioWhatsAppMessage: async function () {
    try {
      const response = await axios({
        method: "POST",
        url: process.env.WA_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.WA_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: "918838497173",
          type: "audio",
          audio: {
            link: "https://file-examples.com/storage/feb23bcbd368c1ded9d9b0e/2017/11/file_example_MP3_2MG.mp3",
          },
        },
      });

      console.log("Message sent:", response.data);
      return response;
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  },
  sendVideoWhatsAppMessage: async function () {
    try {
      const response = await axios({
        method: "POST",
        url: process.env.WA_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.WA_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: "918838497173",
          type: "video",
          video: {
            link: "https://file-examples.com/storage/feb23bcbd368c1ded9d9b0e/2017/04/file_example_MP4_480_1_5MG.mp4",
          },
        },
      });

      console.log("Message sent:", response.data);
      return response;
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  },

  //  Send meadia files
  sendMediaWhatsAppfiles: async function (filePath) {
    try {
      let mediaType = await fileTypeFromFile(filePath);

      console.log("File Extension:", mediaType?.mime);

      const data = new FormData();
      data.append("messaging_product", "whatsapp");
      data.append("file", fs.createReadStream(filePath), {
        contentType: mediaType?.mime,
      });
      data.append("type", mediaType?.mime);

      const response = await axios({
        method: "POST",
        url: process.env.WA_MEDIA_URL,
        headers: {
          Authorization: `Bearer ${process.env.WA_TOKEN}`,
        },
        data: data,
      });

      console.log("Message sent:", response.data);
      return response;
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  },
  sendImageWhatsAppIDMessage: async function (fileId, fileType) {
    try {
      console.log("fielId, fileType", fileId, fileType);

      const response = await axios({
        method: "POST",
        url: process.env.WA_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.WA_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: "918838497173",
          type: fileType, //image, audio, video
          [fileType]: {
            id: fileId,
            caption: "This is a sample image with id",
          },
        },
      });

      console.log("Message sent: sendImageWhatsAppIDMessage", response.data);
      return response;
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  },
};
