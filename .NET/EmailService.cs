using EllipticCurve;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Sabio.Services.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;
using Sabio.Models.Requests;
using Microsoft.AspNetCore.Hosting;
using Sabio.Models.AppSettings;
using System.IO;
using Sabio.Models.Domain;

namespace Sabio.Services
{
    public class EmailService : IEmailService
    {
        private AppKeys _appKeys;
        private IWebHostEnvironment _hostEnvironment;
        private Domain _domain;
        private ContactInfo _contactInfo;
        public EmailService(IOptions<AppKeys> appKeys, IOptions<Domain> domain, IOptions<ContactInfo> contactInfo
            , IWebHostEnvironment env)
        {
            _appKeys = appKeys.Value;
            _hostEnvironment = env;
            _domain = domain.Value;
            _contactInfo = contactInfo.Value;
        }
        public void SendConfirmEmail(string email, string token)
        {
            var path = Path.Combine(_hostEnvironment.WebRootPath, "EmailTemplates", "AccountConfirm.html");
            var msg = new SendGridMessage()
            {
                From = new EmailAddress()
                {
                    Email = _contactInfo.AdminEmail,
                    Name = "MiVet"
                },
                Subject = "MiVet Account Confirmation",
                HtmlContent = File.ReadAllText(path).Replace("{{token}}", token).Replace("{{email}}", email).Replace("{{domain}}", _domain.Live)
            };
            msg.AddTo(email, "MiVet");
            SendEmail(msg);
        }
    }
}
