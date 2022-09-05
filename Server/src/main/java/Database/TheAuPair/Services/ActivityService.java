package Database.TheAuPair.Services;

import Database.TheAuPair.Models.Activity;
import Database.TheAuPair.Repositories.ActivityRepository;
import org.springframework.data.domain.Sort;
import java.util.Comparator;
import java.util.List;

public class ActivityService
{
  private ActivityRepository ar;

  public ActivityService(ActivityRepository ar)
  {
    this.ar = ar;
  }

  public Activity getActivity(String id)
  {
    Activity a =  ar.findUsingId(id);
    return a;
  }

  public void updateActivity(Activity a)
  {
    ar.save(a);
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

  public void removeActivity(String id)
  {
    ar.deleteById(id);
  }

  public void removeManyActivities(Activity[] activities)
  {
    for (int i = 0; i < activities.length; i++) 
    {
      this.ar.deleteById(activities[i].getId());
    }
  }

  public List<Activity> getSchedule(String id)
  {
    List<Activity> a =  ar.findAllByChild(id, Sort.by(Sort.Direction.ASC, "timeStart"));
    return a;
  }

  public List<Activity> getAuPairSchedule(String [] children)
  {
    List<Activity> a = ar.findAllByChild(children[0], Sort.by(Sort.Direction.ASC, "timeStart"));
    for (int i = 1; i < children.length; i++)
    {
      a.addAll(ar.findAllByChild(children[i], Sort.by(Sort.Direction.ASC, "timeStart")));
    }
    a.sort(Comparator.comparing(Activity::getTimeStart));
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
