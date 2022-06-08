package Database.TheAuPair;

import Database.TheAuPair.Models.auPair;
import Database.TheAuPair.Repositories.auPairRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class auPairRepositoryTests
{
  @Autowired
  auPairRepository apr;

  String id;
  auPair expectedAuPair;

  @BeforeEach
  public void setup()
  {
    double [] week = {1,2,3,4,5,6,7};
    expectedAuPair = new auPair("",0,0,0,0,true,"");
    id = "7542108615984";
  }

  @Test
  @DisplayName("Test if auPair object is returned")
  public void testGetAuPairById()
  {
    assertEquals(apr.findUsingId(id).getClass(),expectedAuPair.getClass());
  }
}
