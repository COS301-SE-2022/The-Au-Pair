package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.auPair;
import Database.TheAuPair.Repositories.auPairRepository;
import Database.TheAuPair.Services.auPairService;
import org.springframework.web.bind.annotation.*;

@RestController
public class auPairController
{
  private auPairService aps;

  public auPairController(auPairRepository apr)
  {
    this.aps = new auPairService(apr);
  }

  @PostMapping("/getAuPair")
  @CrossOrigin(origins = "http://localhost:4200")
  public auPair getAuPair(@RequestBody String id)
  {
    auPair ap =  aps.getAuPair(id);
    return ap;
  }
}
