package Database.TheAuPair.Services;

import Database.TheAuPair.Models.Activity;
import Database.TheAuPair.Repositories.ActivityRepository;
import org.springframework.data.domain.Sort;

import java.util.List;

public class ActivityService
{
  private ActivityRepository ar;

  public ActivityService(ActivityRepository ar)
  {
    this.ar = ar;
  }

  public void addActivity(Activity a)
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

  public List<Activity> getSchedule()
  {
    List<Activity> a =  ar.findAllByChild("8675945310542", Sort.by(Sort.Direction.ASC, "timeStart"));
    return a;
  }
}
