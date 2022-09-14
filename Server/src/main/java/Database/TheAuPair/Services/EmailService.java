package Database.TheAuPair.Services;

import Database.TheAuPair.Models.EmailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.*;
import java.io.IOException;

@Service
public class EmailService {

  @Autowired
  SendGrid sendGridClient;

  public Response sendEmail(EmailRequest emailRequest) throws IOException {
    // Building the email
    Email from = new Email("theaupair.help@gmail.com");
    String subject = emailRequest.getSubject();
    Email to = new Email(emailRequest.getTo());
    Content content = new Content("text/plain", emailRequest.getBody());

    Mail mail = new Mail(from, subject, to, content);
    mail.setReplyTo(from);

    Request request = new Request();
    Response response = null;

    try {
      request.setMethod(Method.POST);
      request.setEndpoint("mail/send");
      request.setBody(mail.build());
      response = this.sendGridClient.api(request);
    } catch (IOException ex) {
      System.out.println(ex.getMessage());
    }

    return response;
  }
}
