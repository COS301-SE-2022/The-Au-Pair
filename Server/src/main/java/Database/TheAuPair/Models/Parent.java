package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Arrays;

@Document("Parents")
public class Parent
{
    @Id
    private String id;

    @Field ("children")
    private String children[];
    @Field ("medID")
    private String medID;
    @Field ("auPair")
    private String auPair;
    @Field ("rating")
    private double rating[];

    public Parent(String id, String[] children, String medID, String auPair, double[] rating)
    {
        this.id = id;
        this.children = Arrays.copyOf(children, children.length);
        this.medID = medID;
        this.auPair = auPair;
        this.rating = Arrays.copyOf(rating, rating.length);
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public String[] getChildren()
    {
        return children;
    }

    public void setChildren(String[] children)
    {
        this.children = children;
    }

    public String getMedID()
    {
        return medID;
    }

    public void setMedID(String medID)
    {
        this.medID = medID;
    }

    public String getAuPair()
    {
        return auPair;
    }

    public void setAuPair(String auPair)
    {
        this.auPair = auPair;
    }

    public double[] getRating()
    {
        return rating;
    }

    public void setRating(double[] rating)
    {
        this.rating = rating;
    }

    @Override
    public String toString()
    {
        return "Parent{" +
                "id='" + id + '\'' +
                ", children=" + Arrays.toString(children) +
                ", medID='" + medID + '\'' +
                ", auPair='" + auPair + '\'' +
                ", rating=" + Arrays.toString(rating) +
                '}';
    }
}
