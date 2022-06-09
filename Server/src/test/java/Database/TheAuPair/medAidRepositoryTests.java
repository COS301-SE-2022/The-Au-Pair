package Database.TheAuPair;

import Database.TheAuPair.Models.medAid;
import Database.TheAuPair.Repositories.medAidRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class medAidRepositoryTests
{
  @Autowired
  medAidRepository mr;

  String id;
  medAid expectedMedAid;

  @BeforeEach
  public void setup()
  {
    expectedMedAid = new medAid("","","","","","");
    id = "7534286951";
  }

  @Test
  @DisplayName("Test if medAid object is returned")
  public void testfindUsingId()
  {
    assertEquals(mr.findUsingId(id).getClass(),expectedMedAid.getClass());
  }
}
