package Database.TheAuPair;

import Database.TheAuPair.Models.Activity;
import Database.TheAuPair.Repositories.ActivityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
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

  String id;
  List<Activity> expectedList;

  @BeforeEach
  public void setUp()
  {
    expectedList = new ArrayList<Activity>();
    id = "8675945310542";
  }

  @Test
  @DisplayName("Test if a list of activities are is returned")
  public void testfindAllByChild()
  {
    assertEquals(ar.findAllByChild(id, Sort.by(Sort.Direction.ASC, "timeStart")).getClass(),expectedList.getClass());
  }
}
