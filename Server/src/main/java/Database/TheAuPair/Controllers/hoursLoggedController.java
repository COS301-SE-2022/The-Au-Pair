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
  public Integer getDateMinutes(@RequestBody Map<String, String> idAndDate)
  {
    return this.hls.getDateMinutes(idAndDate.get("id"), idAndDate.get("date"));
  }

  @PostMapping("/getAllMinutes")
  @CrossOrigin(origins = "http://localhost:4200")
  public Integer getAllMinutes(@RequestBody String id)
  {
    return this.hls.getAllMinutes(id);
  }

  @PostMapping("/getMonthMinutes")
  @CrossOrigin(origins = "http://localhost:4200")
  public Integer getMonthMinutes(@RequestBody Map<String, String> idAndDate)
  {
    return this.hls.getMonthMinutes(idAndDate.get("id"), idAndDate.get("date"));
  }

  @PostMapping("/getDateTimes")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<hoursLogged> getDateTimes(@RequestBody Map<String, String> idAndDate)
  {
    return this.hls.getDateTimes(idAndDate.get("id"), idAndDate.get("date"));
  }

  @PostMapping("/getAllTimes")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<hoursLogged> getAllTimes(@RequestBody String id)
  {
    return this.hls.getAllTimes(id);
  }

  @PostMapping("/getStartedLog")
  @CrossOrigin(origins = "http://localhost:4200")
  public String getStartedLog(@RequestBody Map<String, String> idAndDate)
  {
    return this.hls.getStartedLog(idAndDate.get("id"), idAndDate.get("date"));
  }

  @PostMapping("/addHoursLog")
  @CrossOrigin(origins = "http://localhost:4200")
  public void addHoursLog(@RequestBody hoursLogged hl)
  {
    this.hls.addHoursLog(hl);
  }

  @PostMapping("/addTimeEnd")
  @CrossOrigin(origins = "http://localhost:4200")
  public void addTimeEnd(@RequestBody Map<String, String> idAndEnd)
  {
    this.hls.addTimeEnd(idAndEnd.get("id"), idAndEnd.get("endTime"));
  }

  @PostMapping("/updateHoursLog")
  @CrossOrigin(origins = "http://localhost:4200")
  public void updateHoursLog(@RequestBody hoursLogged hl)
  {
    this.hls.updateHoursLog(hl);
  }
}
