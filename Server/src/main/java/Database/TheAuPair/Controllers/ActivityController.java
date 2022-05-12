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
    String id = "";
    boolean valid = false;
    while (!valid)
    {
      id = generateID();
      valid = true;
      for (Activity activity : ar.findAll())
      {
        if (activity.getId().equals(id))
        {
          valid = false;
        }
      }
    }
    a.setId(id);
    ar.save(a);
  }

  @GetMapping("/getSchedule")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<Activity> getSchedule()
  {
    List<Activity> a =  ar.findAllByChild("8675945310542");
    return a;
  }

  public String generateID()
  {
    String AlphaNumericString = "0123456789"+"abcdefghijklmnopqrstuvxyz";
    StringBuilder sb = new StringBuilder(24);

    for (int i = 0; i < 24; i++)
    {
      int index = (int)(AlphaNumericString.length() * Math.random());
      sb.append(AlphaNumericString.charAt(index));
    }

    return sb.toString();
  }
}
