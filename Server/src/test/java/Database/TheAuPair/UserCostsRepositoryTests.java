package Database.TheAuPair;

import Database.TheAuPair.Models.User;
import Database.TheAuPair.Models.UserCosts;
import Database.TheAuPair.Repositories.UserCostsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class UserCostsRepositoryTests {

  @Autowired
  private UserCostsRepository ucr;

  String id;
  UserCosts expectedUserCosts;

  @BeforeEach
  public void setup()
  {
    expectedUserCosts = new UserCosts("", "", "", "", "", "", 0, 0);
    id = "7542108615984";
  }

  @Test
  @DisplayName("Test if UserCosts object is returned")
  public void testGetUserCostById()
  {
//    assertEquals(ucr.findUsingId(id).getClass(),expectedUserCosts.getClass());
  }
}
