package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Parent;
import Database.TheAuPair.Models.medAid;
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

  @GetMapping("/getParent")
  @CrossOrigin(origins = "http://localhost:4200")
  public Parent getParent()
  {
    Parent p = ps.getParent();
    return p;
  }

  @PostMapping("/editParent")
  @CrossOrigin(origins = "http://localhost:4200")
  public void editParent(@RequestBody Parent p)
  {
    this.ps.updateParent(p);
  }
}
