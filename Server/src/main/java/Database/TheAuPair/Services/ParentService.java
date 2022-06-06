package Database.TheAuPair.Services;

import Database.TheAuPair.Models.Parent;
import Database.TheAuPair.Repositories.ParentRepository;

public class ParentService
{
  private ParentRepository pr;

  public ParentService(ParentRepository pr)
  {
    this.pr = pr;
  }

  public Parent getParent()
  {
    Parent p = pr.findUsingId("4561237814867");
    return p;
  }
}
