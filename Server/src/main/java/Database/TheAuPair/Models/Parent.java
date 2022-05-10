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
    @Field ("med_id")
    private String med_id;
    @Field ("au_pair")
    private String au_pair;

    public Parent(String id, String[] children, String med_id, String au_pair)
    {
        this.id = id;
        this.children = new String[children.length];
        this.children = Arrays.copyOf(children, children.length);
        this.med_id = med_id;
        this.au_pair = au_pair;
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

    public String getMed_id()
    {
        return med_id;
    }

    public void setMed_id(String med_id)
    {
        this.med_id = med_id;
    }

    public String getAu_pair()
    {
        return au_pair;
    }

    public void setAu_pair(String au_pair)
    {
        this.au_pair = au_pair;
    }

    @Override
    public String toString()
    {
        return "Parent{" +
                "id='" + id + '\'' +
                ", children=" + Arrays.toString(children) +
                ", med_id='" + med_id + '\'' +
                ", au_pair='" + au_pair + '\'' +
                '}';
    }
}
