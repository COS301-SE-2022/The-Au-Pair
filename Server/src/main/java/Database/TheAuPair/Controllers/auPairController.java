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

  @PostMapping("/editAuPair")
  @CrossOrigin(origins = "http://localhost:4200")
  public void editAuPair(@RequestBody auPair p)
  {
    this.aps.updateAuPair(p);
  }

  @PostMapping("/removeAuPair")
  @CrossOrigin(origins = "http://localhost:4200")
  public void removeAuPair(@RequestBody String id)
  {
    this.aps.deleteAuPair(id);
  }
}
