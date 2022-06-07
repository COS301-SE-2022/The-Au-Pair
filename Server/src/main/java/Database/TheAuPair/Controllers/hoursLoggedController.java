package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.hoursLogged;
import Database.TheAuPair.Services.hoursLoggedService;
import Database.TheAuPair.Repositories.hoursLoggedRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
  public int getDateMinutes(@RequestBody String id, String date)
  {
    int minutes = hls.getDateMinutes(id, date);
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
  public List<hoursLogged> getDateTimes(@RequestBody String id, String date)
  {
    List<hoursLogged> times = hls.getDateTimes(id, date);
    return times;
  }

  @PostMapping("/getAllTimes")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<hoursLogged> getAllTimes(@RequestBody String id)
  {
    List<hoursLogged> times = hls.getAllTimes(id);
    return times;
  }

  @PostMapping("/addHoursLog")
  @CrossOrigin(origins = "http://localhost:4200")
  public void addHoursLog(@RequestBody hoursLogged hl)
  {
    hls.addHoursLog(hl);
  }

  @PostMapping("/updateHoursLog")
  @CrossOrigin(origins = "http://localhost:4200")
  public void updateHoursLog(@RequestBody hoursLogged hl)
  {
    hls.updateHoursLog(hl);
  }
}
