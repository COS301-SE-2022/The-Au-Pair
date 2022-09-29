package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.auPair;
import Database.TheAuPair.Repositories.auPairRepository;
import Database.TheAuPair.Services.auPairService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class auPairController
{
  private auPairService aps;

  public auPairController(auPairRepository apr)
  {
    this.aps = new auPairService(apr);
  }

  @PostMapping("/api/getAuPair")
  public auPair getAuPair(@RequestBody String id)
  {
    return this.aps.getAuPair(id);
  }

  @PostMapping("/api/editAuPair")
  public void editAuPair(@RequestBody auPair p)
  {
    this.aps.updateAuPair(p);
  }

  @GetMapping("/api/getAllAuPairs")
  public List<auPair> getAllAuPairs()
  {
    return this.aps.getAllAuPairs();
  }

  @PostMapping("/api/removeAuPair")
  public void removeAuPair(@RequestBody String id)
  {
    this.aps.deleteAuPair(id);
  }

  @PostMapping("/api/addAuPair")
  public void addAuPair(@RequestBody auPair a)
  {
    this.aps.addAuPair(a);
  }
}
