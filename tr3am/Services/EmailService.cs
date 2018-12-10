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
            var subject = "Your device booking has expired";
            var plainTextContent = text;
            var htmlContent = htmlText;
            await Send(plainTextContent, subject, htmlContent, email);
        }

        public async Task<Response> Send(string text, string subject, string htmlText, string email)
        {
            var client = new SendGridClient(_sendGridOptions.ApiKey);
            var from = new EmailAddress(_sendGridOptions.Email);
            var to = new EmailAddress(email);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, text, htmlText);
            return await client.SendEmailAsync(msg);
        }
    }
}
