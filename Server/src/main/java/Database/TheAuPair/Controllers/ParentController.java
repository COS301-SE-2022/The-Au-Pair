package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Parent;
import Database.TheAuPair.Repositories.ParentRepository;
import Database.TheAuPair.Services.ParentService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class ParentController
{
  private ParentService ps;

  public ParentController(ParentRepository pr)
  {
    this.ps = new ParentService(pr);
  }

  @PostMapping("/getParent")
  public Parent getParent(@RequestBody String id)
  {
    return this.ps.getParent(id);
  }

  @PostMapping("/editParent")
  public void editParent(@RequestBody Parent p)
  {
    this.ps.updateParent(p);
  }

  @PostMapping("/addParent")
  public void addParent(@RequestBody Parent p)
  {
    this.ps.addParent(p);
  }

  @PostMapping("/getAuPairEmployer")
  public Parent getAuPairEmployer(@RequestBody String id)
  {
    return this.ps.getAuPairEmployer(id);
  }
}
