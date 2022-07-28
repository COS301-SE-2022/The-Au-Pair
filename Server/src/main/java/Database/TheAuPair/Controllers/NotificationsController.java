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
  public ResponseEntity<List<Notification>> getNotifcationsByAuPairId(@RequestBody String id, BindingResult bindingResult)
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
        .body(this.ns.getNotifcationsByAuPairId(id));
    }
  }

  @PostMapping("/getNotifcationsByParentId")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Notification>> getNotifcationsByParentId(@RequestBody String id, BindingResult bindingResult)
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
        .body(this.ns.getNotifcationsByParentId(id));
    }
  }

  @PostMapping("/logNotification")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder logNotification(@RequestBody Notification n, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.ns.logNotification(n);
      return ResponseEntity
        .ok();
    }
  }
}
