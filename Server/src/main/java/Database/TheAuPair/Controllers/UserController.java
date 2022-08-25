package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.User;
import Database.TheAuPair.Repositories.UserRepository;
import Database.TheAuPair.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class UserController
{
  private UserService us;

  public UserController(UserRepository ur)
  {
    this.us = new UserService(ur);
  }

  @PostMapping("/getUser")
  @CrossOrigin(origins = "http://localhost:4200")
  public User getUser(@RequestBody String id)
  {
    return this.us.getUser(id);
  }

  @PostMapping("/editUser")
  @CrossOrigin(origins = "http://localhost:4200")
  public void editUser(@RequestBody User u)
  {
    this.us.updateUser(u);
  }

  @PostMapping("/register")
  @CrossOrigin(origins = "http://localhost:4200")
  public String register(@RequestBody User u)
  {
    return this.us.register(u);
  }

  @PostMapping("/login")
  @CrossOrigin(origins = "http://localhost:4200")
  public User login(@RequestBody Map<String, String> details)
  {
    return this.us.login(details.get("email"), details.get("password"));
  }

  @GetMapping("/getApplicants")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<User> getApplicants()
  {
      return this.us.getApplicants();
  }

  @PostMapping("/resolveApplication")
  @CrossOrigin(origins = "http://localhost:4200")
  public void resolveApplication(@RequestBody Map<String, String> decision)
  {
    this.us.resolveApplication(decision.get("id"), decision.get("resolution"));
  }
}
