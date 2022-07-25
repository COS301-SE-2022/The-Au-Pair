package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Contract;
import Database.TheAuPair.Repositories.ContractRepository;
import Database.TheAuPair.Services.ContractService;
import org.springframework.web.bind.annotation.*;

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
  public Contract getContract(@RequestBody String id)
  {
    Contract ct =  cts.getContract(id);
    return ct;
  }

  @PostMapping("/editContract")
  @CrossOrigin(origins = "http://localhost:4200")
  public void editContract(@RequestBody Contract c)
  {
    this.cts.updateContract(c);
  }

  @PostMapping("/removeContract")
  @CrossOrigin(origins = "http://localhost:4200")
  public void removeContract(@RequestBody String id)
  {
    this.cts.deleteContract(id);
  }

  @PostMapping("/addContract")
  @CrossOrigin(origins = "http://localhost:4200")
  public void addContract(@RequestBody Contract c)
  {
    this.cts.addContract(c);
  }
}
