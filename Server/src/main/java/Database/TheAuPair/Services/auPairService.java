package Database.TheAuPair.Services;

import java.util.List;

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

  public void updateAuPair(auPair p)
  {
    apr.save(p);
  }

  public List<auPair> getAllAuPairs()
  {
    List<auPair> auPairs = apr.findAll();
    return auPairs;
  }
  
  public void deleteAuPair(String id)
  {
    apr.deleteById(id);
  }

  public void addAuPair(auPair a)
  {
    apr.save(a);
  }
}
