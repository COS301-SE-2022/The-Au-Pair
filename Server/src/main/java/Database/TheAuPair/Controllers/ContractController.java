package Database.TheAuPair.Controllers;

import Database.TheAuPair.Models.Contract;
import Database.TheAuPair.Repositories.ContractRepository;
import Database.TheAuPair.Services.ContractService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ContractController
{
  private ContractService cts;

  public ContractController(ContractRepository ctr)
  {
    this.cts = new ContractService(ctr);
  }

  @PostMapping("/getContract")
  public Contract getContract(@RequestBody String id)
  {
    Contract ct =  cts.getContract(id);
    return ct;
  }

  @PostMapping("/getContractbyIDs")
  public Contract getContractbyIDs(@RequestBody Map<String, String> IDs)
  {
    Contract ct = cts.getContractbyIDs(IDs.get("parentID"), IDs.get("auPairID"));
    return ct;
  }

  @PostMapping("/editContract")
  public void editContract(@RequestBody Contract c)
  {
    this.cts.updateContract(c);
  }

  @PostMapping("/removeContract")
  public void removeContract(@RequestBody String id)
  {
    this.cts.deleteContract(id);
  }

  @PostMapping("/addContract")
  public void addContract(@RequestBody Contract c)
  {
    this.cts.addContract(c);
  }

  @GetMapping("/getAllContracts")
  public List<Contract> getAllContracts()
  {
    return this.cts.getAllContracts();
  }
}
