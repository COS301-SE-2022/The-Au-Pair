package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.auPair;
import Database.TheAuPair.Repositories.auPairRepository;
import Database.TheAuPair.Services.auPairService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
public class auPairController
{
  private auPairService aps;

  public auPairController(auPairRepository apr)
  {
    this.aps = new auPairService(apr);
  }

  @PostMapping("/getAuPair")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<auPair> getAuPair(@RequestBody String id, BindingResult bindingResult)
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
        .body(this.aps.getAuPair(id));
    }
  }

  @PostMapping("/editAuPair")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder editAuPair(@RequestBody auPair p, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.aps.updateAuPair(p);
      return ResponseEntity
        .ok();
    }
  }

  @GetMapping("/getAllAuPairs")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<auPair>> getAllAuPairs(BindingResult bindingResult)
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
        .body(this.aps.getAllAuPairs());
    }
  }

  @PostMapping("/removeAuPair")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder removeAuPair(@RequestBody String id, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.aps.deleteAuPair(id);
      return ResponseEntity
        .ok();
    }
  }

  @PostMapping("/addAuPair")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder addAuPair(@RequestBody auPair a, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.aps.addAuPair(a);
      return ResponseEntity
        .ok();
    }
  }
}
