package Database.TheAuPair.Services;

import Database.TheAuPair.Models.User;
import Database.TheAuPair.Repositories.UserRepository;

import java.util.List;

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
      if (registered.getId().equals(u.getId()))
      {
        if(registered.getBanned().equals(""))
        {
          return "ID";
        }
        else
        {
          return "Banned " + registered.getBanned();
        }
      }
      else if (registered.getEmail().equals(u.getEmail())){
        if(registered.getBanned().equals(""))
        {
          return registered.getEmail();
        }
        else
        {
          return "Banned " + registered.getBanned();
        }
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

  public User login(String email, String password)
  {
    User nr = new User("","","","","",false,1,"","","", 0, 0, "", "", "", 0, "", "");
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
            return registered;
          }
        }
        else
        {
          nr.setId("pending");
          return nr;
        }
      }
    }
    return nr;
  }

  public List<User> getApplicants()
  {
    List<User> notRegistered =  ur.findAllByType(2, false);
    return notRegistered;
  }

  public void resolveApplication(String id, String resolution)
  {
    if (resolution.equals("approve"))
    {
      User u =  ur.findUsingId(id);
      u.setRegistered(true);
      ur.save(u);
    }
    else if (resolution.equals("decline"))
    {
      ur.deleteById(id);
    }
  }

  public String getFCMToken(String id)
  {
    User u =  ur.findUsingId(id);
    return u.getFcmToken();
  }

  public void setFCMToken(String id, String token)
  {
    User u =  ur.findUsingId(id);
    u.setFcmToken(token);
    ur.save(u);
  }
}
