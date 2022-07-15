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

  public String register(User u)
  {
    for (User registered : ur.findAll())
    {
      if (registered.getId().equals(u.getId()) || registered.getEmail().equals(u.getEmail()))
      {
        return registered.getEmail();
      }
    }

    SecurityService SS = new  SecurityService();
    String salt = SS.genSalt().toString();
    String hash = SS.genPassword(u.getPassword(), salt.getBytes());

    u.setPassword(hash);
    u.setSalt(salt);
    ur.save(u);
    return "pending";
  }

  public String login(String email, String password)
  {
    for (User registered : ur.findAll())
    {
      if (registered.getEmail().equals(email))
      {
        if (registered.isRegistered())
        {
          SecurityService SS = new SecurityService();
          String hash = SS.genPassword(password, registered.getSalt().getBytes());

          if (hash.equals(registered.getPassword()))
          {
            return registered.getId();
          }
        }
        else
        {
          return "pending";
        }
      }
    }
    return "";
  }
}
