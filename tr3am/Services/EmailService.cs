using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace tr3am.Services
{
    public class EmailService
    {
        public static void SendReminder(string text, string htmlText, string email)
        {
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("no-reply@devbridge.com");
            var subject = "Your device booking has expired";
            var to = new EmailAddress(email);
            var plainTextContent = text;
            var htmlContent = htmlText;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            client.SendEmailAsync(msg);
        }
    }
}
