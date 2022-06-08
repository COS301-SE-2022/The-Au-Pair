package Database.TheAuPair.Services;

import Database.TheAuPair.Models.hoursLogged;
import Database.TheAuPair.Repositories.hoursLoggedRepository;
import org.springframework.data.domain.Sort;
import java.util.List;

public class hoursLoggedService
{
  private final hoursLoggedRepository hlr;

  public hoursLoggedService(hoursLoggedRepository hlr) {
    this.hlr = hlr;
  }

  public void addHoursLog(hoursLogged hl)
  {
    String id = "";
    boolean valid = false;
    while (!valid)
    {
      id = generateID();
      valid = true;
      for (hoursLogged hourLog : hlr.findAll())
      {
        if (hourLog.getId().equals(id))
        {
          valid = false;
        }
      }
    }
    hl.setId(id);
    hlr.save(hl);
  }

  public void addTimeEnd(String id,String endTime) {
    hoursLogged hl = hlr.findUsingId(id);
    hl.setTimeEnd(endTime);
    hlr.save(hl);
  }

  public void updateHoursLog(hoursLogged hl)
  {
    hlr.save(hl);
  }

  public String getStartedLog(String id, String date) {
    List<hoursLogged> hl = hlr.findAllByUserIdAndDate(id, date, Sort.by(Sort.Direction.ASC, "timeStart"));
    for (hoursLogged hourLog : hl)
    {
      if(hourLog.getTimeEnd() == null || hourLog.getTimeEnd().equals(""))
      {
        return hourLog.getId();
      }
    }
    return "";
  }

  public int getDateMinutes(String id, String date)
  {
    List<hoursLogged> hl = hlr.findAllByUserIdAndDate(id, date, Sort.by(Sort.Direction.ASC, "timeStart"));

    int minuteSum = 0;
    for (hoursLogged hourLog : hl)
    {
      String [] ts = hourLog.getTimeStart().split(":");
      if (hourLog.getTimeEnd() == null || hourLog.getTimeEnd().equals(""))
        continue;

      String [] te = hourLog.getTimeEnd().split(":");
      minuteSum += (Integer.parseInt(te[0]) - Integer.parseInt(ts[0]))*60;
      minuteSum += Integer.parseInt(te[1]) - Integer.parseInt(ts[1]);
    };
    return minuteSum;
  }

  public int getAllMinutes(String id)
  {
    List<hoursLogged> hl = hlr.findAllByUserId(id, Sort.by(Sort.Direction.DESC, "date"));

    int minuteSum = 0;
    for (hoursLogged hourLog : hl)
    {
      String [] ts = hourLog.getTimeStart().split(":");
      if (hourLog.getTimeEnd() == null || hourLog.getTimeEnd().equals(""))
        continue;

      String [] te = hourLog.getTimeEnd().split(":");
      minuteSum += (Integer.parseInt(te[0]) - Integer.parseInt(ts[0]))*60;
      minuteSum += Integer.parseInt(te[1]) - Integer.parseInt(ts[1]);
    };

    return minuteSum;
  }

  public int getMonthMinutes(String id, String date)
  {
    List<hoursLogged> hl = hlr.findAllByUserId(id, Sort.by(Sort.Direction.DESC, "date"));

    String monthIn = date.split("/")[1];

    int minuteSum = 0;
    for (hoursLogged hourLog : hl)
    {
      String [] dateString = hourLog.getDate().split("/");

      if (dateString[1].equals(monthIn)) {
        String [] ts = hourLog.getTimeStart().split(":");
        if (hourLog.getTimeEnd() == null || hourLog.getTimeEnd().equals(""))
          continue;

        String [] te = hourLog.getTimeEnd().split(":");
        minuteSum += (Integer.parseInt(te[0]) - Integer.parseInt(ts[0]))*60;
        minuteSum += Integer.parseInt(te[1]) - Integer.parseInt(ts[1]);
      }
      else {
        break;
      }
    }
    return minuteSum;
  }

  public List<hoursLogged> getDateTimes(String id, String date)
  {
    List<hoursLogged> hl = hlr.findAllByUserIdAndDate(id, date, Sort.by(Sort.Direction.ASC, "timeStart"));
    return hl;
  }

  public List<hoursLogged> getAllTimes(String id)
  {
    List<hoursLogged> hl = hlr.findAllByUserId(id, Sort.by(Sort.Direction.DESC, "date"));
    return hl;
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
