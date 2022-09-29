package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Notification;
import Database.TheAuPair.Repositories.NotificationsRepository;
import Database.TheAuPair.Services.NotificationsService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class NotificationsController
{
  private NotificationsService ns;

  public NotificationsController(NotificationsRepository nr)
  {
    this.ns = new NotificationsService(nr);
  }

  @PostMapping("/api/getNotifcationsByAuPairId")
  public List<Notification> getNotifcationsByAuPairId(@RequestBody String id)
  {
    return this.ns.getNotifcationsByAuPairId(id);
  }

  @PostMapping("/api/getNotifcationsByParentId")
  public List<Notification> getNotifcationsByParentId(@RequestBody String id)
  {
    return this.ns.getNotifcationsByParentId(id);
  }

  @PostMapping("/api/logNotification")
  public void logNotification(@RequestBody Notification n)
  {
    this.ns.logNotification(n);
  }
}
