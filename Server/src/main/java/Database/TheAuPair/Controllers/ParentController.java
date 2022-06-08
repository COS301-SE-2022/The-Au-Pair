package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Parent;
import Database.TheAuPair.Repositories.ParentRepository;
import Database.TheAuPair.Services.ParentService;
import org.springframework.web.bind.annotation.*;

@RestController
public class ParentController
{
  private ParentService ps;

  public ParentController(ParentRepository pr)
  {
    this.ps = new ParentService(pr);
  }

  @PostMapping("/getParent")
  @CrossOrigin(origins = "http://localhost:4200")
  public Parent getParent(@RequestBody String id)
  {
    Parent p = ps.getParent(id);
    return p;
  }

  @PostMapping("/editParent")
  @CrossOrigin(origins = "http://localhost:4200")
  public void editParent(@RequestBody Parent p)
  {
    this.ps.updateParent(p);
  }
}
