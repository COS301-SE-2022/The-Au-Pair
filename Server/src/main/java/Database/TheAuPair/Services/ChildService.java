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
    if (c == null)
    {
      c = cr.findAllByAuPair(id);
    }
    return c;
  }

  public void addChild(Child c)
  {
    cr.save(c);
  }
}
