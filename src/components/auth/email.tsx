import emailjs from "@emailjs/browser";

export const sendEmailToUser = async (userEmail: string, otp: number) => {
  const templateParams = {
    otp: otp,                   // sender's name (you/your app)
    email: userEmail,                        // receiver's name
  };

  try {
    await emailjs.send("service_x9a1382","template_xshcynj", templateParams, `${process.env.NEXT_PUBLIC_SECRET_KEY}`);
  } catch (error) {
    console.error("Failed to send email", error);
    
  }
};


export const sendEmail = async() => {

}
