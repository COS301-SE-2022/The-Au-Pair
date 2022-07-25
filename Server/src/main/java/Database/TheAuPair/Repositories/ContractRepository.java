package Database.TheAuPair.Repositories;

import Database.TheAuPair.Models.Contract;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

@Repository
public interface ContractRepository extends MongoRepository<Contract, String>
{
  @Query("{_id:'?0'}")
  Contract findUsingId(String id);
}
