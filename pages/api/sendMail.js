import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fullName, phoneNumber, email, persons, date } = req.body;

    const emailAddress = "eneserendp@gmail.com";
    const subject = "Yeni Rezervasyon";
    const body = `Tam Adı: ${fullName}\n
      Telefon Numarası: ${phoneNumber}\n
      E-posta: ${email}\n
      Ziyaretçi Sayısı: ${persons}\n
      Rezervasyon Tarihi: ${date}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "eneserendeneme06@gmail.com",
        pass: "auemynjdvmrzykov",
      },
    });

    const mailOptions = {
      from: "eneserendeneme06@gmail.com",
      to: emailAddress,
      subject: subject,
      text: body,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "E-posta başarıyla gönderildi." });
    } catch (error) {
      console.error("E-posta gönderirken hata oluştu:", error);
      res.status(500).json({ error: "E-posta gönderirken bir hata oluştu." });
    }
  } else {
    res.status(405).json({ error: "Yalnızca POST istekleri kabul edilir." });
  }
}