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
    private String loc;
    @Field ("time_start")
    private String tstart;
    @Field ("time_end")
    private String tend;
    @Field ("budget")
    private double budget;
    @Field ("comment")
    private String com;
    @Field ("behavior")
    private String behavior;
    @Field ("day")
    private String day;

    public Activity(String id, String name, String description, String loc, String tstart, String tend, double budget, String com, String behavior, String day)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.loc = loc;
        this.tstart = tstart;
        this.tend = tend;
        this.budget = budget;
        this.com = com;
        this.behavior = behavior;
        this.day = day;
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

    public String getLoc()
    {
        return loc;
    }

    public void setLoc(String loc)
    {
        this.loc = loc;
    }

    public String getTstart()
    {
        return tstart;
    }

    public void setTstart(String tstart)
    {
        this.tstart = tstart;
    }

    public String getTend()
    {
        return tend;
    }

    public void setTend(String tend)
    {
        this.tend = tend;
    }

    public double getBudget()
    {
        return budget;
    }

    public void setBudget(double budget)
    {
        this.budget = budget;
    }

    public String getCom()
    {
        return com;
    }

    public void setCom(String com)
    {
        this.com = com;
    }

    public String getBehavior()
    {
        return behavior;
    }

    public void setBehavior(String behavior)
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

    @Override
    public String toString()
    {
        return "Activity{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", loc='" + loc + '\'' +
                ", tstart='" + tstart + '\'' +
                ", tend='" + tend + '\'' +
                ", budget=" + budget +
                ", com='" + com + '\'' +
                ", behavior='" + behavior + '\'' +
                ", day='" + day + '\'' +
                '}';
    }
}
