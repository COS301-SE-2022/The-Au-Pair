package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.hoursLogged;
import Database.TheAuPair.Services.hoursLoggedService;
import Database.TheAuPair.Repositories.hoursLoggedRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class hoursLoggedController
{
  private final hoursLoggedService hls;

  public hoursLoggedController(hoursLoggedRepository hlr)
  {
    this.hls = new hoursLoggedService(hlr);
  }

  @PostMapping("/api/getDateMinutes")
  public Integer getDateMinutes(@RequestBody Map<String, String> idAndDate)
  {
    return this.hls.getDateMinutes(idAndDate.get("id"), idAndDate.get("date"));
  }

  @PostMapping("/api/getAllMinutes")
  public Integer getAllMinutes(@RequestBody String id)
  {
    return this.hls.getAllMinutes(id);
  }

  @PostMapping("/api/getMonthMinutes")
  public Integer getMonthMinutes(@RequestBody Map<String, String> idAndDate)
  {
    return this.hls.getMonthMinutes(idAndDate.get("id"), idAndDate.get("date"));
  }

  @PostMapping("/api/getDateTimes")
  public List<hoursLogged> getDateTimes(@RequestBody Map<String, String> idAndDate)
  {
    return this.hls.getDateTimes(idAndDate.get("id"), idAndDate.get("date"));
  }

  @PostMapping("/api/getAllTimes")
  public List<hoursLogged> getAllTimes(@RequestBody String id)
  {
    return this.hls.getAllTimes(id);
  }

  @PostMapping("/api/getStartedLog")
  public String getStartedLog(@RequestBody Map<String, String> idAndDate)
  {
    return this.hls.getStartedLog(idAndDate.get("id"), idAndDate.get("date"));
  }

  @PostMapping("/api/addHoursLog")
  public void addHoursLog(@RequestBody hoursLogged hl)
  {
    this.hls.addHoursLog(hl);
  }

  @PostMapping("/api/addTimeEnd")
  public void addTimeEnd(@RequestBody Map<String, String> idAndEnd)
  {
    this.hls.addTimeEnd(idAndEnd.get("id"), idAndEnd.get("endTime"));
  }

  @PostMapping("/api/updateHoursLog")
  public void updateHoursLog(@RequestBody hoursLogged hl)
  {
    this.hls.updateHoursLog(hl);
  }
}
