package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("Au-Pair")
public class Au_Pair
{
    @Id
    private String id;

    @Field("rating")
    private double rating;
    @Field("pay_rate")
    private double pay;
    @Field("dist_traveled")
    private double dist;
    @Field("cost_incurred")
    private double cost;
    @Field("onShift")
    private boolean onShift;
    @Field("employer")
    private String employer;

    public Au_Pair(String id, double rating, double pay, double dist, double cost, boolean onShift, String employer)
    {
        this.id = id;
        this.rating = rating;
        this.pay = pay;
        this.dist = dist;
        this.cost = cost;
        this.onShift = onShift;
        this.employer = employer;
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

    public double getPay()
    {
        return pay;
    }

    public void setPay(double pay)
    {
        this.pay = pay;
    }

    public double getDist()
    {
        return dist;
    }

    public void setDist(double dist)
    {
        this.dist = dist;
    }

    public double getCost()
    {
        return cost;
    }

    public void setCost(double cost)
    {
        this.cost = cost;
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

    @Override
    public String toString()
    {
        return "Au_Pair{" +
                "id='" + id + '\'' +
                ", rating=" + rating +
                ", pay=" + pay +
                ", dist=" + dist +
                ", cost=" + cost +
                ", onShift=" + onShift +
                ", employer='" + employer + '\'' +
                '}';
    }
}
