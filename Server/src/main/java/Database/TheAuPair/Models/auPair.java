package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Arrays;

@Document("Au-Pair")
public class auPair
{
  @Id
  private String id;

  @Field("rating")
  private double rating;
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
  @Field("hoursWorked")
  private String hoursWorked;
  @Field ("currentWeek")
  private double currWeek[];

  public auPair(String id, double rating, double payRate, double distTraveled, double costIncurred, boolean onShift, String employer, String hoursWorked, double[] currWeek)
  {
    this.id = id;
    this.rating = rating;
    this.payRate = payRate;
    this.distTraveled = distTraveled;
    this.costIncurred = costIncurred;
    this.onShift = onShift;
    this.employer = employer;
    this.hoursWorked = hoursWorked;
    this.currWeek = Arrays.copyOf(currWeek, currWeek.length);
  }

  public String getId()
  {
    return id;
  }

  public void setId(String id)
  {
    this.id = id;
  }

  public double getRating()
  {
    return rating;
  }

  public void setRating(double rating)
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

  public String getHoursWorked()
  {
    return hoursWorked;
  }

  public void setHoursWorked(String hoursWorked)
  {
    this.hoursWorked = hoursWorked;
  }

  public double[] getCurrWeek()
  {
    return currWeek;
  }

  public void setCurrWeek(double[] currWeek)
  {
    this.currWeek = currWeek;
  }

  @Override
  public String toString()
  {
    return "auPair{" +
      "id='" + id + '\'' +
      ", rating=" + rating +
      ", payRate=" + payRate +
      ", distTraveled=" + distTraveled +
      ", costIncurred=" + costIncurred +
      ", onShift=" + onShift +
      ", employer='" + employer + '\'' +
      ", hoursWorked='" + hoursWorked + '\'' +
      ", currWeek=" + Arrays.toString(currWeek) +
      '}';
  }
}
