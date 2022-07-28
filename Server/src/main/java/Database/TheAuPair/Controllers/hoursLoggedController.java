package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.hoursLogged;
import Database.TheAuPair.Services.hoursLoggedService;
import Database.TheAuPair.Repositories.hoursLoggedRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
public class hoursLoggedController
{
  private final hoursLoggedService hls;

  public hoursLoggedController(hoursLoggedRepository hlr)
  {
    this.hls = new hoursLoggedService(hlr);
  }

  @PostMapping("/getDateMinutes")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Integer> getDateMinutes(@RequestBody Map<String, String> idAndDate, BindingResult bindingResult)
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
        .body(this.hls.getDateMinutes(idAndDate.get("id"), idAndDate.get("date")));
    }
  }

  @PostMapping("/getAllMinutes")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Integer> getAllMinutes(@RequestBody String id, BindingResult bindingResult)
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
        .body(this.hls.getAllMinutes(id));
    }
  }

  @PostMapping("/getMonthMinutes")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Integer> getMonthMinutes(@RequestBody Map<String, String> idAndDate, BindingResult bindingResult)
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
        .body(this.hls.getMonthMinutes(idAndDate.get("id"), idAndDate.get("date")));
    }
  }

  @PostMapping("/getDateTimes")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<hoursLogged>> getDateTimes(@RequestBody Map<String, String> idAndDate, BindingResult bindingResult)
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
        .body(this.hls.getDateTimes(idAndDate.get("id"), idAndDate.get("date")));
    }
  }

  @PostMapping("/getAllTimes")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<hoursLogged>> getAllTimes(@RequestBody String id, BindingResult bindingResult)
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
        .body(this.hls.getAllTimes(id));
    }
  }

  @PostMapping("/getStartedLog")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<String> getStartedLog(@RequestBody Map<String, String> idAndDate, BindingResult bindingResult)
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
        .body(this.hls.getStartedLog(idAndDate.get("id"), idAndDate.get("date")));
    }
  }

  @PostMapping("/addHoursLog")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder addHoursLog(@RequestBody hoursLogged hl, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.hls.addHoursLog(hl);

      return ResponseEntity
        .ok();
    }
  }

  @PostMapping("/addTimeEnd")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder addTimeEnd(@RequestBody Map<String, String> idAndEnd, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.hls.addTimeEnd(idAndEnd.get("id"), idAndEnd.get("endTime"));
      return ResponseEntity
        .ok();
    }
  }

  @PostMapping("/updateHoursLog")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder updateHoursLog(@RequestBody hoursLogged hl, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      hls.updateHoursLog(hl);
      return ResponseEntity
        .ok();
    }
  }
}
