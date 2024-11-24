const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()

const sendEmailCreateOrder = async (email, orderItems) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_ACCOUNT, // generated ethereal user
                pass: process.env.MAIL_PASSWORD, // generated ethereal password
            },
        });

        let listItem = '';
        const attachImage = []
        orderItems.forEach((order) => {
            listItem += `<div>
          <div>
            Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VNĐ</b></div>
            <div>Bên dưới là hình ảnh của sản phẩm</div>
          </div>`
            attachImage.push({ path: order.image })
        })

        let info = await transporter.sendMail({
            from: process.env.MAIL_ACCOUNT, // sender address
            to: 'nhicathegioi@gmail.com', // list of receivers
            subject: "Bạn đã đặt hàng tại shop PHONGDEV", // Subject line
            text: "Hello world?", // plain text body
            html: `<div><b>Bạn đã đặt hàng thành công tại shop PHONGDEV</b></div> ${listItem}`,
            attachments: attachImage,
        });

        console.log("Email sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = {
    sendEmailCreateOrder
}