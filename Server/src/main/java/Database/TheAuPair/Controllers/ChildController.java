package Database.TheAuPair.Controllers;

import Database.TheAuPair.Repositories.ChildRepository;
import Database.TheAuPair.Services.ChildService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChildController
{
  private ChildService cs;

  public ChildController(ChildRepository cr)
  {
    this.cs = new ChildService(cr);
  }
}
