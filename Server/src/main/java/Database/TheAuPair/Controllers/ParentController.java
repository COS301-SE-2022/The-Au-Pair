package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Parent;
import Database.TheAuPair.Repositories.ParentRepository;
import Database.TheAuPair.Services.ParentService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
public class ParentController
{
  private ParentService ps;

  public ParentController(ParentRepository pr)
  {
    this.ps = new ParentService(pr);
  }

  @PostMapping("/getParent")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Parent> getParent(@RequestBody String id, BindingResult bindingResult)
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
        .body(this.ps.getParent(id));
    }
  }

  @PostMapping("/editParent")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder editParent(@RequestBody Parent p, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.ps.updateParent(p);
      return ResponseEntity
        .ok();
    }
  }

  @PostMapping("/addParent")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder addParent(@RequestBody Parent p, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.ps.addParent(p);
      return ResponseEntity
        .ok();
    }
  }
}
