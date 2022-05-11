package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("Medical_Aid")
public class medID
{
    @Id
    private String id;

    @Field ("plan")
    private String plan;
    @Field ("mainName")
    private String name;
    @Field ("mainSname")
    private String sname;
    @Field ("mainID")
    private String mID;

    public medID(String id, String plan, String name, String sname, String mID)
    {
        this.id = id;
        this.plan = plan;
        this.name = name;
        this.sname = sname;
        this.mID = mID;
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String getPlan()
    {
        return plan;
    }

    public void setPlan(String plan)
    {
        this.plan = plan;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getSname()
    {
        return sname;
    }

    public void setSname(String sname)
    {
        this.sname = sname;
    }

    public String getMid()
    {
        return mID;
    }

    public void setMid(String mID)
    {
        this.mID = mID;
    }

    @Override
    public String toString()
    {
        return "Med_Aid{" +
                "id='" + id + '\'' +
                ", plan='" + plan + '\'' +
                ", name='" + name + '\'' +
                ", sname='" + sname + '\'' +
                ", mid='" + mID + '\'' +
                '}';
    }
}
