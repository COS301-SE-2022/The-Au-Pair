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
    if (c == null || c.size() == 0)
    {
      c = cr.findAllByAuPair(id);
    }
    return c;
  }

  public Child addChild(Child c)
  {
    String id = "";
    boolean valid = false;
    while (!valid)
    {
      id = generateID();
      valid = true;
      for (Child child : cr.findAll())
      {
        if (child.getId().equals(id))
        {
          valid = false;
        }
      }
    }
    c.setId(id);
    cr.save(c);
    
    return c;
  }

  public void updateChild(Child c)
  {
    cr.save(c);
  }

  public void removeChild(String id)
  {
    cr.deleteById(id);
  }

  public String generateID()
  {
    String AlphaNumericString = "0123456789"+"abcdefghijklmnopqrstuvxyz";
    StringBuilder sb = new StringBuilder(24);

    for (int i = 0; i < 24; i++)
    {
      int index = (int)(AlphaNumericString.length() * Math.random());
      sb.append(AlphaNumericString.charAt(index));
    }

    return sb.toString();
  }
}
