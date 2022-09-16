package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("Reports")
public class Report {
  @Id
  private String id;

  @Field ("reportIssuerId")
  private String reportIssuerId;
  @Field ("reportedUserId")
  private String reportedUserId;
  @Field ("description")
  private String desc;

  public Report(String id, String reportIssuerId, String reportedUserId, String desc) {
    this.id = id;
    this.reportIssuerId = reportIssuerId;
    this.reportedUserId = reportedUserId;
    this.desc = desc;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getIssuerId() {
    return reportIssuerId;
  }

  public void setIssuerId(String reportIssuerId) {
    this.reportIssuerId = reportIssuerId;
  }

  public String getReportedUserId() {
    return reportedUserId;
  }

  public void setReportedUserId(String reportedUserId) {
    this.reportedUserId = reportedUserId;
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
      ", reportIssuerId='" + reportIssuerId + '\'' +
      ", reportedUserId='" + reportedUserId + '\'' +
      ", desc='" + desc + '\'' +
      '}';
  }
}
