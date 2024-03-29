package Database.TheAuPair.Models;
import java.util.Arrays;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("Au-Pair")
public class auPair
{
  @Id
  private String id;

  @Field("rating")
  private double rating[];
  @Field("payRate")
  private double payRate;
  @Field("distTraveled")
  private double distTraveled;
  @Field("costIncurred")
  private double costIncurred;
  @Field("onShift")
  private boolean onShift;
  @Field("employer")
  private String employer;
  @Field("bio")
  private String bio;
  @Field("experience")
  private String experience;
  @Field("currentLong")
  private double currentLong;
  @Field("currentLat")
  private double currentLat;
  @Field("terminateDate")
  private String terminateDate;
  @Field("alreadyOutOfBounds")
  private boolean alreadyOutOfBounds;

  public auPair(String id, double[] rating, double payRate, double distTraveled, double costIncurred, boolean onShift, String employer, String bio, String experience, double currentLong, double currentLat, String terminateDate, boolean alreadyOutOfBounds )
  {
    this.id = id;
    this.rating = Arrays.copyOf(rating, rating.length);
    this.payRate = payRate;
    this.distTraveled = distTraveled;
    this.costIncurred = costIncurred;
    this.onShift = onShift;
    this.employer = employer;
    this.bio = bio;
    this.experience = experience;
    this.currentLong = currentLong;
    this.currentLat = currentLat;
    this.terminateDate = terminateDate;
    this.alreadyOutOfBounds = alreadyOutOfBounds;
  }

  public String getId()
  {
    return id;
  }

  public void setId(String id)
  {
    this.id = id;
  }

  public double[] getRating()
  {
    return rating;
  }

  public void setRating(double[] rating)
  {
    this.rating = rating;
  }

  public double getPayRate()
  {
    return payRate;
  }

  public void setPayRate(double payRate)
  {
    this.payRate = payRate;
  }

  public double getDistTraveled()
  {
    return distTraveled;
  }

  public void setDistTraveled(double distTraveled)
  {
    this.distTraveled = distTraveled;
  }

  public double getCostIncurred()
  {
    return costIncurred;
  }

  public void setCostIncurred(double costIncurred)
  {
    this.costIncurred = costIncurred;
  }

  public boolean isOnShift()
  {
    return onShift;
  }

  public void setOnShift(boolean onShift)
  {
    this.onShift = onShift;
  }

  public String getEmployer()
  {
    return employer;
  }

  public void setEmployer(String employer)
  {
    this.employer = employer;
  }

  public String getBio()
  {
    return bio;
  }

  public void setBio(String bio)
  {
    this.bio = bio;
  }

  public String getExperience()
  {
    return experience;
  }

  public void setExperience(String experience)
  {
    this.experience = experience;
  }

  public double getCurrentLong()
  {
    return this.currentLong;
  }

  public void setCurrentLong(double newLong)
  {
    this.currentLong = newLong;
  }

  public double getCurrentLat()
  {
    return this.currentLat;
  }

  public void setCurrentLat(double newLat)
  {
    this.currentLat = newLat;
  }

  public boolean getAlreadyOutOfBounds()
  {
    return this.alreadyOutOfBounds;
  }

  public void setAlreadyOutOfBounds(boolean alreadyOutOfBounds)
  {
    this.alreadyOutOfBounds = alreadyOutOfBounds;
  }

  public String getTerminateDate()
  {
    return this.terminateDate;
  }

  public void setTerminateDate(String td)
  {
    this.terminateDate = td;
  }

  @Override
  public String toString()
  {
    return "auPair{" +
      "id='" + id + '\'' +
      ", rating=" + Arrays.toString(rating) +
      ", payRate=" + payRate +
      ", distTraveled=" + distTraveled +
      ", costIncurred=" + costIncurred +
      ", onShift=" + onShift +
      ", employer='" + employer +
      ", bio='" + bio +
      ", currentLong='" + currentLong +
      ", currentLat='" + currentLat +
      ", currentLat='" + currentLat +
      ", experience='" + experience +
      '\'' +
      '}';
  }
}