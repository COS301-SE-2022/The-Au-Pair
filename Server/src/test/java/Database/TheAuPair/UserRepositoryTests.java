package Database.TheAuPair;

import Database.TheAuPair.Models.User;
import Database.TheAuPair.Repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class UserRepositoryTests
{
  @Autowired
  private UserRepository ur;

  String id;
  User expectedUser;

  @BeforeEach
  public void setup()
  {
    expectedUser = new User("","","","","",true,1,"","","", 0, 0, "", "", "", 0, "", "");
    id = "7542108615984";
  }

  @Test
  @DisplayName("Test if user object is returned")
  public void testGetUserById()
  {
    assertEquals(ur.findUsingId(id).getClass(),expectedUser.getClass());
  }
}
