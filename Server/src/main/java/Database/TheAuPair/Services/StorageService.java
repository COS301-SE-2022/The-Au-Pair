package Database.TheAuPair.Services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class StorageService
{
  @Value("${bucketName}")
  private String bucketName;
  private  final AmazonS3 s3;

  public StorageService(AmazonS3 s3)
  {
    this.s3 = s3;
  }

  public String uploadFile(MultipartFile file)
  {
    String originalFilename = file.getOriginalFilename();
    try
    {
      File file1 = convertMultiPartToFile(file);
      PutObjectResult putObjectResult = s3.putObject(bucketName, originalFilename, file1);
      return putObjectResult.getContentMd5();
    }
    catch (IOException e)
    {
      throw  new RuntimeException(e);
    }
  }

  public byte[] downloadFile(String fileName)
  {
    if (this.s3.doesObjectExist(bucketName,fileName)){
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
    return  null;
  }

  private File convertMultiPartToFile(MultipartFile file ) throws IOException
  {
    File convFile = new File( file.getOriginalFilename() );
    FileOutputStream fos = new FileOutputStream( convFile );
    fos.write( file.getBytes() );
    fos.close();
    return convFile;
  }
}
