package Database.TheAuPair.Services;

import Database.TheAuPair.Models.UserCosts;
import Database.TheAuPair.Repositories.UserCostsRepository;
import org.springframework.data.domain.Sort;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.time.Month;
import java.time.LocalDate;
import java.util.List;

public class UserCostsService {
  private UserCostsRepository costRepo;

  public UserCostsService(UserCostsRepository costRepo) { this.costRepo = costRepo; }

  public UserCosts getCostById(String id) {
    UserCosts userCost = costRepo.findUsingId(id);
    return userCost;
  }

  public List<UserCosts> getAllCosts()
  {
    List<UserCosts> costs = costRepo.findAll();
    return costs;
  }

  public List<UserCosts> getCostsForUser(String uId)
  {
    List<UserCosts> costs = costRepo.findAll();
    return costs;
  }

  public List<UserCosts> getCurrentMonthCostsForJob(String auPairId, String parentId)
  {
    Date date = new Date();
    LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    String month = "" + localDate.getMonthValue();
    String year = "" + localDate.getYear();

    if (month.length() == 1)
      month = "0" + month;

    List<UserCosts> userCosts = costRepo.findAllByContributerAndOther(auPairId, parentId, Sort.by(Sort.Direction.DESC, "date"));
    List<UserCosts> foundCosts = new ArrayList<UserCosts>();

    for (UserCosts cost : userCosts)
    {
      String [] dateString = cost.getDate().split("/");

      if (dateString[1].equals(month) && dateString[2].equals(year)) {
        foundCosts.add(cost);
      }
      else {
        break;
      }
    }
    return foundCosts;
  }

  public void addUserCost(UserCosts userCosts) {
    String id = "";
    boolean valid = false;
    while (!valid)
    {
      id = generateID();
      valid = true;
      for (UserCosts userCost : costRepo.findAll())
      {
        if (userCost.getId().equals(id))
        {
          valid = false;
        }
      }
    }
    userCosts.setId(id);
    costRepo.save(userCosts);
  }

  public void removeUserCost(String id) {
    costRepo.deleteById(id);
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
