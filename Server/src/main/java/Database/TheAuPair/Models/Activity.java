package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("Activities")
public class Activity
{
  @Id
  private String id;

  @Field ("name")
  private String name;
  @Field ("description")
  private String description;
  @Field ("location")
  private String location;
  @Field ("boundary")
  private double boundary;
  @Field("longitude")
  private double longitude;
  @Field("latitude")
  private double latitude;
  @Field ("timeStart")
  private String timeStart;
  @Field ("timeEnd")
  private String timeEnd;
  @Field ("budget")
  private double budget;
  @Field ("comment")
  private String comment;
  @Field ("behavior")
  private int behavior;
  @Field ("day")
  private String day;
  @Field ("child")
  private String child;

  public Activity(String id, String name, String description, String location, double boundary, double longitude, double latitude, String timeStart, String timeEnd, double budget, String comment, int behavior, String day, String child)
  {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.boundary = boundary;
    this.longitude = longitude;
    this.latitude = latitude;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.budget = budget;
    this.comment = comment;
    this.behavior = behavior;
    this.day = day;
    this.child = child;
  }

  public String getId()
  {
    return id;
  }

  public void setId(String id)
  {
    this.id = id;
  }

  public String getName()
  {
    return name;
  }

  public void setName(String name)
  {
    this.name = name;
  }

  public String getDescription()
  {
    return description;
  }

  public void setDescription(String description)
  {
    this.description = description;
  }

  public String getLocation()
  {
    return location;
  }

  public void setLocation(String location)
  {
    this.location = location;
  }

  public String getTimeStart()
  {
    return timeStart;
  }

  public double getBoundary()
  {
    return this.boundary;
  }

  public void setBoundary(double boundary)
  {
    this.boundary = boundary;
  }

  public double getLongitude()
  {
    return this.longitude;
  }

  public void setLongitude(double longitude)
  {
    this.longitude = longitude;
  }

  public double getLatitude()
  {
    return this.latitude;
  }

  public void setLatitude(double latitude)
  {
    this.latitude = latitude;
  }

  public void setTimeStart(String timeStart)
  {
    this.timeStart = timeStart;
  }

  public String getTimeEnd()
  {
    return timeEnd;
  }

  public void setTimeEnd(String timeEnd)
  {
    this.timeEnd = timeEnd;
  }

  public double getBudget()
  {
    return budget;
  }

  public void setBudget(double budget)
  {
    this.budget = budget;
  }

  public String getComment()
  {
    return comment;
  }

  public void setComment(String comment)
  {
    this.comment = comment;
  }

  public int getBehavior()
  {
    return behavior;
  }

  public void setBehavior(int behavior)
  {
    this.behavior = behavior;
  }

  public String getDay()
  {
    return day;
  }

  public void setDay(String day)
  {
    this.day = day;
  }

  public String getChild()
  {
    return child;
  }

  public void setChild(String child)
  {
    this.child = child;
  }

  @Override
  public String toString()
  {
    return "Activity{" +
      "id='" + id + '\'' +
      ", name='" + name + '\'' +
      ", description='" + description + '\'' +
      ", location='" + location + '\'' +
      ", boundary='" + boundary + '\'' +
      ", timeStart='" + timeStart + '\'' +
      ", timeEnd='" + timeEnd + '\'' +
      ", budget=" + budget +
      ", comment='" + comment + '\'' +
      ", behavior='" + behavior + '\'' +
      ", day='" + day + '\'' +
      ", child='" + child + '\'' +
      '}';
  }
}
