package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("Reports")
public class Report {
  @Id
  private String id;

  @Field ("issuerId")
  private String issuerId;
  @Field ("auPairId")
  private String auPairId;
  @Field ("description")
  private String desc;

  public Report(String id, String issuerId, String auPairId, String desc) {
    this.id = id;
    this.issuerId = issuerId;
    this.auPairId = auPairId;
    this.desc = desc;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getIssuerId() {
    return issuerId;
  }

  public void setIssuerId(String issuerId) {
    this.issuerId = issuerId;
  }

  public String getAuPairId() {
    return auPairId;
  }

  public void setAuPairId(String auPairId) {
    this.auPairId = auPairId;
  }

  public String getDesc() {
    return desc;
  }

  public void setDesc(String desc) {
    this.desc = desc;
  }

  @Override
  public String toString() {
    return "Report{" +
      "id='" + id + '\'' +
      ", issuerId='" + issuerId + '\'' +
      ", auPairId='" + auPairId + '\'' +
      ", desc='" + desc + '\'' +
      '}';
  }
}
