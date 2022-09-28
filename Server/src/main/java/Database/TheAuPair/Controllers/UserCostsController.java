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

  @PostMapping("/api/getCostById")
  public UserCosts getCostById(@RequestBody String id) { return this.ucs.getCostById(id); }

  @GetMapping("/api/getAllCosts")
  public List<UserCosts> getAllCosts() { return this.ucs.getAllCosts(); }

  @PostMapping("/api/getCostsForUser")
  public List<UserCosts> getCostsForUser(@RequestBody String uId) { return this.ucs.getCostsForUser(uId); }

  @PostMapping("/api/getCurrentMonthCostsForJob")
  public List<UserCosts> getCurrentMonthCostsForJob(@RequestBody Map<String, String> details) {
    return this.ucs.getCurrentMonthCostsForJob(details.get("contributerId"), details.get("otherPartyId"));
  }

  @PostMapping("/api/addUserCost")
  public String addUserCost(@RequestBody UserCosts userCosts) { return this.ucs.addUserCost(userCosts); }

  @PostMapping("/api/removeUserCost")
  public void removeUserCost(@RequestBody String uId) { this.ucs.removeUserCost(uId); }
}
