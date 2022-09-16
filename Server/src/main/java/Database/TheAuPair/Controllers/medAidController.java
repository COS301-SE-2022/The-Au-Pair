package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.medAid;
import Database.TheAuPair.Repositories.medAidRepository;
import Database.TheAuPair.Services.medAidService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class medAidController
{
  private medAidService ms;

  public medAidController(medAidRepository mr)
  {
    this.ms = new medAidService(mr);
  }

  @PostMapping("/getMedAid")
  public medAid getMedAid(@RequestBody String id)
  {
    return this.ms.getMedAid(id);
  }

  @PostMapping("/editMedAid")
  public void editMedAid(@RequestBody medAid m)
  {
    this.ms.updateMedAid(m);
  }
}
