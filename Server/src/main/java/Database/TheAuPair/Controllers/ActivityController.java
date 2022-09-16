package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Activity;
import Database.TheAuPair.Repositories.ActivityRepository;
import Database.TheAuPair.Services.ActivityService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ActivityController
{
  private ActivityService as;

  public ActivityController(ActivityRepository ar)
  {
    this.as = new ActivityService(ar);
  }

  @PostMapping("/getActivity")
  public Activity getActivity(@RequestBody String id)
  {
    return this.as.getActivity(id);
  }

  @PostMapping("/addActivity")
  public void addActivity(@RequestBody Activity a)
  {
    this.as.addActivity(a);
  }

  @PostMapping("/editActivity")
  public void editActivity(@RequestBody Activity a)
  {
    this.as.updateActivity(a);
  }

  @PostMapping("/removeActivity")
  public void removeActivity(@RequestBody String id)
  {
    this.as.removeActivity(id);
  }

  @PostMapping("/removeManyActivities")
  public void removeManyActivities(@RequestBody Activity[] activities)
  {
    this.as.removeManyActivities(activities);
  }

  @PostMapping("/getSchedule")
  public List<Activity> getSchedule(@RequestBody String id)
  {
    return this.as.getSchedule(id);
  }

  @PostMapping("/getAuPairSchedule")
  public List<Activity> getAuPairSchedule(@RequestBody String [] children)
  {
    return this.as.getAuPairSchedule(children);
  }
}
