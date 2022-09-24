package Database.TheAuPair.Services;

import com.amazonaws.services.s3.AmazonS3;
import org.springframework.beans.factory.annotation.Value;

public class StorageService
{
  @Value("${bucketName}")
  private String bucketName;
  private  final AmazonS3 s3;

  public StorageService(AmazonS3 s3)
  {
    this.s3 = s3;
  }
}
