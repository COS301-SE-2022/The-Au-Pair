package Database.TheAuPair.Controllers;

import Database.TheAuPair.Services.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class StorageController
{
  @Autowired
  private StorageService ss;

  
}
