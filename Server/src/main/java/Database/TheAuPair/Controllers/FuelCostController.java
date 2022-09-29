package Database.TheAuPair.Controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
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

  @GetMapping("/api/getCurrentFuelPrices")
  public ResponseEntity<?> getCurrentFuelPrices() throws Exception {
    HttpResponse<String> response = getCurrentFuel();
    if (response.statusCode() == 200)
    {
      return ResponseEntity.ok(response.body());
    }
    else
    {
      return ResponseEntity.badRequest().body(response.body());
    }
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
