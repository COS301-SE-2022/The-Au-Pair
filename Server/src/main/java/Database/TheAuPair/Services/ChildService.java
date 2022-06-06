package Database.TheAuPair.Services;

import Database.TheAuPair.Repositories.ChildRepository;

public class ChildService
{
  private ChildRepository cr;

  public ChildService(ChildRepository cr)
  {
    this.cr = cr;
  }
}
