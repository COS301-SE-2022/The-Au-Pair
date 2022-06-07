package Database.TheAuPair.Services;

import Database.TheAuPair.Models.Activity;
import Database.TheAuPair.Models.medAid;
import Database.TheAuPair.Repositories.medAidRepository;

public class medAidService
{
  private medAidRepository mr;

  public medAidService(medAidRepository mr)
  {
    this.mr = mr;
  }

  public medAid getMedAid(String id)
  {
    medAid m = mr.findUsingId(id);
    return m;
  }

  public void updateMedAid(medAid m)
  {
    mr.save(m);
  }
}
