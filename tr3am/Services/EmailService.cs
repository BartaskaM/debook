using System;
using System.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Protocols;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace tr3am.Services
{
    public class EmailService
    {
        private readonly SendGridOptions _sendGridOptions;

        public EmailService(SendGridOptions sendGridOptions)
        {
            _sendGridOptions = sendGridOptions;
            
        }

        public async void SendReminder(string text, string htmlText, string email)
        {
            var client = new SendGridClient(_sendGridOptions.ApiKey);
            var from = new EmailAddress(_sendGridOptions.Email);
            var subject = "Your device booking has expired";
            var to = new EmailAddress(email);
            var plainTextContent = text;
            var htmlContent = htmlText;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
