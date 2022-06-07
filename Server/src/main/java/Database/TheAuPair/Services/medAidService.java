package Database.TheAuPair.Services;

import Database.TheAuPair.Repositories.medAidRepository;

public class medAidService
{
  private medAidRepository mr;

  public medAidService(medAidRepository mr)
  {
    this.mr = mr;
  }
}
