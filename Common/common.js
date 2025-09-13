var axios = require("axios");

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
};
