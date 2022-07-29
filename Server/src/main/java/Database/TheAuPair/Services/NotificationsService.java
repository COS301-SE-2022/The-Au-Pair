package Database.TheAuPair.Services;

import java.util.List;
import Database.TheAuPair.Models.Notification;
import Database.TheAuPair.Repositories.NotificationsRepository;

public class NotificationsService
{
  private NotificationsRepository nr;

  public NotificationsService(NotificationsRepository nr)
  {
    this.nr = nr;
  }

  public List<Notification> getNotifcationsByParentId(String id)
  {
    List<Notification> p = nr.findByParentId(id);
    return p;
  }

  public List<Notification> getNotifcationsByAuPairId(String id)
  {
    List<Notification> p = nr.findByAuPairId(id);
    return p;
  }

  public void logNotification(Notification n)
  {
    String id = "";
    boolean valid = false;
    while (!valid)
    {
      id = generateID();
      valid = true;
      for (Notification activity : nr.findAll())
      {
        if (activity.getId().equals(id))
        {
          valid = false;
        }
      }
    }
    n.setId(id);
    nr.save(n);
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
