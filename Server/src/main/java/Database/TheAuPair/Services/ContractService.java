package Database.TheAuPair.Services;

import Database.TheAuPair.Models.Contract;
import Database.TheAuPair.Repositories.ContractRepository;

public class ContractService
{
  private ContractRepository ctr;

  public ContractService(ContractRepository ctr)
  {
    this.ctr = ctr;
  }

  public Contract getContract(String id)
  {
    Contract ct =  ctr.findUsingId(id);
    return ct;
  }

  public Contract getContractbyIDs(String parentID, String auPairID)
  {
    Contract ct = ctr.findUsingPIDAID(parentID, auPairID);
    return ct;
  }

  public void updateContract(Contract c)
  {
    ctr.save(c);
  }

  public void deleteContract(String id)
  {
    ctr.deleteById(id);
  }

  public void addContract(Contract act)
  {
    ctr.save(act);
  }
}
