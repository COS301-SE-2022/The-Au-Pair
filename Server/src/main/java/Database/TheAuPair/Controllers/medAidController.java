package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.medAid;
import Database.TheAuPair.Repositories.medAidRepository;
import Database.TheAuPair.Services.medAidService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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
  public medAid getMedAid(String id)
  {
    medAid m = ms.getMedAid(id);
    return m;
  }
}
