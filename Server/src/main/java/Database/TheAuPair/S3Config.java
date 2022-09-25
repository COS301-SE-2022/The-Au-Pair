package Database.TheAuPair;

import com.amazonaws.auth.*;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config
{
  @Value("${accessKey}")
  private String accessKey;
  @Value("${secretKey}")
  private String secret;
  @Value("${region}")
  private String region;

  @Bean
  public AmazonS3 s3()
  {
    AWSCredentials awsCredentials=new BasicAWSCredentials(accessKey,secret);
    return AmazonS3ClientBuilder.standard().withRegion(region).withCredentials(new AWSStaticCredentialsProvider(awsCredentials)).build();
  }
}
