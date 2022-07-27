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
    private boolean registered;
    @Field ("type")
    private int type;
    @Field ("password")
    private String password;
    @Field ("phone")
    private String number;
    @Field ("salt")
    private String salt;
    @Field ("latitude")
    private double latitude;
    @Field ("longitude")
    private double longitude;
    @Field ("suburb")
    private String suburb;
    @Field ("gender")
    private String gender;
    @Field ("age")
    private int age;
    @Field ("fcmToken")
    private String fcmToken;

    public User(String id, String fname, String sname, String email, String address, boolean registered, int type, String password, String number, String salt, double latitude, double longitude, String suburb, String gender, int age, String fcmToken)
    {
        this.id = id;
        this.fname = fname;
        this.sname = sname;
        this.email = email;
        this.address = address;
        this.registered = registered;
        this.type = type;
        this.password = password;
        this.number = number;
        this.salt = salt;
        this.latitude = latitude;
        this.longitude = longitude;
        this.suburb = suburb;
        this.gender = gender;
        this.age = age;
        this.fcmToken = fcmToken;
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

    public boolean isRegistered()
    {
        return registered;
    }

    public void setRegistered(boolean registered)
    {
        this.registered = registered;
    }

    public int getType()
    {
        return type;
    }

    public void setT(int type)
    {
        this.type = type;
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

    public String getSalt()
    {
      return salt;
    }

    public void setSalt(String salt)
    {
      this.salt = salt;
    }

    public double getLatitude()
    {
        return latitude;
    }

    public void setLatitiude(double latitude)
    {
        this.latitude = latitude;
    }

    public double getLongitude()
    {
        return longitude;
    }

    public void setLongitude(double longitude)
    {
        this.longitude = longitude;
    }

    public String getSuburb()
    {
        return suburb;
    }

    public void setSuburb(String suburb)
    {
        this.suburb = suburb;
    }

    public String getGender()
    {
        return gender;
    }

    public void setGender(String gender)
    {
        this.gender = gender;
    }

    public int getAge()
    {
        return age;
    }

    public void setAge(int age)
    {
        this.age = age;
    }

    public String getFcmToken()
    {
        return fcmToken;
    }

    public void setFcmToken(String fcmToken)
    {
        this.fcmToken = fcmToken;
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
                ", reg=" + registered +
                ", t=" + type +
                ", password='" + password + '\'' +
                ", number='" + number + '\'' +
                ", salt='" + salt + '\'' +
                ", latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                ", suburb='" + suburb + '\'' +
                ", gender='" + gender + '\'' +
                ", age='" + age + '\'' +
                ", fcmToken='" + fcmToken + '\'' +
                '}';
    }
}
