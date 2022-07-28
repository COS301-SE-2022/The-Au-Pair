package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Notification;
import Database.TheAuPair.Repositories.NotificationsRepository;
import Database.TheAuPair.Services.NotificationsService;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class NotificationsController
{
  private NotificationsService ns;

  public NotificationsController(NotificationsRepository nr)
  {
    this.ns = new NotificationsService(nr);
  }

  @PostMapping("/getNotifcationsByAuPairId")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<Notification> getNotifcationsByAuPairId(@RequestBody String id)
  {
    return this.ns.getNotifcationsByAuPairId(id);
  }

  @PostMapping("/getNotifcationsByParentId")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<Notification> getNotifcationsByParentId(@RequestBody String id)
  {
    return this.ns.getNotifcationsByParentId(id);
  }

  @PostMapping("/logNotification")
  @CrossOrigin(origins = "http://localhost:4200")
  public void logNotification(@RequestBody Notification n)
  {
    this.ns.logNotification(n);
  }
}
