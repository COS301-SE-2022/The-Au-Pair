package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Contract;
import Database.TheAuPair.Repositories.ContractRepository;
import Database.TheAuPair.Services.ContractService;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

@RestController
public class ContractController
{
  private ContractService cts;

  public ContractController(ContractRepository ctr)
  {
    this.cts = new ContractService(ctr);
  }

  @PostMapping("/getContract")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Contract> getContract(@RequestBody String id, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      return ResponseEntity
        .ok()
        .body(this.cts.getContract(id));
    }
  }

  @PostMapping("/getContractbyIDs")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Contract> getContractbyIDs(@RequestBody Map<String, String> IDs, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      return ResponseEntity
        .ok()
        .body(this.cts.getContractbyIDs(IDs.get("parentID"), IDs.get("auPairID")));
    }
  }

  @PostMapping("/editContract")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder editContract(@RequestBody Contract c, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.cts.updateContract(c);
      return ResponseEntity
        .ok();
    }
  }

  @PostMapping("/removeContract")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder removeContract(@RequestBody String id, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.cts.deleteContract(id);
      return ResponseEntity
        .ok();
    }
  }

  @PostMapping("/addContract")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity.BodyBuilder addContract(@RequestBody Contract c, BindingResult bindingResult)
  {
    if (bindingResult.hasErrors())
    {
      return (ResponseEntity.BodyBuilder) ResponseEntity
        .badRequest()
        .body(null);
    }
    else
    {
      this.cts.addContract(c);
      return ResponseEntity
        .ok();
    }
  }

  @GetMapping("/getAllContracts")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<List<Contract>> getAllContracts()
  {
    return ResponseEntity
        .ok()
        .body(this.cts.getAllContracts());
  }
}
