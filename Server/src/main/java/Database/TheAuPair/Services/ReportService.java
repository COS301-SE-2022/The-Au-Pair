package Database.TheAuPair.Services;

import Database.TheAuPair.Models.Report;
import Database.TheAuPair.Repositories.ReportRepository;

import java.util.List;

public class ReportService {
  private ReportRepository repRepo;

  public ReportService(ReportRepository repRepo) { this.repRepo = repRepo; }

  public List<Report> getAllReports()
  {
    List<Report> reports = repRepo.findAll();
    return  reports;
  }

  public List<Report> getReportsForAuPair(String id)
  {
    List<Report> auPairReports =  repRepo.findUsingAuPairId(id);
    return auPairReports;
  }

  public void deleteReport(String id) { repRepo.deleteById(id); }

  public void addReport(Report report) { repRepo.save(report); }

}
