package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.User;
import Database.TheAuPair.Repositories.UserRepository;
import Database.TheAuPair.Services.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserController
{
  private UserService us;

  public UserController(UserRepository ur)
  {
    this.us = new UserService(ur);
  }

  @PostMapping("/getUser")
  public User getUser(@RequestBody String id)
  {
    return this.us.getUser(id);
  }

  @PostMapping("/editUser")
  public void editUser(@RequestBody User u)
  {
    this.us.updateUser(u);
  }

  @PostMapping("/register")
  public String register(@RequestBody User u)
  {
    return this.us.register(u);
  }

  @PostMapping("/login")
  public User login(@RequestBody Map<String, String> details)
  {
    return this.us.login(details.get("email"), details.get("password"));
  }

  @GetMapping("/getApplicants")
  public List<User> getApplicants()
  {
      return this.us.getApplicants();
  }

  @PostMapping("/resolveApplication")
  public void resolveApplication(@RequestBody Map<String, String> decision)
  {
    this.us.resolveApplication(decision.get("id"), decision.get("resolution"));
  }

  //add a ping endpoint for testing
  @GetMapping("/ping")
  public String ping()
  {
    return "pong";
  }
}
