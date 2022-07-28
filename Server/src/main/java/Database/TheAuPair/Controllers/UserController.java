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
  public ResponseEntity<User> getUser(@RequestBody String id, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      return ResponseEntity
        .ok()
        .body(this.us.getUser(id));
    }
  }

  @PostMapping("/editUser")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder editUser(@RequestBody User u, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.us.updateUser(u);
      return ResponseEntity
        .ok();
    }
  }

  @PostMapping("/register")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<String> register(@RequestBody User u, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      return ResponseEntity
        .ok()
        .body(this.us.register(u));
    }
  }

  @PostMapping("/login")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<User> login(@RequestBody Map<String, String> details, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      return ResponseEntity
        .ok()
        .body(this.us.login(details.get("email"), details.get("password")));
    }
  }

  @GetMapping("/getApplicants")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<User>> getApplicants()
  {
      return ResponseEntity
        .ok()
        .body(this.us.getApplicants());
  }

  @PostMapping("/resolveApplication")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder resolveApplication(@RequestBody Map<String, String> decision, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.us.resolveApplication(decision.get("id"), decision.get("resolution"));
      return ResponseEntity
        .ok();
    }
  }
}
