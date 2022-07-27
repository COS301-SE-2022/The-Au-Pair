package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Child;
import Database.TheAuPair.Repositories.ChildRepository;
import Database.TheAuPair.Services.ChildService;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class ChildController
{
  private ChildService cs;

  public ChildController(ChildRepository cr)
  {
    this.cs = new ChildService(cr);
  }

  @PostMapping("/getChildren")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Child>> getChildren(@RequestBody String id, BindingResult bindingResult)
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
        .body(this.cs.getChildren(id));
    }
  }

  @PostMapping("/addChild")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder addChild(@RequestBody Child c, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.cs.addChild(c);
      return ResponseEntity
        .ok();
    }
  }

  @PostMapping("/updateChild")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder updateChild(@RequestBody Child c, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.cs.updateChild(c);
      return ResponseEntity
        .ok();
    }
  }
}
