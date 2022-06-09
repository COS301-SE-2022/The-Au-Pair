package Database.TheAuPair;

import Database.TheAuPair.Models.Child;
import Database.TheAuPair.Repositories.ChildRepository;;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ChildRepositoryTests
{
  @Autowired
  ChildRepository cr;

  String pid;
  String apid;
  List<Child> expectedList;

  @BeforeEach
  public void setup()
  {
    expectedList = new ArrayList<Child>();
    apid =  "7542108615984";
    pid = "4561237814867";
  }

  @Test
  @DisplayName("Test if a list of children is returned")
  public void testfindAllByParent()
  {
    assertEquals(cr.findAllByParent(pid).getClass(),expectedList.getClass());
  }

  @Test
  @DisplayName("Test if a list of children is returned")
  public void testfindAllByAuPair()
  {
    assertEquals(cr.findAllByAuPair(apid).getClass(),expectedList.getClass());
  }
}
