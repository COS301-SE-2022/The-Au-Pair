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

  public auPair getAuPair(String id)
  {
    auPair ap =  apr.findUsingId(id);
    return ap;
  }
}
