package Database.TheAuPair;

import org.springframework.context.annotation.Configuration;
import com.sendgrid.SendGrid;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class SendGridConfig {
    @Value("${SENDGRID_API_KEY}")
    private String sendGridApiKey;

    @Bean
    public SendGrid sendGrid() {
        return new SendGrid(sendGridApiKey);
    }
}
