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
}
