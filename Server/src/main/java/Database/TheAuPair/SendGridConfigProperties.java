package Database.TheAuPair;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("sendgrid")
public record SendGridConfigProperties(String apiKey) {

}

