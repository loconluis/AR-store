import { createTransport, getTestMessageUrl } from 'nodemailer';

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = (text: string) =>
  `<div style="border: 1px solid black; padding: 20px, font-family: sans-serif; line-height: 2; font-size: 20px">
    <h2>Hello There!</h2>
    <p>${text}</p>
    <p>😘, Luis Locon</p>
  </div>`;

export interface Envelope {
  from: string;
  to?: string[] | null;
}
export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

const sendPasswordResetEmail: any = async (resetToken: string, to: string) => {
  const info = (await transporter.sendMail({
    to,
    from: 'luis.locon@gmail.com',
    subject: 'Your password reset token',
    html: makeANiceEmail(`Your password Reset token is Here!
    
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to Reset</a>
    `),
  })) as MailResponse;

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    const uri = getTestMessageUrl(info);
    console.log(` Message Sent! Preview it at ${uri}`);
  }
};

export { sendPasswordResetEmail };
