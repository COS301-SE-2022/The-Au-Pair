package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Child;
import Database.TheAuPair.Repositories.ChildRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChildController
{
    private ChildRepository cr;

    public ChildController(ChildRepository cr)
    {
        this.cr = cr;
    }
}
