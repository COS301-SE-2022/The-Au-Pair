package Database.TheAuPair.Models;

public class geoLocation {
    String type;
  double[] coordinates = new double[2];

  public geoLocation(String type, double[] coordinates)
  {
    this.type = type;

    for (int i = 0; i < coordinates.length; i++) 
    {
      this.coordinates[i] = coordinates[i];
    }
  }

  //getters and setters
  public String getType()
  {
    return this.type;
  }

  public double[] getCoordinates()
  {
    return this.coordinates;
  }

  public void setCoordinates(double lng, double lat)
  {
    this.coordinates[0] = lng;
    this.coordinates[1] = lat;
  }
    
}
