package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Activity;
import Database.TheAuPair.Repositories.ActivityRepository;
import Database.TheAuPair.Services.ActivityService;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity<Activity> getActivity(@RequestBody String id, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      return ResponseEntity
        .ok()
        .body(as.getActivity(id));
    }
  }

  @PostMapping("/addActivity")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder addActivity(@RequestBody Activity a, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.as.addActivity(a);
      return ResponseEntity
        .ok();
    }
  }

  @PostMapping("/editActivity")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder editActivity(@RequestBody Activity a, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.as.updateActivity(a);
      return ResponseEntity
        .ok();
    }
  }

  @PostMapping("/getSchedule")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Activity>> getSchedule(@RequestBody String id, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      return ResponseEntity
        .ok()
        .body(as.getSchedule(id));
    }
  }

  @PostMapping("/getAuPairSchedule")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Activity>> getAuPairSchedule(@RequestBody String [] children, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      return ResponseEntity
        .ok()
        .body(as.getAuPairSchedule(children));
    }
  }
}
