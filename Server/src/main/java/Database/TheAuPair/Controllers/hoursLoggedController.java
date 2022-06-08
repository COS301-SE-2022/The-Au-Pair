package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.hoursLogged;
import Database.TheAuPair.Services.hoursLoggedService;
import Database.TheAuPair.Repositories.hoursLoggedRepository;
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
  public int getDateMinutes(@RequestBody Map<String, String> idAndDate)
  {
    int minutes = hls.getDateMinutes(idAndDate.get("id"), idAndDate.get("date"));
    return minutes;
  }

  @PostMapping("/getAllMinutes")
  @CrossOrigin(origins = "http://localhost:4200")
  public int getAllMinutes(@RequestBody String id)
  {
    int minutes = hls.getAllMinutes(id);
    return minutes;
  }

  @PostMapping("/getDateTimes")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<hoursLogged> getDateTimes(@RequestBody Map<String, String> idAndDate)
  {
    List<hoursLogged> times = hls.getDateTimes(idAndDate.get("id"), idAndDate.get("date"));
    return times;
  }

  @PostMapping("/getAllTimes")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<hoursLogged> getAllTimes(@RequestBody String id)
  {
    List<hoursLogged> times = hls.getAllTimes(id);
    return times;
  }

  @PostMapping("/getStartedLog")
  @CrossOrigin(origins = "http://localhost:4200")
  public String getStartedLog(@RequestBody Map<String, String> idAndDate)
  {
    String id = hls.getStartedLog(idAndDate.get("id"), idAndDate.get("date"));
    return id;
  }

  @PostMapping("/addHoursLog")
  @CrossOrigin(origins = "http://localhost:4200")
  public void addHoursLog(@RequestBody hoursLogged hl)
  {
    hls.addHoursLog(hl);
  }

  @PostMapping("/addTimeEnd")
  @CrossOrigin(origins = "http://localhost:4200")
  public void addTimeEnd(@RequestBody Map<String, String> idAndEnd)
  {
    hls.addTimeEnd(idAndEnd.get("id"), idAndEnd.get("endTime"));
  }

  @PostMapping("/updateHoursLog")
  @CrossOrigin(origins = "http://localhost:4200")
  public void updateHoursLog(@RequestBody hoursLogged hl)
  {
    hls.updateHoursLog(hl);
  }
}
