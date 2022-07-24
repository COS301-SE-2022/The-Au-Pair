package Database.TheAuPair;

import Database.TheAuPair.Models.auPair;
import Database.TheAuPair.Repositories.auPairRepository;

import org.junit.jupiter.api.*;
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

    expectedAuPair = new auPair("",0,0,0,0,true,"","","", 43.0,43.0);
    id = "7542108615984";
  }

  @Test
  @DisplayName("Test if an auPair object is returned")
  public void testGetAuPairById()
  {
    System.out.println("\n \n \n Au pair in repo: " + apr.findUsingId(id).getCurrentLat());
    System.out.println("Test au pair: " + expectedAuPair.getCurrentLat());

    assertEquals(apr.findUsingId(id).getClass(), expectedAuPair.getClass());
  }
}
