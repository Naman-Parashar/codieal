const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "codialservice@gmail.com",
    pass: "vqaquekgbxscjcfs"
  }
});

let renderTemplate = (data, relativePath) => {
  // relative path ==> from where the mail is being send.
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath), // this folder contain all my mail templets
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering template");
        return;
      }

      mailHTML = template;
      // or return mailHTML;
    }
  );

  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
