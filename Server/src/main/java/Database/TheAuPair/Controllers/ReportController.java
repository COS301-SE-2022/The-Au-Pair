package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Report;
import Database.TheAuPair.Repositories.ReportRepository;
import Database.TheAuPair.Services.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReportController {
  private ReportService repServ;

  public ReportController(ReportRepository repoRep) { this.repServ = new ReportService(repoRep); }

  @GetMapping("/getAllReports")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Report>> getAllReports(BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      return ResponseEntity
        .ok()
        .body(this.repServ.getAllReports());
    }

  }

  @PostMapping("/getReportsForAuPair")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Report>> getReportsForAuPair(@RequestBody String id, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      return ResponseEntity
        .ok()
        .body(this.repServ.getReportsForAuPair(id));
    }
  }

  @PostMapping("/deleteReport")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder deleteReport(@RequestBody String id, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.repServ.deleteReport(id);
      return ResponseEntity
        .ok();
    }
  }

  @PostMapping("/addReport")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder addReport(@RequestBody Report rep, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.repServ.addReport(rep);
      return ResponseEntity
        .ok();
    }
  }
}
