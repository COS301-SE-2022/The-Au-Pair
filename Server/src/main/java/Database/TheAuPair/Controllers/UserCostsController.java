package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.UserCosts;
import Database.TheAuPair.Repositories.UserCostsRepository;
import Database.TheAuPair.Services.UserCostsService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserCostsController {
  private UserCostsService ucs;

  public UserCostsController(UserCostsRepository ucr) { this.ucs = new UserCostsService(ucr); }

  @PostMapping("/getCostById")
  public UserCosts getCostById(@RequestBody String id) { return this.ucs.getCostById(id); }

  @GetMapping("/getAllCosts")
  public List<UserCosts> getAllCosts() { return this.ucs.getAllCosts(); }

  @PostMapping("/getCostsForUser")
  public List<UserCosts> getCostsForUser(@RequestBody String uId) { return this.ucs.getCostsForUser(uId); }

  @PostMapping("/getCurrentMonthCostsForJob")
  public List<UserCosts> getCurrentMonthCostsForJob(@RequestBody Map<String, String> details) {
    return this.ucs.getCurrentMonthCostsForJob(details.get("contributerId"), details.get("otherPartyId"));
  }

  @PostMapping("/getTotalMonthCostsForFuel")
  public int getTotalMonthCostsForFuel(@RequestBody Map<String, String> details) {
    return this.ucs.getTotalMonthCostsForFuel(details.get("contributerId"), details.get("otherPartyId"));
  }

  @PostMapping("/getTotalMonthCostsForOvertime")
  public int getTotalMonthCostsForOvertime(@RequestBody Map<String, String> details) {
    return this.ucs.getTotalMonthCostsForOvertime(details.get("contributerId"), details.get("otherPartyId"));
  }

  @PostMapping("/getTotalMonthCostsForOther")
  public int getTotalMonthCostsForOther(@RequestBody Map<String, String> details) {
    return this.ucs.getTotalMonthCostsForOther(details.get("contributerId"), details.get("otherPartyId"));
  }

  @PostMapping("/addUserCost")
  public void addUserCost(@RequestBody UserCosts userCosts) { this.ucs.addUserCost(userCosts); }

  @PostMapping("/removeUserCost")
  public void removeUserCost(@RequestBody String uId) { this.ucs.removeUserCost(uId); }
}
