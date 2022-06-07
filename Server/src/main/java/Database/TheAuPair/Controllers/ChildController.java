package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Child;
import Database.TheAuPair.Repositories.ChildRepository;
import Database.TheAuPair.Services.ChildService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChildController
{
  private ChildService cs;

  public ChildController(ChildRepository cr)
  {
    this.cs = new ChildService(cr);
  }

  @PostMapping("/getChildren")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<Child> getChildren(@RequestBody String id)
  {
    List<Child> c = cs.getChildren(id);
    return c;
  }
}
