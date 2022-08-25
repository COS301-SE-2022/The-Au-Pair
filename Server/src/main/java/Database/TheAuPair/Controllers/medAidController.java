package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.medAid;
import Database.TheAuPair.Repositories.medAidRepository;
import Database.TheAuPair.Services.medAidService;
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
  public medAid getMedAid(@RequestBody String id)
  {
    return this.ms.getMedAid(id);
  }

  @PostMapping("/editMedAid")
  @CrossOrigin(origins = "http://localhost:4200")
  public void editMedAid(@RequestBody medAid m)
  {
    this.ms.updateMedAid(m);
  }
}
