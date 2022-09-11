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
  SendGrid sendGrid;

 public Response sendEmail(EmailRequest emailRequest) throws IOException {
    Mail mail = new Mail(new Email(from), subject, new Email(to),content);
    
  
}
