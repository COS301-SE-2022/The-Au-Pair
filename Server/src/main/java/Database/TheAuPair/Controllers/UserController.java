package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.User;
import Database.TheAuPair.Repositories.UserRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController
{
  private UserRepository ur;

  public UserController(UserRepository ur)
  {
    this.ur = ur;
  }

  @GetMapping("/getUser")
  @CrossOrigin(origins = "http://localhost:4200")
  public User getUser()
  {
    User u =  ur.findUsingId("7542108615984");
    return u;
  }
}
