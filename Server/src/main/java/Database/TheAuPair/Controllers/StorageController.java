package Database.TheAuPair.Controllers;

import Database.TheAuPair.Services.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
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

  @PostMapping("/getFile")
  public ResponseEntity<ByteArrayResource> downloadFile(@RequestBody String filename)
  {
    byte[] data = ss.downloadFile(filename);
    ByteArrayResource resource = new ByteArrayResource(data);
    return ResponseEntity
      .ok()
      .contentLength(data.length)
      .header("Content-type", "application/octet-stream")
      .header("Content-disposition", "attachment; filename=\"" + filename + "\"")
      .body(resource);
  }
}
