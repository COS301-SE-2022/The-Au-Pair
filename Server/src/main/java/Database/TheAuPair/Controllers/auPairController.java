package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.auPair;
import Database.TheAuPair.Repositories.auPairRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class auPairController
{
  private auPairRepository apr;

  public auPairController(auPairRepository apr)
  {
    this.apr = apr;
  }

  @GetMapping("/getAuPair")
  @CrossOrigin(origins = "http://localhost:4200")
  public auPair getAuPair()
  {
    auPair ap =  apr.findUsingId("7542108615984");
    return ap;
  }
}
