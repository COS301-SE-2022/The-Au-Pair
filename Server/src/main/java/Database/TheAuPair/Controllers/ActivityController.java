package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Activity;
import Database.TheAuPair.Repositories.ActivityRepository;
import Database.TheAuPair.Services.ActivityService;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class ActivityController
{
  private ActivityService as;

  public ActivityController(ActivityRepository ar)
  {
    this.as = new ActivityService(ar);
  }

  @PostMapping("/getActivity")
  @CrossOrigin(origins = "http://localhost:4200")
  public Activity getActivity(@RequestBody String id)
  {
    Activity a =  as.getActivity(id);
    return a;
  }

  @PostMapping("/addActivity")
  @CrossOrigin(origins = "http://localhost:4200")
  public void addActivity(@RequestBody Activity a, BindingResult bindingResult)
  {
    this.as.addActivity(a);
  }

  @PostMapping("/editActivity")
  @CrossOrigin(origins = "http://localhost:4200")
  public void editActivity(@RequestBody Activity a)
  {
    this.as.updateActivity(a);
  }

  @GetMapping("/getSchedule")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<Activity> getSchedule()
  {
    List<Activity> a =  as.getSchedule();
    return a;
  }

  @PostMapping("/getAuPairSchedule")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<Activity> getAuPairSchedule(@RequestBody String [] children)
  {
    List<Activity> a =  as.getAuPairSchedule(children);
    return a;
  }
}
