package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Parent;
import Database.TheAuPair.Repositories.ParentRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ParentController
{
  private ParentRepository pr;

  public ParentController(ParentRepository pr)
  {
    this.pr = pr;
  }
}
