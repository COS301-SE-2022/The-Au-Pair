package Database.TheAuPair.Services;

import java.util.List;

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
    String id = "";
    boolean valid = false;
    while (!valid)
    {
      id = generateID();
      valid = true;
      for (Contract contract : ctr.findAll())
      {
        if (contract.getId().equals(id))
        {
          valid = false;
        }
      }
    }
    act.setId(id);
    ctr.save(act);
  }

  public List<Contract> getAllContracts()
  {
    List<Contract> contracts = ctr.findAll();
    return contracts;
  }

  public String generateID()
  {
    String AlphaNumericString = "0123456789"+"abcdefghijklmnopqrstuvxyz";
    StringBuilder sb = new StringBuilder(24);

    for (int i = 0; i < 24; i++)
    {
      int index = (int)(AlphaNumericString.length() * Math.random());
      sb.append(AlphaNumericString.charAt(index));
    }

    return sb.toString();
  }
}
