package Database.TheAuPair.Models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document("Users")
public class User
{
    @Id
    private String id;

    @Field ("name")
    private String fname;
    @Field ("surname")
    private String sname;
    @Field ("email")
    private String email;
    @Field ("address")
    private String address;
    @Field ("registered")
    private boolean reg;
    @Field ("type")
    private int t;
    @Field ("psw")
    private String password;
    @Field ("phone")
    private String number;

    public User(String id, String fname, String sname, String email, String address, boolean reg, int t, String password, String number)
    {
        this.id = id;
        this.fname = fname;
        this.sname = sname;
        this.email = email;
        this.address = address;
        this.reg = reg;
        this.t = t;
        this.password = password;
        this.number = number;
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

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getAddress()
    {
        return address;
    }

    public void setAddress(String address)
    {
        this.address = address;
    }

    public boolean isReg()
    {
        return reg;
    }

    public void setReg(boolean reg)
    {
        this.reg = reg;
    }

    public int getT()
    {
        return t;
    }

    public void setT(int t)
    {
        this.t = t;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public String getNumber()
    {
        return number;
    }

    public void setNumber(String number)
    {
        this.number = number;
    }

    @Override
    public String toString()
    {
        return "User{" +
                "id='" + id + '\'' +
                ", fname='" + fname + '\'' +
                ", sname='" + sname + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", reg=" + reg +
                ", t=" + t +
                ", password='" + password + '\'' +
                ", number='" + number + '\'' +
                '}';
    }
}
