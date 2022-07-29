package Database.TheAuPair;

import Database.TheAuPair.Models.Activity;
import Database.TheAuPair.Repositories.ActivityRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;
import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ActivityRepositoryTests
{
  @Autowired
  ActivityRepository ar;

  String cid;
  String aid;
  Activity expectedActivity;
  List<Activity> expectedList;

  @BeforeEach
  public void setUp()
  {
    expectedActivity = new Activity("","","","","","",0,"",0,"","");
    expectedList = new ArrayList<Activity>();
    cid = "8675945310542";
    aid = "jokslh64u1blmk3sdsry3y4e";
  }

  @Test
  @DisplayName("Test if a list of activities is returned")
  public void testfindAllByChild()
  {
    assertEquals(ar.findAllByChild(cid, Sort.by(Sort.Direction.ASC, "timeStart")).getClass(),expectedList.getClass());
  }

  @Test
  @DisplayName("Test if an Activity object is returned")
  public void testfindUsingId()
  {
    assertEquals(ar.findUsingId(aid).getClass(),expectedActivity.getClass());
  }
}
