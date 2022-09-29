package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Report;
import Database.TheAuPair.Repositories.ReportRepository;
import Database.TheAuPair.Services.ReportService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ReportController {
  private ReportService repServ;

  public ReportController(ReportRepository repoRep) { this.repServ = new ReportService(repoRep); }

  @GetMapping("/api/getAllReports")
  public List<Report> getAllReports()
  {
    return this.repServ.getAllReports();
  }

  @PostMapping("/api/getReportsForUser")
  public List<Report> getReportsForUser(@RequestBody String id)
  {
      return this.repServ.getReportsForUser(id);
  }

  @PostMapping("/api/deleteReport")
  public void deleteReport(@RequestBody String id)
  {
      this.repServ.deleteReport(id);
  }

  @PostMapping("/api/addReport")
  public void addReport(@RequestBody Report rep)
  {
      this.repServ.addReport(rep);
  }
}
