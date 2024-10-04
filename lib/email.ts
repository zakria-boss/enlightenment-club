import * as SibApiV3Sdk from '@sendinblue/client';


const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.NEXT_BREVO_API_KEY as string);

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const sender = {
    email: process.env.NEXT_BREVO_EMAIL!,
    name: 'The Enlightenment Club',
  };

  const receivers = [
    {
      email: email,
    },
  ];

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = 'Reset Your Password';
  sendSmtpEmail.htmlContent = `
    <h1>Reset Your Password</h1>
    <p>Click the link below to reset your password:</p>
    <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}">Reset Password</a>
  `;
  sendSmtpEmail.sender = sender;
  sendSmtpEmail.to = receivers;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send password reset email');
  }
}
