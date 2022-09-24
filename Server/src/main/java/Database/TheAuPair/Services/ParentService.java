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

  public Parent getParent(String id)
  {
    Parent p = pr.findUsingId(id);
    return p;
  }

  public void updateParent(Parent p)
  {
    pr.save(p);
  }

  public void addParent(Parent p)
  {
    pr.save(p);
  }

  public Parent getAuPairEmployer(String id)
  {
    Parent p = pr.findAuPair(id);
    return p;
  }
}
