package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("Medical_Aid")
public class Med_Aid
{
    @Id
    private String id;

    @Field ("plan")
    private String plan;
    @Field ("main_name")
    private String name;
    @Field ("main_sname")
    private String sname;
    @Field ("main_id")
    private String mid;

    public Med_Aid(String id, String plan, String name, String sname, String mid)
    {
        this.id = id;
        this.plan = plan;
        this.name = name;
        this.sname = sname;
        this.mid = mid;
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
        return mid;
    }

    public void setMid(String mid)
    {
        this.mid = mid;
    }

    @Override
    public String toString()
    {
        return "Med_Aid{" +
                "id='" + id + '\'' +
                ", plan='" + plan + '\'' +
                ", name='" + name + '\'' +
                ", sname='" + sname + '\'' +
                ", mid='" + mid + '\'' +
                '}';
    }
}
