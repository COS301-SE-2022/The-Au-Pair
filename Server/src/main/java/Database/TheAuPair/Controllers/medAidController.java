package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.medAid;
import Database.TheAuPair.Repositories.medAidRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class medAidController
{
  private medAidRepository medAid;

  public medAidController(medAidRepository medAid)
  {
    this.medAid = medAid;
  }
}
