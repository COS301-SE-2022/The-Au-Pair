package Database.TheAuPair.Controllers;

import Database.TheAuPair.Services.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*")
public class StorageController
{
  @Autowired
  private StorageService ss;

  @PostMapping("/uploadFile")
  public String upload(@RequestParam("file") MultipartFile file)
  {
    return ss.uploadFile(file);
  }
}
