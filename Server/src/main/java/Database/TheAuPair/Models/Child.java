package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("Children")
public class Child
{
  @Id
  private String id;

  @Field ("name")
  private String fname;
  @Field ("surname")
  private String sname;
  @Field ("dob")
  private String dob;
  @Field ("allergies")
  private String allergies;
  @Field ("diet")
  private String diet;
  @Field ("parent")
  private String parent;
  @Field ("aupair")
  private String aupair;

  public Child(String id, String fname, String sname, String dob, String allergies, String diet, String parent, String aupair)
  {
    this.id = id;
    this.fname = fname;
    this.sname = sname;
    this.dob = dob;
    this.allergies = allergies;
    this.diet = diet;
    this.parent = parent;
    this.aupair = aupair;
  }

  public String getId()
  {
    return id;
  }

  public void setId(String id)
  {
    this.id = id;
  }

  public String getFname()
  {
    return fname;
  }

  public void setFname(String fname)
  {
    this.fname = fname;
  }

  public String getSname()
  {
    return sname;
  }

  public void setSname(String sname)
  {
    this.sname = sname;
  }

  public String getDob()
  {
    return dob;
  }

  public void setDob(String dob)
  {
    this.dob = dob;
  }

  public String getAllergies()
  {
    return allergies;
  }

  public void setAllergies(String allergies)
  {
    this.allergies = allergies;
  }

  public String getDiet()
  {
    return diet;
  }

  public void setDiet(String diet)
  {
    this.diet = diet;
  }

  public String getParent()
  {
    return parent;
  }

  public void setParent(String parent)
  {
    this.parent = parent;
  }

  public String getAupairID()
  {
    return aupair;
  }

  public void setAupairID(String aupairID)
  {
    this.aupair = aupairID;
  }

  @Override
  public String toString()
  {
    return "Child{" +
      "id='" + id + '\'' +
      ", fname='" + fname + '\'' +
      ", sname='" + sname + '\'' +
      ", dob='" + dob + '\'' +
      ", allergies=" + allergies + '\'' +
      ", diet='" + diet + '\'' +
      ", parent='" + parent + '\'' +
      ", aupairID='" + aupair + '\'' +
      '}';
  }
}
