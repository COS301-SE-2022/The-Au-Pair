package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Report;
import Database.TheAuPair.Repositories.ReportRepository;
import Database.TheAuPair.Services.ReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReportController {
  private ReportService repServ;

  public ReportController(ReportRepository repoRep) { this.repServ = new ReportService(repoRep); }

  @GetMapping("/getAllReports")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<Report> getAllReports()
  {
    return this.repServ.getAllReports();
  }

  @PostMapping("/getReportsForUser")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<Report> getReportsForUser(@RequestBody String id)
  {
      return this.repServ.getReportsForUser(id);
  }

  @PostMapping("/deleteReport")
  @CrossOrigin(origins = "http://localhost:4200")
  public void deleteReport(@RequestBody String id)
  {
      this.repServ.deleteReport(id);
  }

  @PostMapping("/addReport")
  @CrossOrigin(origins = "http://localhost:4200")
  public void addReport(@RequestBody Report rep)
  {
      this.repServ.addReport(rep);
  }
}
