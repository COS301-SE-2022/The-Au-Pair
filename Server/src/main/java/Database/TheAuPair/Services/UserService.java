package Database.TheAuPair.Services;

import Database.TheAuPair.Models.User;
import Database.TheAuPair.Repositories.UserRepository;

public class UserService
{
  private UserRepository ur;

  public UserService(UserRepository ur)
  {
    this.ur = ur;
  }

  public User getUser(String id)
  {
    User u =  ur.findUsingId(id);
    return u;
  }

  public void updateUser(User u)
  {
    ur.save(u);
  }
}
