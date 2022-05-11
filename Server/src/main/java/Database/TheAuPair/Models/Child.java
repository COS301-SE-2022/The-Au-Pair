package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Arrays;

@Document("Children")
public class Child
{
    @Id
    private String id;

    @Field ("name")
    private String fname;
    @Field ("surname")
    private String sname;
    @Field ("allergies")
    private String allergies[];
    @Field ("diet")
    private String diet;

    public Child(String id, String fname, String sname, String[] allergies, String diet)
    {
        this.id = id;
        this.fname = fname;
        this.sname = sname;
        this.allergies = Arrays.copyOf(allergies, allergies.length);
        this.diet = diet;
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

    public String[] getAllergies()
    {
        return allergies;
    }

    public void setAllergies(String[] allergies)
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

    @Override
    public String toString()
    {
        return "Child{" +
                "id='" + id + '\'' +
                ", fname='" + fname + '\'' +
                ", sname='" + sname + '\'' +
                ", allergies=" + Arrays.toString(allergies) +
                ", diet='" + diet + '\'' +
                '}';
    }
}
