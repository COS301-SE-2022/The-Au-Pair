package Database.TheAuPair.Services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;

public class StorageService
{
  @Value("${bucketName}")
  private String bucketName;
  private  final AmazonS3 s3;

  public StorageService(AmazonS3 s3)
  {
    this.s3 = s3;
  }

  public byte[] downloadFile(String fileName)
  {
    S3Object s3Object = s3.getObject(bucketName, fileName);
    S3ObjectInputStream inputStream = s3Object.getObjectContent();
    try
    {
      byte[] content = IOUtils.toByteArray(inputStream);
      return content;
    }
    catch (IOException e)
    {
      e.printStackTrace();
    }
    return null;
  }
}
