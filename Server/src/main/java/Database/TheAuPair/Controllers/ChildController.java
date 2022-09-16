package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Child;
import Database.TheAuPair.Repositories.ChildRepository;
import Database.TheAuPair.Services.ChildService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ChildController
{
  private ChildService cs;

  public ChildController(ChildRepository cr)
  {
    this.cs = new ChildService(cr);
  }

  @PostMapping("/getChildren")
  public List<Child> getChildren(@RequestBody String id)
  {
    return this.cs.getChildren(id);
  }

  @PostMapping("/addChild")
  public void addChild(@RequestBody Child c)
  {
    this.cs.addChild(c);
  }

  @PostMapping("/updateChild")
  public void updateChild(@RequestBody Child c)
  {
    this.cs.updateChild(c);
  }

  @PostMapping("/removeChild")
  public void removeChild(@RequestBody String id)
  {
    this.cs.removeChild(id);
  }
}
