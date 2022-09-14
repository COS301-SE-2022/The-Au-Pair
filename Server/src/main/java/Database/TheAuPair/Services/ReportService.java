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

  public List<Report> getReportsForUser(String id)
  {
    List<Report> userReports =  repRepo.findReportedUserId(id);
    return userReports;
  }

  public void deleteReport(String id) {
    repRepo.deleteById(id);
  }

  public void addReport(Report report) {
    String id = "";
    boolean valid = false;
    while (!valid)
    {
      id = generateID();
      valid = true;
      for (Report re : repRepo.findAll())
      {
        if (re.getId().equals(id))
        {
          valid = false;
        }
      }
    }
    report.setId(id);
    repRepo.save(report);
  }

  public String generateID()
  {
    String AlphaNumericString = "0123456789"+"abcdefghijklmnopqrstuvxyz";
    StringBuilder sb = new StringBuilder(24);

    for (int i = 0; i < 24; i++)
    {
      int index = (int)(AlphaNumericString.length() * Math.random());
      sb.append(AlphaNumericString.charAt(index));
    }
    return sb.toString();
  }

}
