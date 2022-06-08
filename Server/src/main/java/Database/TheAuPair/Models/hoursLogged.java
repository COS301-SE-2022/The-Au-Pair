package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("Hours_Logged")
public class hoursLogged
{
  @Id
  private String id;

  @Field ("user_id")
  private String user;

  @Field ("date")
  private String date;

  @Field ("timeStart")
  private String timeStart;

  @Field ("timeEnd")
  private String timeEnd;

  public hoursLogged(String id, String user, String date, String timeStart, String timeEnd)
  {
    this.id = id;
    this.user = user;
    this.date = date;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUser() {
    return user;
  }

  public void setUser(String user) {
    this.user = user;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getTimeStart() {
    return timeStart;
  }

  public void setTimeStart(String timeStart) {
    this.timeStart = timeStart;
  }

  public String getTimeEnd() {
    return timeEnd;
  }

  public void setTimeEnd(String timeEnd) {
    this.timeEnd = timeEnd;
  }

  @Override
  public String toString()
  {
    return "hoursLogged{" +
      "id='" + id + '\'' +
      ", user='" + user + '\'' +
      ", date='" + date + '\'' +
      ", timeStart='" + timeStart + '\'' +
      ", timeEnd='" + timeEnd + '\'' +
      '}';
  }
}
