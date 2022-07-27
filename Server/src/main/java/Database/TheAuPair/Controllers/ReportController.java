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

  @PostMapping("/getReportsForAuPair")
  @CrossOrigin(origins = "http://localhost:4200")
  public List<Report> getReportsForAuPair(@RequestBody String id)
  {
    return this.repServ.getReportsForAuPair(id);
  }

  @PostMapping("/deleteReport")
  @CrossOrigin(origins = "http://localhost:4200")
  public void deleteReport(@RequestBody String id)
  {
    this.repServ.deleteReport(id);
  }
}
