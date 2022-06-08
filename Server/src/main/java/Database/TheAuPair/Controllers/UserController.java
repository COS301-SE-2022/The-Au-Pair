package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.User;
import Database.TheAuPair.Repositories.UserRepository;
import Database.TheAuPair.Services.UserService;
import org.springframework.web.bind.annotation.*;

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
    User u =  us.getUser(id);
    return u;
  }

  @PostMapping("/editUser")
  @CrossOrigin(origins = "http://localhost:4200")
  public void editUser(@RequestBody User u)
  {
    this.us.updateUser(u);
  }

  @PostMapping("/getUserByUserId")
  @CrossOrigin(origins = "http://localhost:4200")
  public User getUserByUserId(@RequestBody String userId)
  {
    User u = us.getUserByUserId(userId);
    return u;
  }
}
