package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Parent;
import Database.TheAuPair.Repositories.ParentRepository;
import Database.TheAuPair.Services.ParentService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
