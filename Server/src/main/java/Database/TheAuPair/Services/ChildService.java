package Database.TheAuPair.Services;

import Database.TheAuPair.Models.Child;
import Database.TheAuPair.Repositories.ChildRepository;

import java.util.List;

public class ChildService
{
  private ChildRepository cr;

  public ChildService(ChildRepository cr)
  {
    this.cr = cr;
  }

  public List<Child> getChildren(String id)
  {
    List<Child> c = cr.findAllByParent(id);
    return c;
  }
}
