package Database.TheAuPair.Services;

import Database.TheAuPair.Models.auPair;
import Database.TheAuPair.Repositories.auPairRepository;

public class auPairService
{
  private auPairRepository apr;

  public auPairService(auPairRepository apr)
  {
    this.apr = apr;
  }

  public auPair getAuPair()
  {
    auPair ap =  apr.findUsingId("7542108615984");
    return ap;
  }
}
