package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Activity;
import Database.TheAuPair.Repositories.ActivityRepository;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class ActivityController
{
  private ActivityRepository ar;

  public ActivityController(ActivityRepository ar)
  {
    this.ar = ar;
  }

  @PostMapping("/addActivity")
  @CrossOrigin(origins = "http://localhost:4200")
  public void addActivity(@RequestBody Activity a, BindingResult bindingResult)
  {
    ar.save(a);
  }

  @GetMapping("/getSchedule")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<Activity> getSchedule()
  {
    List<Activity> a =  ar.findAllByChild("8675945310542");
    return a;
  }
}
