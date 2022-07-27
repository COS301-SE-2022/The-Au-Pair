package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.medAid;
import Database.TheAuPair.Repositories.medAidRepository;
import Database.TheAuPair.Services.medAidService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
public class medAidController
{
  private medAidService ms;

  public medAidController(medAidRepository mr)
  {
    this.ms = new medAidService(mr);
  }

  @PostMapping("/getMedAid")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<medAid> getMedAid(@RequestBody String id, BindingResult bindingResult)
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
        .body(this.ms.getMedAid(id));
    }
  }

  @PostMapping("/editMedAid")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder editMedAid(@RequestBody medAid m, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.ms.updateMedAid(m);
      return ResponseEntity
        .ok();
    }
  }
}
