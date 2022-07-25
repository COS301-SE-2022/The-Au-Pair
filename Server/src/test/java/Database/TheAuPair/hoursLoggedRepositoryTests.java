package Database.TheAuPair;

import Database.TheAuPair.Models.hoursLogged;
import Database.TheAuPair.Repositories.hoursLoggedRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Sort;
import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class hoursLoggedRepositoryTests
{
  @Autowired
  hoursLoggedRepository hlr;

  String hid;
  String uid;
  String date;
  List<hoursLogged> expectedList;
  hoursLogged expectedHoursLogged;

  @BeforeEach
  public void setup()
  {
    expectedHoursLogged = new hoursLogged("","","","","");
    expectedList = new ArrayList<hoursLogged>();
    uid =  "7542108615984";
    hid = "34g9n8ayi2rnh4h1odqa784m";
    date = "07/06/2022";
  }

  @Test
  @DisplayName("Test if an hourlogged object is returned")
  public void testfindUsingId()
  {
    assertEquals(hlr.findUsingId(hid).getClass(),expectedHoursLogged.getClass());
  }

  @Test
  @DisplayName("Test if a list of hoursLogged is returned")
  public void testfindAllByUserId()
  {
    assertEquals(hlr.findAllByUserId(uid, Sort.by(Sort.Direction.DESC, "date")).getClass(),expectedList.getClass());
  }

  @Test
  @DisplayName("Test if a list of hoursLogged is returned")
  public void testfindAllByUserIdAndDate()
  {
    assertEquals(hlr.findAllByUserIdAndDate(uid, date, Sort.by(Sort.Direction.ASC, "timeStart")).getClass(),expectedList.getClass());
  }
}
