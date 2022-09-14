package Database.TheAuPair;

import Database.TheAuPair.Models.Report;
import Database.TheAuPair.Repositories.ReportRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.ArrayList;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ReportRepositoryTests
{
  @Autowired
  private ReportRepository rr;

  String id;
  ArrayList<Report> expectedList;

  @BeforeEach
  public void setup()
  {
    expectedList = new ArrayList<Report>();
    id = "7542108615984";
  }

  @Test
  @DisplayName("Test if report object is returned")
  public void testGetReportByUserId()
  {
    assertEquals(rr.findReportedUserId(id).getClass(),expectedList.getClass());
  }
}
