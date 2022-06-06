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

  public User getUser()
  {
    User u =  ur.findUsingId("7542108615984");
    return u;
  }
}
