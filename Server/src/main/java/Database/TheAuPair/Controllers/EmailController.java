package Database.TheAuPair.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.stereotype.Controller;

import Database.TheAuPair.Models.EmailRequest;

@Controller
public class EmailController{
    @PostMapping("/sendEmail")
    public ResponseEntity<String> sendEmail(EmailRequest emailRequest){
        return null;
    }
}