package Database.TheAuPair.Controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import static java.time.temporal.ChronoUnit.SECONDS;

@RestController
@CrossOrigin(origins = "*")
public class FuelCostController {
  @Value("${fuelsa.api-key}")
  private String fuelSAApiKey;

  @GetMapping("/getCurrentFuelPrices")
  public String getCurrentFuelPrices() throws Exception {
    HttpResponse<String> response = getCurrentFuel();
    return response.body();
  }

  private HttpResponse<String> getCurrentFuel() throws Exception{

    HttpRequest request = HttpRequest.newBuilder()
      .uri(new URI("https://api.fuelsa.co.za/exapi/fuel/current"))
      .header("key", fuelSAApiKey)
      .timeout(Duration.of(10, SECONDS))
      .GET()
      .build();
    System.out.println(request.toString());

    HttpResponse<String> response = HttpClient
      .newBuilder()
      .build()
      .send(request, HttpResponse.BodyHandlers.ofString());

    System.out.println(response.body().toString());

    return response;
  }
}
