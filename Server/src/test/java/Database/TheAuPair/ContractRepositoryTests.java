package Database.TheAuPair;

import Database.TheAuPair.Models.Contract;
import Database.TheAuPair.Repositories.ContractRepository;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ContractRepositoryTests
{
  @Autowired
  ContractRepository ctr;

  String id;
  Contract expectedContract;


  @BeforeEach
  public void setup()
  {
    expectedContract = new Contract("","","", "");
    id = "7542108615984";
  }

  @Test
  @DisplayName("Test if an Contract object is returned")
  public void testGetContractById()
  {
    assertEquals(ctr.findUsingId(id).getClass(), expectedContract.getClass());
  }
}
