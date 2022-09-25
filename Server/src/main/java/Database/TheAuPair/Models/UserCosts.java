package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("UserCosts")
public class UserCosts {
  @Id
  private String id;

  @Field ("type")
  private String type;

  @Field ("description")
  private String description;

  @Field ("contributerId")
  private String contributerId;

  @Field ("otherPartyId")
  private String otherPartyId;

  @Field ("date")
  private String date;

  @Field ("metric")
  private double metric;

  @Field ("amount")
  private double amount;

  public UserCosts(String id, String type, String description, String contributerId, String otherPartyId, String date, double metric, double amount) {
    this.id = id;
    this.type = type;
    this.description = description;
    this.otherPartyId = otherPartyId;
    this.contributerId = contributerId;
    this.date = date;
    this.metric = metric;
    this.amount = amount;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getContributerId() {
    return contributerId;
  }

  public void setContributerId(String contributerId) {
    this.contributerId = contributerId;
  }

  public String getOtherPartyId() { return otherPartyId; }

  public void setOtherPartyId(String otherPartyId) { this.otherPartyId = otherPartyId; }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public double getMetric() {
    return metric;
  }

  public void setMetric(double metric) {
    this.metric = metric;
  }

  public double getAmount() {
    return amount;
  }

  public void setAmount(double amount) {
    this.amount = amount;
  }

  @Override
  public String toString() {
    return "UserCosts{" +
      "id='" + id + '\'' +
      ", type='" + type + '\'' +
      ", description='" + description + '\'' +
      ", contributerId='" + contributerId + '\'' +
      ", otherPartyId='" + otherPartyId + '\'' +
      ", date='" + date + '\'' +
      ", metric=" + metric +
      ", amount=" + amount +
      '}';
  }
}
