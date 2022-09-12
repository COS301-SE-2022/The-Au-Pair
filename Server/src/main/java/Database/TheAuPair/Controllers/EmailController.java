package Database.TheAuPair.Controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.sendgrid.Response;
import Database.TheAuPair.Models.EmailRequest;
import Database.TheAuPair.Services.EmailService;

@RestController
@CrossOrigin(origins = "*")
public class EmailController{

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) throws IOException{
        Response response = emailService.sendEmail(emailRequest);
        if (response.getStatusCode() == 200 || response.getStatusCode() == 202) {
            return ResponseEntity.ok("Email sent successfully");
        } else {
            return ResponseEntity.badRequest().body("Email failed to send");
        }
    }
}