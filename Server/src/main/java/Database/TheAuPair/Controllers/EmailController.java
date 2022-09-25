package Database.TheAuPair.Controllers;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import Database.TheAuPair.SendGridConfigProperties;
import Database.TheAuPair.Models.EmailRequest;
import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.*;

@RestController
@CrossOrigin(origins = "*")
public class EmailController{
  //ignore the warning of the unused variable, still needs to be instantiated
    private final SendGridConfigProperties sendGridConfig;

    @Value("${sendgrid.api-key}")
    private String sendgridApiKey;
    
    public EmailController(SendGridConfigProperties sendGridConfig) {
        this.sendGridConfig = sendGridConfig;
    }

    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) throws IOException{
        Response response = send(emailRequest);
        if (response.getStatusCode() == 200 || response.getStatusCode() == 202) {
            return ResponseEntity.ok("Email sent successfully");
        } else {
            return ResponseEntity.badRequest().body("Email failed to send");
        }
    }

    //Adding this endpoint to test if the env variable is being read
    @GetMapping("/getEnv")
    public String getEnv() {
        try {
          return sendgridApiKey;
        } catch (Exception e) {
          return "ENV var not found!";
        }
    }

    public Response send(EmailRequest emailRequest) throws IOException {
        //initialize sendgrid
        SendGrid sendGridClient = new SendGrid(sendgridApiKey);

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
          response = sendGridClient.api(request);
        } catch (IOException ex) {
          System.out.println(ex.getMessage());
        }
    
        return response;
      }
}
