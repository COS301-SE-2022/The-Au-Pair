package Database.TheAuPair;

import Database.TheAuPair.Models.Report;
import Database.TheAuPair.Repositories.ReportRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ReportRepositoryTests
{
  @Autowired
  private ReportRepository rr;

  String id;
  Report expectedReport;

  @BeforeEach
  public void setup()
  {
    expectedReport = new Report("","","","");
    id = "7542108615984";
  }

  @Test
  @DisplayName("Test if report object is returned")
  public void testGetReportById()
  {
    assertEquals(rr.findUsingId(id).getClass(),expectedReport.getClass());
  }
}
