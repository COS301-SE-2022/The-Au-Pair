package Database.TheAuPair.Models;

import java.sql.Timestamp;

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
  private Timestamp timestamp;

  public Contract(String parentID, String auPairID)
  {
    this.parentID = parentID;
    this.auPairID = auPairID;
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

  public Timestamp getTimestamp()
  {
    return timestamp;
  }

  public void setTimestamp(Timestamp timestamp)
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
