package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("Contract")
public class Contract
{
  @Id
  private String id;

  @Field("parentID")
  private String parentID;
  @Field("auPairID")
  private String auPairID;
  @Field("timeStamp")
  private String timestamp;

  public Contract(String id, String parentID, String auPairID, String timestamp)
  {
    this.id = id;
    this.parentID = parentID;
    this.auPairID = auPairID;
    this.timestamp = timestamp;
  }

  public String getId()
  {
    return id;
  }

  public void setId(String id)
  {
    this.id = id;
  }

  public String getParentID()
  {
    return parentID;
  }

  public void setParentID(String parentID)
  {
    this.parentID = parentID;
  }

  public String getAuPairID()
  {
    return auPairID;
  }

  public void setAuPairID(String auPairID)
  {
    this.auPairID = auPairID;
  }

  public String getTimestamp()
  {
    return timestamp;
  }

  public void setTimestamp(String timestamp)
  {
    this.timestamp = timestamp;
  }

  @Override
  public String toString()
  {
    return "Contract{" +
      "parentID='" + parentID + '\'' +
      ", auPairID='" + auPairID +
      ", timestamp='" + timestamp +
      '\'' +
      '}';
  }
}
