package Database.TheAuPair;

import Database.TheAuPair.Models.Parent;
import Database.TheAuPair.Repositories.ParentRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ParentRepositoryTests
{
  @Autowired
  ParentRepository  pr;

  String id;
  Parent expectedParent;

  @BeforeEach
  public void setup()
  {
    String [] c = new String[2];
    expectedParent = new Parent("",c,"","");
    id = "4561237814867";
  }

  @Test
  @DisplayName("Test if parent object is returned")
  public void testGetParentById()
  {
    assertEquals(pr.findUsingId(id).getClass(),expectedParent.getClass());
  }
}
