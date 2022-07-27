package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("Notification")
public class Notification
{
  @Id
  private String id;

  @Field ("parentId")
  private String parentId;
  @Field ("auPairId")
  private String auPairId;
  @Field ("title")
  private String title;
  @Field ("body")
  private String body;
  @Field ("date")
  private String date;
  @Field ("time")
  private String time;

  public Notification(String id, String parentId, String auPairId, String title, String body, String date, String time)
  {
    this.id = id;
    this.parentId = parentId;
    this.auPairId = auPairId;
    this.title = title;
    this.body = body;
    this.date = date;
    this.time = time;
  }

  public String getId()
  {
    return id;
  }

  public void setId(String id)
  {
    this.id = id;
  }

  public String getParentId()
  {
    return parentId;
  }

  public void setParentId(String parentId)
  {
    this.parentId = parentId;
  }

  public String getAuPairId()
  {
    return auPairId;
  }

  public void setAuPairId(String auPairId)
  {
    this.auPairId = auPairId;
  }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getBody()
    {
        return body;
    }

    public void setBody(String body)
    {
        this.body = body;
    }

    public String getDate()
    {
        return date;
    }

    public void setDate(String date)
    {
        this.date = date;
    }

    public String getTime()
    {
        return time;
    }

    public void setTime(String time)
    {
        this.time = time;
    }

    @Override
    public String toString()
    {
        return "Notification{" +
                "id='" + id + '\'' +
                ", parentId='" + parentId + '\'' +
                ", auPairId='" + auPairId + '\'' +
                ", title='" + title + '\'' +
                ", body='" + body + '\'' +
                ", date='" + date + '\'' +
                ", time='" + time + '\'' +
                '}';
    }
}
