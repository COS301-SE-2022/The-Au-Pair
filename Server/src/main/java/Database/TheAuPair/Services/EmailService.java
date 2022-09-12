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

 public Response sendEmail(EmailRequest emailRequest) throws IOException 
 {
    Mail mail = new Mail(new Email("theaupair.help@gmail.com"),
                                  emailRequest.getSubject(),
                                  new Email(emailRequest.getTo()),
                                  new Content("text/plain", emailRequest.getBody()));

    mail.setReplyTo(new Email("theaupair.help@gmail.com"));
    Request request = new Request();
    Response response = null;
    try {
      request.setMethod(Method.POST);
      request.setEndpoint("mail/send");
      request.setBody(mail.build());

      this.sendGridClient.api(request);
    } catch (IOException ex) {
      System.out.println(ex.getMessage());
    }

    return response;
  }
}
